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

import { motion } from "framer-motion";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const SearchResultsPage = () => {
  const { images, searchQuery, setSearchQuery } = useContext(ImagesContext);
  const { query } = useParams(); // Get the query from the URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const scrollRef = useRef(null);
  const [category, setCategory] = useState(query || "All");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  // Function to open the modal for a selected image
  const setOpenModal = (image) => {
    setModalData(image);
  };

  // Close the snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  // Scroll the image categories horizontally
  const handleScroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -150 : 150,
        behavior: "smooth",
      });
    }
  };

  // Check if the left scroll button should be shown
  const handleScrollCheck = () => {
    setShowLeftButton(scrollRef.current.scrollLeft > 0);
  };

  // Handle category button click
  const handleButtonClick = (cat) => {
    if (searchQuery !== cat) {
      // Prevent unnecessary updates
      setSearchQuery(cat);
      navigate(`/search/${cat}`);
    }
  };

  // Update search query based on the URL param
  useEffect(() => {
    if (query) {
      setSearchQuery(query);
      setCategory(query);
    }
  }, [query, setSearchQuery]);

  useEffect(() => {
    const handlePopState = () => {
      // Handle popstate if necessary
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const categories = [
    "AI",
    "Sports",
    "Climate Tech",
    "Commerce & Retail",
    "Fintech",
    "Gaming",
    "Healthcare",
    "HR & Team",
    "Product Shoot",
    "Remote Work",
  ];

  // Download the image
  const handleDownload = async (url, filename, format = "png") => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const image = new Image();
      const blobURL = URL.createObjectURL(blob);
      image.src = blobURL;

      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);
        const convertedImage = canvas.toDataURL(`image/${format}`);
        const link = document.createElement("a");
        link.href = convertedImage;
        link.download = `${filename}.${format}`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(blobURL);
      };
    } catch (error) {
      console.error("Error downloading the image:", error);
    }
  };

  // Share the image link
  const handleShare = (imageId) => {
    const url = `${window.location.origin}/gallery?imageId=${imageId}`;
    navigator.clipboard.writeText(url).then(() => {
      setSnackbarOpen(true); // Show the snackbar
    });
  };

  // Filter images based on searchQuery using useMemo
  const filteredImages = useMemo(() => {
    if (!searchQuery || searchQuery === "All") {
      return images; // If no search query or "All" is selected, show all images
    }
    return images.filter((image) =>
      image.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [images, searchQuery]);

  return (
    <div className="mt-24 md:mt-28 mb-24 lg:mt-40 text-white ml-4 sm:ml-8 sm:mr-4">
      <h1 className="mb-2 text-2xl md:text-4xl 2xl:text-6xl max-w-[50%]">
        "{query}"
      </h1>

      <div className="flex items-center justify-between w-full pl-2 mt-14 mb-8 sticky top-[42px] sm:top-[58px] py-4 border-b border-[#B276AA] border-opacity-25 bg-[#161616] z-30">
        <div className="hidden md:flex">
          <p>Browse Images</p>
        </div>

        <div className="relative flex items-center justify-center w-[91.5%] sm:w-[95%] md:w-[73%] md:mr-12 lg:w-[77%] xl:w-[80%] sm:mr-8">
          {showLeftButton && (
            <button
              className="absolute -left-7 md:-left-10 z-10 p-1 bg-opacity-50 rounded-full"
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
                className={`px-4 py-0.5 border whitespace-nowrap rounded-full ${
                  category === cat
                    ? "bg-white text-black"
                    : "text-white opacity-75"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <button
            className="absolute -right-8 md:-right-11 z-10 p-1 bg-opacity-50 rounded-full"
            onClick={() => handleScroll("right")}
          >
            <ArrowRightIcon />
          </button>
        </div>
      </div>

      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 750: 2, 1024: 3, 1280: 4 }}
      >
        <Masonry gutter="16px">
          {filteredImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group cursor-pointer"
            >
              <img
                loading="lazy"
                src={image.downloadURL}
                alt={`Image ${index + 1}`}
                className="w-full h-auto rounded-sm"
                onClick={() => setOpenModal(image)}
              />
              <div
                className="absolute bottom-2 left-2 z-20 bg-black bg-opacity-80 py-0.5 px-1 rounded-md opacity-0 group-hover:opacity-85 transition-opacity duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownload(image.downloadURL, `${image.imageId}`);
                }}
              >
                <SaveAltIcon className="cursor-pointer text-white" />
              </div>
              <div
                className="absolute bottom-2 right-2 z-20 bg-black bg-opacity-80 py-0.5 px-1 rounded-md opacity-0 group-hover:opacity-85 transition-opacity duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  handleShare(image.imageId);
                }}
              >
                <ShareSharpIcon className="cursor-pointer text-white" />
              </div>
            </motion.div>
          ))}
        </Masonry>
      </ResponsiveMasonry>

      {modalData && (
        <DownloadModal
          downloadURL={modalData.downloadURL}
          imageId={modalData.imageId}
          onClose={() => setOpenModal(null)}
        />
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Link copied to clipboard!
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default SearchResultsPage;
