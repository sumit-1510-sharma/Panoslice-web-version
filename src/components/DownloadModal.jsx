import React, { useState, useEffect, useContext } from "react";
import { Modal, Box, IconButton, Snackbar } from "@mui/material";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import ShareSharpIcon from "@mui/icons-material/ShareSharp";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { ImagesContext } from "./ImagesContext";
import { db } from "../firebase"; // Assuming you have a firebaseConfig file
import { collection, query, where, getDocs } from "firebase/firestore";
import MuiAlert from "@mui/material/Alert";

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

const DownloadModal = ({ imageUrl, imageId, onClose }) => {
  const navigate = useNavigate();
  const [fitMode, setFitMode] = useState("object-contain");
  const { setSearchQuery } = useContext(ImagesContext);
  const [imageData, setImageData] = useState(null);
  const [tags, setTags] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  useEffect(() => {
    const fetchImageDoc = async () => {
      if (!imageUrl) return;

      try {
        // Query Firestore for the document where the imageUrl matches
        const q = query(
          collection(db, "AI and ML"),
          where("downloadURL", "==", imageUrl)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          // Assuming there is only one document with this imageUrl
          setImageData(doc.data());
          setTags(doc.data().tags || []); // Assuming tags are part of the document data
        }
      } catch (error) {
        console.error("Error fetching image document:", error);
      }
    };

    fetchImageDoc();
  }, [imageUrl]);

  const handleShare = (imageId) => {
    const url = `${window.location.origin}/gallery?imageId=${imageId}`;
    navigator.clipboard.writeText(url).then(() => {
      setSnackbarOpen(true); // Show the snackbar
    });
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

  const handleSearch = (value) => {
    setSearchQuery(value);
    navigate(`/gallery/${value}`);
  };

  return (
    <>
      <Modal
        open={!!imageUrl}
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
              <div className="w-full sm:h-[60%] md:h-[70%] flex bg-[#1D1D1D] items-center justify-center relative rounded-md">
                <img
                  className={`rounded-md w-full h-full ${fitMode}`}
                  src={imageUrl}
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
                  className="rounded-full object-cover w-10 h-10"
                  src={imageUrl}
                  alt="Creator"
                />
                <p>Dipin Chopra</p>
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
              onClick={() => handleDownload(imageUrl, `${imageId}.webp`)}
              className="cursor-pointer flex items-center absolute -bottom-4 -left-4 text-xs sm:text-sm bg-[#1D1D1D] rounded-md border border-white border-opacity-20 text-white px-4 py-1 space-x-2"
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
