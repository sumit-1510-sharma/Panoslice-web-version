import React, { useState, useEffect } from "react";
import { Modal, Box, IconButton } from "@mui/material";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import ShareSharpIcon from "@mui/icons-material/ShareSharp";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

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
  p: 4,
};

const DownloadModal = ({ url, onClose, tags }) => {
  const navigate = useNavigate();
  const [fitMode, setFitMode] = useState("object-contain");
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    // Assuming the tags could come from the image metadata or similar
    const tags = ["nature", "art", "technology", "abstract", "creative"];
    const shuffledTags = [...tags].sort(() => 0.5 - Math.random());
    setSelectedTags(shuffledTags.slice(0, 5));
  }, []);

  const handleShare = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("Image URL copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const downloadImage = (url, filename = "downloaded_image.png") => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownload = () => {
    if (url) {
      downloadImage(url, "generated_image.png");
    }
  };

  return (
    <Modal
      open={!!url}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      BackdropProps={{
        style: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
      }}
    >
      <Box sx={modalStyle}>
        <div className="relative flex text-white w-full h-full space-x-8">
          <IconButton
            onClick={onClose}
            edge="end"
            color="inherit"
            aria-label="close"
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "#ffffff",
            }}
          >
            <CloseIcon />
          </IconButton>

          <div className="w-[60%] flex flex-col h-full space-y-4">
            <div className="w-full h-[80%] flex bg-[#1D1D1D] items-center justify-center relative rounded-md">
              <img
                className={`rounded-md w-full h-full ${fitMode}`}
                src={url}
                alt="Preview"
              />
              <div className="absolute text-xs flex items-center space-x-3 -bottom-5 right-1 opacity-40">
                <p>250 downloads</p>
                <p>700 views</p>
              </div>
            </div>
            <div
              onClick={() => navigate("/creator")}
              className="cursor-pointer flex items-center space-x-4"
            >
              <img
                className="rounded-full object-cover w-10 h-10"
                src={url}
                alt="Creator"
              />
              <p>Sumit Sharma</p>
            </div>
          </div>

          <div className="w-[40%] flex flex-col items-start space-y-4">
            <h2 className="text-lg">Category Name</h2>
            <p className="text-xs opacity-70">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
              odio ducimus blanditiis quisquam est dolor, consequuntur quaerat
              eveniet iure dolores aliquam ab suscipit illum id perspiciatis!
            </p>
            <div>
              <h2 className="text-lg mb-2">Tags</h2>
              <div className="flex items-center flex-wrap gap-x-2 gap-y-2">
                {selectedTags.map((tag, index) => (
                  <button
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
            onClick={handleShare}
            className="cursor-pointer flex items-center absolute -bottom-2 right-0 text-sm bg-white rounded-md text-black px-12 sm:px-6 py-1 space-x-2"
          >
            <button>Share</button>
            <ShareSharpIcon />
          </div>

          <div
            onClick={handleDownload}
            className="cursor-pointer flex items-center absolute -bottom-2 right-32 text-sm bg-[#1D1D1D] rounded-md border border-white border-opacity-20 text-white px-12 sm:px-6 py-1 space-x-2"
          >
            <button>Download</button>
            <SaveAltIcon />
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default DownloadModal;
