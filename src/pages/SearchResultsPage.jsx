import React, { useContext, useEffect, useRef, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ImagesContext } from "../components/ImagesContext";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import ShareSharpIcon from "@mui/icons-material/ShareSharp";
import DownloadModal from "../components/DownloadModal";

const SearchResultsPage = () => {
  const { images } = useContext(ImagesContext);
  const { query } = useParams(); // Get the query from the URL
  const [displayedImages, setDisplayedImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // Loading state to control shimmer effect
  const imagesPerPage = 15;
  const [showLeftButton, setShowLeftButton] = useState(false);
  const scrollRef = useRef(null);
  const [category, setCategory] = useState("All");
  const { searchQuery, setSearchQuery } = useContext(ImagesContext);
  const navigate = useNavigate();

  const [modalData, setModalData] = useState(null);

  const setOpenModal = (url, tags) => {
    setModalData({ url, tags });
  };

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      if (direction === "left") {
        scrollRef.current.scrollBy({ left: -150, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: 150, behavior: "smooth" });
      }
    }
  };

  const handleScrollCheck = () => {
    if (scrollRef.current.scrollLeft > 0) {
      setShowLeftButton(true);
    } else {
      setShowLeftButton(false);
    }
  };

  const handleButtonClick = (cat) => {
    setSearchQuery(cat); // Update the search query with the current category
  };

  useEffect(() => {
    if (images.length > 0) {
      const startIndex = (currentPage - 1) * imagesPerPage;
      const endIndex = startIndex + imagesPerPage;
      setDisplayedImages(images.slice(0, endIndex));
      setLoading(false); // Images are loaded, stop showing shimmer
    }
  }, [images, currentPage]);

  const loadMoreImages = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const categories = [
    "All",
    "AI",
    "sports",
    "fintech",
    "AI and ML",
    "Climate Tech",
    "Commerce & Retail",
    "Fintech",
    "Gaming",
    "Healthcare",
    "HR & Team",
    "Product Shoot",
    "Remote Work",
  ];

  return (
    <div className="my-40 text-white mx-20">
      <h1 className="text-5xl 2xl:text-6xl">Search Results for "{query}"</h1>

      <div className="flex items-center justify-between w-[100.2%] mt-14 sticky top-[42px] sm:top-[58px] py-4 border-b border-[#B276AA] border-opacity-25 bg-[#161616] z-10">
        <div className="hidden md:flex">
          <p>Browse Images</p>
        </div>

        <div className="relative flex items-center justify-center w-[92%] ml-2 sm:w-[96%] md:w-[70%] lg:w-[77%] xl:w-[80%] mr-4 sm:mr-8">
          {showLeftButton && (
            <button
              className="absolute -left-10 z-10 p-1 bg-opacity-50 rounded-full"
              onClick={() => handleScroll("left")}
            >
              <ArrowLeftIcon />
            </button>
          )}
          <div
            className="flex overflow-x-auto space-x-4 scrollbar-hide rounded-2xl"
            ref={scrollRef}
            onScroll={handleScrollCheck}
          >
            {categories.map((cat, index) => (
              <button
                key={index}
                onClick={() => handleButtonClick(cat)}
                className={`px-4 py-0.5 border whitespace-nowrap ${
                  category === cat
                    ? "bg-white text-black opacity-85"
                    : "text-white opacity-75"
                } rounded-full`}
              >
                {cat}
              </button>
            ))}
          </div>
          <button
            className="absolute -right-11 z-10 p-1 bg-opacity-50 rounded-full"
            onClick={() => handleScroll("right")}
          >
            <ArrowRightIcon />
          </button>
        </div>
      </div>

      {/* Show shimmer effect when loading */}
      {loading ? (
        <div className="">Loading...</div>
      ) : (
        <div className="w-full columns-1 sm:columns-2 md:columns-3 gap-5 mt-8 mb-24">
          {displayedImages.map((image, index) => (
            <div
              key={index}
              className="cursor-pointer mb-5 relative group hover:shadow-lg transition duration-200 ease-in-out"
            >
              <img
                loading="lazy"
                src={image.downloadURL}
                alt={`Image ${index + 1}`}
                className="w-full h-auto rounded-sm"
                onClick={() => setOpenModal(image.downloadURL, image.tags)} // Open modal on image click
              />
              {/* Download button, only visible on hover */}
              <div
                className="absolute bottom-2 left-2 z-20 bg-black bg-opacity-80 py-0.5 px-1 rounded-md opacity-0 group-hover:opacity-85 transition-opacity duration-200"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent image click from triggering
                  handleDownload(image.downloadURL); // Handle download action
                }}
              >
                <SaveAltIcon className="cursor-pointer text-white" />
              </div>

              {/* Share button, only visible on hover */}
              <div
                className="absolute bottom-2 right-2 z-20 bg-black bg-opacity-80 py-0.5 px-1 rounded-md opacity-0 group-hover:opacity-85 transition-opacity duration-200"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent image click from triggering
                  handleShare(image.downloadURL); // Handle share action
                }}
              >
                <ShareSharpIcon className="cursor-pointer text-white" />
              </div>
            </div>
          ))}
        </div>
      )}

      {modalData && (
        <DownloadModal
          url={modalData.url}
          tags={modalData.tags}
          onClose={() => setOpenModal(null)}
        />
      )}

      {/* Load More Button */}
      {displayedImages.length < images.length && !loading && (
        <button onClick={loadMoreImages}>Load More</button>
      )}
    </div>
  );
};

export default SearchResultsPage;
