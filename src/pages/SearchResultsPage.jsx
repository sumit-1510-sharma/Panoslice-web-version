import React, {
  Suspense,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ImagesContext } from "../components/ImagesContext";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import ShareSharpIcon from "@mui/icons-material/ShareSharp";
import DownloadModal from "../components/DownloadModal";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Masonry from "@mui/lab/Masonry";
import { motion } from "framer-motion";

const SearchResultsPage = () => {
  const { images, searchQuery, setSearchQuery } = useContext(ImagesContext);
  const { query } = useParams(); // Get the query from the URL
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const [loading, setLoading] = useState(true); // Loading state to control shimmer effect
  const [showLeftButton, setShowLeftButton] = useState(false);
  const scrollRef = useRef(null);
  const [category, setCategory] = useState(query || "All"); // Use query as initial category
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const setOpenModal = (url, tags) => {
    setModalData({ url, tags });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
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
    navigate(`/search/${cat}`); // Update the URL with the new category
  };

  useEffect(() => {
    if (images.length > 0) {
      setLoading(false); // Images are loaded, stop showing shimmer
    }
  }, [images]);

  useEffect(() => {
    // Redirect to homepage on back button press
    const handlePopState = () => {
      navigate("/");
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

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

  const handleDownload = async (url, filename) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobURL = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobURL;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobURL);
    } catch (error) {
      console.error("Error downloading the image:", error);
    }
  };

  const handleShare = (imageId) => {
    const url = `${window.location.origin}/gallery?imageId=${imageId}`;
    navigator.clipboard.writeText(url).then(() => {
      setSnackbarOpen(true);
    });
  };

  const memoizedImages = useMemo(() => images, [images]);

  return (
    <div className="mt-24 md:my-28 lg:my-40 text-white mx-8 md:mx-12 lg:mx-20">
      <h1 className="-mb-4 md:mb-12 text-2xl md:text-4xl 2xl:text-6xl">
        Search Results for "{query}"
      </h1>

      <div className="flex items-center justify-between w-[100.2%] mt-14 mb-8 sticky top-[42px] sm:top-[58px] py-4 border-b border-[#B276AA] border-opacity-25 bg-[#161616] z-10">
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

      <Suspense fallback={<div>Loading...</div>}>
        <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
          {memoizedImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group cursor-pointer mb-5"
            >
              <img
                loading="lazy"
                src={image.downloadURL}
                alt={`Image ${index + 1}`}
                className="w-full h-auto rounded-sm"
                onClick={() => setOpenModal(image.downloadURL, image.tags)}
              />
              {/* Download button, only visible on hover */}
              <div
                className="absolute bottom-2 left-2 z-20 bg-black bg-opacity-80 py-0.5 px-1 rounded-md opacity-0 group-hover:opacity-85 transition-opacity duration-200"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent image click from triggering
                  handleDownload(image.downloadURL, `${image.imageId}.webp`);
                }}
              >
                <SaveAltIcon className="cursor-pointer text-white" />
              </div>
              {/* Share button, only visible on hover */}
              <div
                className="absolute bottom-2 right-2 z-20 bg-black bg-opacity-80 py-0.5 px-1 rounded-md opacity-0 group-hover:opacity-85 transition-opacity duration-200"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent image click from triggering
                  handleShare(image.imageId);
                }}
              >
                <ShareSharpIcon className="cursor-pointer text-white" />
              </div>
            </motion.div>
          ))}
        </Masonry>
      </Suspense>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <MuiAlert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Image link copied to clipboard!
        </MuiAlert>
      </Snackbar>

      {modalData && (
        <DownloadModal
          url={modalData.url}
          tags={modalData.tags}
          imageId={modalData.imageId}
          onClose={() => setOpenModal(null)}
        />
      )}
    </div>
  );
};

export default SearchResultsPage;
