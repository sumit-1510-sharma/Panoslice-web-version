import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  Suspense,
  useMemo,
} from "react";
import Tool from "../components/Tool";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { useNavigate } from "react-router-dom";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import ShareSharpIcon from "@mui/icons-material/ShareSharp";
import DownloadModal from "../components/DownloadModal";
import Marquee from "react-fast-marquee";
import { Snackbar } from "@mui/material";
import { ImagesContext } from "../components/ImagesContext";
import carouselMaker from "../assets/carouselmaker.png";
import blogToCarousel from "../assets/blogtocarousel.png";
import aiArtGenerator from "../assets/aiartgenerator.png";
import bgRemover from "../assets/bgremover.png";
import aiReelMaker from "../assets/aireelmaker.png";
import aiColorGrader from "../assets/aicolorgrader.png";
import aiHashtagGenerator from "../assets/aihashtaggenerator.png";
import aiCaptionWriter from "../assets/aicaptionwriter.png";
import bulkEditor from "../assets/bulkeditor.png";
import "./Homepage.css";
import { db } from "../firebase"; // Adjust this import path to your firebase config file
import {
  collection,
  doc,
  getDocs,
  increment,
  limit,
  query,
  updateDoc,
} from "firebase/firestore";
import MuiAlert from "@mui/material/Alert";
import { motion } from "framer-motion";
import heroSectionStar from "../assets/herosectionstar.png";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const Homepage = () => {
  const [category, setCategory] = useState("All");
  const [displayedImages, setDisplayedImages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { images } = useContext(ImagesContext);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const scrollRef = useRef(null);
  const [modalData, setModalData] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [filteredImages, setFilteredImages] = useState([]);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const setOpenModal = (image) => {
    setModalData(image);
    console.log(modalData);
  };

  useEffect(() => {
    if (images.length > 0) {
      // Only set displayed and filtered images once images are fetched from context
      setDisplayedImages(images);
      setFilteredImages(images); // Initially, show all images
      setIsLoading(false);
    }
  }, [images]);

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

  const incrementDownloadCount = async (url) => {
    try {
      const image = images.find((img) => img.downloadURL === url);
      if (image) {
        const docRef = doc(db, "AI and ML", image.docId); // Assume `docId` is stored in the context images
        await updateDoc(docRef, { downloads: increment(1) });
      }
    } catch (error) {
      console.error("Error incrementing download count:", error);
    }
  };

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

        // Increment download count after successful download
        incrementDownloadCount(url);
      };
    } catch (error) {
      console.error("Error downloading the image:", error);
    }
  };

  const handleShare = (imageId) => {
    const url = `${window.location.origin}/gallery?imageId=${imageId}`;
    navigator.clipboard.writeText(url).then(() => {
      setSnackbarOpen(true); // Show the snackbar
    });
  };

  const categories = [
    "All",
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

  const handleRedirectPanoslice = () => {
    window.location.href = "https://panoslicepro.page.link/XH3T";
  };

  const handleRedirectLono = () => {
    window.location.href =
      "https://apps.apple.com/in/app/lono-ai-reel-video-editor/id1632742723";
  };

  const handleButtonClick = (cat) => {
    setCategory(cat);
    if (cat === "All") {
      setFilteredImages(displayedImages);
    } else {
      setFilteredImages(
        displayedImages.filter((image) => image.category === cat)
      );
    }
  };

  const memoizedImages = useMemo(() => filteredImages, [filteredImages]);

  return (
    <div>
      <div className="flex flex-col items-center text-white ml-3 mr-5 sm:ml-7 sm:mr-9">
        <div className="bg-[#1D1D1D] rounded-full py-1 px-4 mt-24 sm:mt-32 shadow-[0_0_24px_10px_rgba(178,118,170,0.5)] z-10">
          <div className="flex items-center w-[250px] sm:w-[350px] md:w-[450px] lg:w-[600px]">
            <p
              onClick={() => navigate("/toptools")}
              className="cursor-pointer pr-3 rounded-full"
            >
              Top AI Tools:
            </p>
            <div className="flex items-center w-[145px] sm:w-[245px] md:w-[345px] lg:w-[492px]">
              <Marquee pauseOnHover={true} speed={27}>
                <div className="flex items-center space-x-4 mx-2">
                  <div
                    className="cursor-pointer"
                    onClick={handleRedirectPanoslice}
                  >
                    <Tool title="AI Carousel Maker" image={carouselMaker} />
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={handleRedirectPanoslice}
                  >
                    <Tool title="Blog To Carousel" image={blogToCarousel} />
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={handleRedirectPanoslice}
                  >
                    <Tool title="AI Art Generator" image={aiArtGenerator} />
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={handleRedirectPanoslice}
                  >
                    <Tool title="BG Remover" image={bgRemover} />
                  </div>
                  <div className="cursor-pointer" onClick={handleRedirectLono}>
                    <Tool title="AI Reel Maker" image={aiReelMaker} />
                  </div>
                  <div className="cursor-pointer" onClick={handleRedirectLono}>
                    <Tool title="AI Color Grading" image={aiColorGrader} />
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={handleRedirectPanoslice}
                  >
                    <Tool
                      title="AI Hashtag Generator"
                      image={aiHashtagGenerator}
                    />
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={handleRedirectPanoslice}
                  >
                    <Tool title="AI Caption Writer" image={aiCaptionWriter} />
                  </div>
                  <div className="cursor-pointer" onClick={handleRedirectLono}>
                    <Tool title="Batch Editor" image={bulkEditor} />
                  </div>
                </div>
              </Marquee>
            </div>
          </div>
        </div>

        <div className="relative flex flex-col items-center space-y-5 mt-12">
          <p className="text-[40px] sm:text-[44px] leading-tight sm:leading-tight max-w-lg text-center">
            Create anything you imagine, in seconds
          </p>

          <p className="text-center">No sign-in required. 100% free to use.</p>
          <button
            onClick={() => navigate("/generate")}
            className="bg-white rounded-full text-black px-16 sm:px-24 py-1.5"
          >
            Generate
          </button>
          <img
            className="absolute hidden sm:flex left-[400px] md:left-[440px] sm:top-[30px] w-40"
            src={heroSectionStar}
            alt=""
          />
        </div>

        <div className="flex items-center justify-between w-[100%] sm:w-[100.2%] ml-2 mt-14 mb-8 sticky top-[42px] sm:top-[58px] py-4 border-b border-[#B276AA] border-opacity-25 bg-[#161616] z-30">
          <div className="hidden md:flex">
            <p>Browse Images</p>
          </div>

          <div className="relative flex items-center justify-center w-[92%] ml-2 sm:w-[96%] md:w-[72%] lg:w-[80%] xl:w-[80%] mr-4 sm:mr-8">
            {showLeftButton && (
              <button
                className="absolute -left-7 sm:-left-10 z-10 p-1 bg-opacity-50 rounded-full"
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
              className="absolute -right-7 sm:-right-11 z-10 p-1 bg-opacity-50 rounded-full"
              onClick={() => handleScroll("right")}
            >
              <ArrowRightIcon />
            </button>
          </div>
        </div>
        <div className="w-full block ml-2 mb-24">
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 1024: 3, 1280: 4 }}
          >
            <Masonry gutter="16px">
              {memoizedImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group"
                >
                  <img
                    loading="lazy"
                    decoding="async"
                    src={image.downloadURL}
                    alt={`Image ${index + 1}`}
                    className="w-full h-auto rounded-sm cursor-pointer object-cover"
                    onClick={() => setOpenModal(image)}
                  />
                  {/* Download button, only visible on hover */}
                  <div
                    className="absolute bottom-2 left-2 z-20 bg-black bg-opacity-80 py-0.5 px-1 rounded-md opacity-0 group-hover:opacity-85 transition-opacity duration-200"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent image click from triggering
                      handleDownload(image.downloadURL, `${image.imageId}`);
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
          </ResponsiveMasonry>
        </div>
      </div>

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
          downloadURL={modalData.downloadURL}
          imageId={modalData.imageId}
          onClose={() => setOpenModal(null)}
        />
      )}
    </div>
  );
};

export default Homepage;

// {isLoading ? (
//   <Masonry
//     columns={{ xs: 1, sm: 2, md: 3 }}
//     spacing={2}
//     className="w-full opacity-50 mt-8 mb-24"
//   >
//     {displayedImages.map((_, index) => (
//       <Skeleton
//         key={index}
//         variant="rectangular"
//         animation="wave"
//         sx={{
//           bgcolor: ["grey.700", "grey.800", "grey.900"][index % 3],
//           height: `${200 + (index % 4) * 50}px`, // Dynamic heights
//           borderRadius: "0.25rem",
//           mb: 2,
//         }}
//       />
//     ))}
//   </Masonry>
// ) : (
//   <div className="mt-8">
//     <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
//       {displayedImages.map((image, index) => (
//         <div
//           key={index}
//           className="relative group hover:shadow-lg transition duration-200 ease-in-out"
//           onClick={() => setOpenModal(image.downloadURL, image.tags)} // Open modal on image click
//           style={{ cursor: "pointer" }}
//         >
//           <img
//             loading="eager"
//             src={image.downloadURL}
//             alt={`Image ${index + 1}`}
//             className="w-full h-auto rounded-sm"
//             style={{ display: "block", borderRadius: "0.25rem" }}
//           />
//           <div
//             className="absolute bottom-2 left-2 z-20 bg-black bg-opacity-80 py-0.5 px-1 rounded-md opacity-0 group-hover:opacity-85 transition-opacity duration-200"
//             onClick={(e) => {
//               e.stopPropagation(); // Prevent image click from triggering
//               handleDownload(image.downloadURL); // Handle download action
//             }}
//           >
//             <SaveAltIcon className="cursor-pointer text-white" />
//           </div>
//           <div
//             className="absolute bottom-2 right-2 z-20 bg-black bg-opacity-80 py-0.5 px-1 rounded-md opacity-0 group-hover:opacity-85 transition-opacity duration-200"
//             onClick={(e) => {
//               e.stopPropagation(); // Prevent image click from triggering
//               handleShare(image.downloadURL); // Handle share action
//             }}
//           >
//             <ShareSharpIcon className="cursor-pointer text-white" />
//           </div>
//         </div>
//       ))}
//     </Masonry>
//   </div>
// )}
