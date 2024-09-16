import React, { useState, useEffect, useContext } from "react";
import { Modal, Box, IconButton, Snackbar } from "@mui/material";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import ShareSharpIcon from "@mui/icons-material/ShareSharp";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { ImagesContext } from "./ImagesContext";
import { db } from "../firebase"; // Assuming you have a firebaseConfig file
import { doc, updateDoc, increment } from "firebase/firestore";
import MuiAlert from "@mui/material/Alert";
import creatorImage from "../assets/dipin_creatorimage.jpeg";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  height: "75%",
  bgcolor: "#161616",
  boxShadow: 24,
  border: "1px solid #707070",
  borderRadius: "12px",
  outline: "none",
  py: 4,
  pr: 2,
};

const DownloadModal = ({ downloadURL, imageId, onClose }) => {
  const navigate = useNavigate();
  const [fitMode, setFitMode] = useState("object-contain");
  const { images, setSearchQuery } = useContext(ImagesContext);
  const [imageData, setImageData] = useState(null);
  const [tags, setTags] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const fetchImageDataFromContext = () => {
      const selectedImage = images.find((img) => img.imageId === imageId);
      if (selectedImage) {
        setImageData(selectedImage);
        setTags(selectedImage.tags || []);
        incrementViewCount(selectedImage.docId); // Use the document ID stored in context
      }
    };

    fetchImageDataFromContext();
  }, [imageId]); // Ensure this useEffect runs only when necessary

  const incrementViewCount = async (docId) => {
    try {
      const imageRef = doc(db, "AI and ML", docId);
      await updateDoc(imageRef, { views: increment(1) });
    } catch (error) {
      console.error("Error incrementing view count:", error);
    }
  };

  const incrementDownloadCount = async (imageId) => {
    try {
      const image = images.find((img) => img.imageId === imageId);
      if (image) {
        const docRef = doc(db, "AI and ML", image.docId);
        await updateDoc(docRef, { downloads: increment(1) });
      }
    } catch (error) {
      console.error("Error incrementing download count:", error);
    }
  };

  const handleShare = (imageId) => {
    const url = `${window.location.origin}/gallery?imageId=${imageId}`;
    navigator.clipboard.writeText(url).then(() => {
      setSnackbarOpen(true);
    });
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

        incrementDownloadCount(imageId); // Increment download count after successful download
      };
    } catch (error) {
      console.error("Error downloading the image:", error);
    }
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
    navigate(`/search/${value}`);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      <Modal
        open={!!downloadURL}
        onClose={onClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        BackdropProps={{
          style: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        }}
      >
        <Box sx={modalStyle}>
          <div className="relative flex flex-col sm:flex-row text-white w-full h-full space-x-8 space-y-6">
            <IconButton
              onClick={onClose}
              edge="end"
              color="inherit"
              aria-label="close"
              sx={{
                position: "absolute",
                top: -24,
                right: 4,
                color: "#ffffff",
              }}
            >
              <CloseIcon />
            </IconButton>

            <div className="w-[85%] mx-auto sm:w-[55%] flex flex-col h-full space-y-4">
              <div className="w-full max-h-[220px] sm:max-h-none sm:h-[60%] md:h-[70%] flex bg-[#1D1D1D] items-center justify-center relative rounded-md">
                <img
                  className={`rounded-md w-full h-full ${fitMode}`}
                  src={downloadURL}
                  alt="Preview"
                />
                <div className="absolute text-xs flex items-center space-x-3 -bottom-5 right-1 opacity-40">
                  <p>{imageData?.downloads || 0} downloads</p>
                  <p>{imageData?.views || 0} views</p>
                </div>
              </div>
              <div
                onClick={() => navigate("/creator")}
                className="cursor-pointer flex items-center space-x-4"
              >
                <img
                  className="rounded-full object-cover w-6 h-6 sm:w-10 sm:h-10"
                  src={creatorImage}
                  alt="Creator"
                />
                <p className="text-sm sm:text-base">Dipin Chopra</p>
              </div>
            </div>

            <div className="w-[85%] sm:w-[42%] flex flex-col items-start space-y-4">
              <div>
                <h2 className="text-lg mb-2">Tags</h2>
                <div className="flex items-center flex-wrap gap-x-2 gap-y-2 overflow-y-scroll max-h-[40%] sm:max-h-[55%] md:max-h-[80%] lg:max-h-[90%]">
                  {tags.map((tag, index) => (
                    <button
                      onClick={() => handleSearch(tag)}
                      key={index}
                      className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div
              onClick={() => handleShare(imageId)}
              className="cursor-pointer flex items-center absolute -bottom-4 right-0 text-xs sm:text-sm bg-white rounded-md text-black px-4 py-1 space-x-2"
            >
              <button>Share</button>
              <ShareSharpIcon />
            </div>

            <div
              onClick={() => handleDownload(downloadURL, `${imageId}`)}
              className="cursor-pointer flex items-center absolute -bottom-4 right-28 text-xs sm:text-sm bg-[#1D1D1D] rounded-md border border-white border-opacity-20 text-white px-4 py-1 space-x-2"
            >
              <button>Download</button>
              <SaveAltIcon />
            </div>
          </div>
        </Box>
      </Modal>
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
    </>
  );
};

export default DownloadModal;
