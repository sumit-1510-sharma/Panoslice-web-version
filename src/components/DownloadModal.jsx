import React from "react";
import { Modal, Box, Typography } from "@mui/material";
import guitarImage from "../assets/guitarimage.jpg";

import SaveAltIcon from "@mui/icons-material/SaveAlt";
import ShareSharpIcon from "@mui/icons-material/ShareSharp";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  height: "70%",
  bgcolor: "#161616",
  boxShadow: 24,
  p: 4,
};

const DownloadModal = ({ open, handleClose }) => {
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
        <div className="relative flex items-center text-white w-full h-full space-x-8">
          <div className="w-[50%] space-y-4">
            <img
              className="object-cover"
              src={guitarImage}
              alt=""
            />
            <div className="flex items-center space-x-4">
              <img
                className="rounded-full w-12 h-12"
                src={guitarImage}
                alt=""
              />
              <p>Sumit Sharma</p>
            </div>
          </div>
          <div className="w-[50%] flex flex-col items-start">
            <h2 className="text-2xl mb-4">Category Name</h2>
            <p className="opacity-70">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
              odio ducimus blanditiis quisquam est dolor, consequuntur quaerat
              eveniet iure dolores aliquam ab suscipit illum id perspiciatis!
              Atque quod sed, recusandae repellendus quasi quae aperiam!
              Consequuntur fugit asperiores, illo distinctio nam labore
              dignissimos est quidem quaerat illum, odio veniam perspiciatis
              enim, eos sunt quasi eius nobis non iste. Iusto, sit vero!
            </p>
            <div className="flex items-center space-x-4 mt-4 opacity-35">
              <p>250 Downloads</p>
              <p>500 views</p>
            </div>
          </div>
          <div className="absolute bottom-0 right-48 bg-white rounded-md text-black px-16 sm:px-8 py-1.5 space-x-2">
          <button>Share</button>
          <ShareSharpIcon />
        </div>
        <div className="absolute bottom-0 right-0 bg-[#1D1D1D] rounded-md text-white px-16 sm:px-8 py-1.5 space-x-2">
          <button>Download</button>
          <SaveAltIcon />
        </div>
        </div>
        
      </Box>
    </Modal>
  );
};

export default DownloadModal;
