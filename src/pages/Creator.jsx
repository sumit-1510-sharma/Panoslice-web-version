import React, { useEffect, useState, Suspense, useMemo } from "react";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import Masonry from "@mui/lab/Masonry";
import { motion } from "framer-motion";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import ShareSharpIcon from "@mui/icons-material/ShareSharp";
import { db } from "../firebase";
import creatorImage from "../assets/dipin_creatorimage.jpeg";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import DownloadModal from "../components/DownloadModal";

const Creator = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalData, setModalData] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const q = query(
          collection(db, "AI and ML"),
          where("creator", "==", "Dipin Chopra")
        );
        const querySnapshot = await getDocs(q);

        // Map through the querySnapshot to get both downloadURL and the document ID (imageId)
        const fetchedImages = querySnapshot.docs.map((doc) => ({
          imageUrl: doc.data().downloadURL, // Fetch the downloadURL field
          imageId: doc.data().imageId, // Fetch the document ID
        }));

        // Set the combined data in the state
        setImages(fetchedImages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching images: ", error);
      }
    };

    fetchImages();
  }, []);

  const setOpenModal = (image) => {
    setModalData(image);
    console.log(modalData);
  };

  const handleDownload = async (url, filename) => {
    try {
      // Fetch the image as a blob
      const response = await fetch(url);
      const blob = await response.blob();

      // Create a temporary URL for the blob
      const blobURL = window.URL.createObjectURL(blob);

      // Create an anchor element and trigger a download
      const link = document.createElement("a");
      link.href = blobURL;
      link.download = filename;
      document.body.appendChild(link);
      link.click();

      // Clean up
      link.remove();
      window.URL.revokeObjectURL(blobURL);
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

  const handleInstagramIconClick = () => {
    window.location.href = "https://instagram.com/redeyereduction_";
  };
  const handleLinkedinIconClick = () => {
    window.location.href = "https://www.linkedin.com/in/dipinkumarchopra/";
  };
  const handleXIconClick = () => {
    window.location.href = "https://twitter.com/redeyereduction";
  };

  const memoizedImages = useMemo(() => images, [images]);

  return (
    <div className="flex flex-col items-center mx-2 sm:mx-6 mt-28 text-white">
      <div className="w-full flex flex-col items-center space-y-4 mb-12">
        <img
          className="object-cover rounded-full w-14 h-14"
          src={creatorImage}
          alt=""
        />
        <h2 className="text-4xl text-center font-semibold">Dipin Chopra</h2>
        <p className="max-w-[85%] opacity-80 text-sm text-center">
          Caffeine powered marketing generalist and creative enabler
        </p>
        <div className="cursor-pointer flex items-center opacity-90 space-x-2.5">
          <InstagramIcon onClick={handleInstagramIconClick} fontSize="small" />
          <LinkedInIcon onClick={handleLinkedinIconClick} fontSize="small" />
          <XIcon onClick={handleXIconClick} fontSize="small" />
        </div>
      </div>

      <div className="flex items-center justify-between w-full mt-2 mb-8 sticky top-[44px] sm:top-[60px] py-4 border-b border-[#B276AA] border-opacity-25 bg-[#161616] z-10">
        <p>More By the Creator</p>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
          {memoizedImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="masonry-item cursor-pointer relative group hover:opacity-85 transition-opacity duration-300 mb-5 p-1"
              onClick={() => setOpenModal(image)}
            >
              <div className="bg-gray-700 bg-opacity-50">
                <img
                  src={image.imageUrl}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="border border-[#B276AA] border-opacity-25 rounded-sm w-full h-auto object-cover"
                />
                {/* Download button, only visible on hover */}
                <div
                  className="absolute bottom-2 left-2 z-20 bg-black bg-opacity-80 py-0.5 px-1 rounded-md opacity-0 group-hover:opacity-85 transition-opacity duration-200"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent image click from triggering
                    handleDownload(image.imageUrl, `${image.imageId}.webp`);
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
          imageUrl={modalData.imageUrl}
          imageId={modalData.imageId}
          onClose={() => setOpenModal(null)}
        />
      )}
    </div>
  );
};

export default Creator;
