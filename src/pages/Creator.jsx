import React, {
  useEffect,
  useState,
  Suspense,
  useMemo,
  useContext,
} from "react";
import {
  collection,
  doc,
  getDocs,
  increment,
  limit,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
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
import { ImagesContext } from "../components/ImagesContext";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const Creator = () => {
  const [displayedImages, setDisplayedImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalData, setModalData] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { images } = useContext(ImagesContext);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  // Assuming allImages is the list of images in the context

  useEffect(() => {
    const fetchImages = () => {
      try {
        const filteredImages = images.filter(
          (img) => img.creator === "Dipin Chopra"
        );
        setDisplayedImages(filteredImages);
        setLoading(false);
      } catch (error) {
        console.error("Error filtering images: ", error);
      }
    };

    fetchImages();
  }, [images]);

  const setOpenModal = (image) => {
    setModalData(image);
    console.log(modalData);
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

  const handleInstagramIconClick = () => {
    window.location.href = "https://instagram.com/redeyereduction_";
  };
  const handleLinkedinIconClick = () => {
    window.location.href = "https://www.linkedin.com/in/dipinkumarchopra/";
  };
  const handleXIconClick = () => {
    window.location.href = "https://twitter.com/redeyereduction";
  };

  const memoizedImages = useMemo(() => displayedImages, [displayedImages]);

  return (
    <div className="mx-4 sm:mx-8 mt-28 text-white">
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

      {/* <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 750: 2, 1024: 3, 1280: 4 }}
      >
        <Masonry gutter="16px">
          {memoizedImages.map((image, index) => (
            <img
              key={index}
              src={image.downloadURL}
              alt={`image-${index}`}
              loading="lazy"
              decoding="async"
              className="border border-[#B276AA] border-opacity-25 rounded-sm w-full h-auto object-cover"
            />
          ))}
        </Masonry>
      </ResponsiveMasonry> */}

      <div className="w-full block mb-24">
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
                className="cursor-pointer relative group hover:opacity-85 transition-opacity duration-300"
                onClick={() => setOpenModal(image)}
              >
                <img
                  src={image.downloadURL}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="rounded-sm w-full h-auto object-cover"
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

export default Creator;
