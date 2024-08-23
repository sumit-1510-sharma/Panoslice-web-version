import React, { useState } from "react";
import { Modal, Box, Typography } from "@mui/material";
import guitarImage from "../assets/guitarImage.jpg";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import ShareSharpIcon from "@mui/icons-material/ShareSharp";
import { useNavigate } from "react-router-dom";
import plantImage from "../assets/plantimage.jpg";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  height: "75%",
  bgcolor: "#161616",
  boxShadow: 24,
  p: 4,
};

const DownloadModal = ({ open, handleClose, image }) => {
  const navigate = useNavigate();

  const [fitMode, setFitMode] = useState("object-contain");
  const toggleFitMode = () => {
    setFitMode((prevMode) =>
      prevMode === "object-contain" ? "object-cover" : "object-contain"
    );
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      BackdropProps={{
        style: { backgroundColor: "rgba(0, 0, 0, 0.05)" }, // Slight transparency
      }}
    >
      <Box sx={modalStyle}>
        <div className="relative flex text-white w-full h-full space-x-4">
          <div className="w-[60%] flex flex-col h-full space-y-4">
            <div className="w-full h-[80%] flex bg-[#1D1D1D] items-center justify-center relative rounded-sm">
              <img className={`w-full h-full ${fitMode}`} src={plantImage} alt="" />
              {/* <button
                onClick={toggleFitMode}
                className="absolute bottom-2 right-2 bg-white text-black px-4 py-1 rounded"
              >
                Toggle Fit
              </button> */}
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
                src={image}
                alt=""
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
              Atque quod sed, recusandae repellendus quasi quae aperiam!
              Consequuntur fugit asperiores, illo distinctio nam labore
              dignissimos est quidem quaerat illum, odio veniam perspiciatis
              enim, eos sunt quasi eius nobis non iste. Iusto, sit vero!
            </p>
            <div>
              <h2 className="text-lg mb-2">Tags</h2>
              <div className="flex items-center flex-wrap gap-x-2 gap-y-2">
                <button className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30">
                  Nature
                </button>
                <button className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30">
                  Cyberpunk
                </button>
                <button className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30">
                  CyberSecurity
                </button>
                <button className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30">
                  AI
                </button>
                <button className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30">
                  HR
                </button>
                <button className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30">
                  Sports
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center absolute -bottom-2 right-0 text-sm bg-white rounded-md text-black px-12 sm:px-6 py-1 space-x-2">
            <button>Share</button>
            <ShareSharpIcon />
          </div>
          <div className="flex items-center absolute -bottom-2 right-32 text-sm bg-[#1D1D1D] rounded-md border border-white border-opacity-20 text-white px-12 sm:px-6 py-1 space-x-2">
            <button>Download</button>
            <SaveAltIcon />
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default DownloadModal;
