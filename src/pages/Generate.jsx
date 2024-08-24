import React from "react";
import BrowserUpdatedIcon from "@mui/icons-material/BrowserUpdated";
import ImageIcon from "@mui/icons-material/Image";
import downloadIcon from "../assets/downloadIcon.png";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import "./Generate.css";

const Generate = () => {
  return (
    <div className="mt-24 mx-10">
      <div className="flex items-center text-white mb-6 space-x-3">
        <p>Prompt</p>
        <InfoOutlinedIcon className="text-[#D398C3]" fontSize="" />
      </div>
      <div className="flex flex-col md:flex-row items-start">
        {/* Left side: Text area for input */}
        <div className="w-[100%] md:w-[40%]">
          <textarea
            className="w-full text-white h-60 p-4 bg-[#343434] rounded-md resize-y focus:outline-none"
            placeholder="Enter your prompt here..."
          ></textarea>

          <div className="flex items-center justify-between">
            <select className="w-[50%] px-6 py-1 mt-4 mr-2 bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option defaultChecked value="option1">
                Square (1:1)
              </option>
              <option value="option2">Landscape (16:9)</option>
              <option value="option3">Portrait 1 (9:16)</option>
              <option value="option4">Portrait 2 (4:5)</option>
            </select>

            <select className="w-[50%] px-6 py-1 mt-4 ml-2 bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option defaultChecked value="illustration">
                Illustration
              </option>
              <option value="animated">Animated</option>
              <option value="realistic">Realistic</option>
              <option value="nature">Nature</option>
              <option value="historical">Historical</option>
              <option value="abstract">Abstract</option>
              <option value="fantasy">Fantasy</option>
              <option value="sci-fi">Sci-Fi</option>
              <option value="cyberpunk">Cyberpunk</option>
              <option value="vintage">Vintage</option>
            </select>
          </div>
          <button className="w-full mt-5 md:mb-24 px-6 py-2.5 bg-white rounded-md">
            Generate Image
          </button>
        </div>
        <hr className="md:hidden border border-[#B276AA] border-opacity-30 w-full my-10 sm:my-16" />

        <div className="hidden md:flex h-[67vh] -mt-10 border-l mx-[5%] border border-[#B276AA] border-opacity-30"></div>

        {/* Right side: Blank canvas for generated image */}
        <div className="section-with-dots mb-24 relative w-[100%] md:w-[50%] flex items-center justify-center rounded-md">
          <div className="w-full h-[350px] flex items-center justify-center">
            {/* This is where the generated image would be displayed */}
            <p className="text-gray-500 mx-[5%] text-center pt-2.5 pb-1 w-full bg-[#161616]">
              Generated image will appear here
            </p>
          </div>
          <div className="cursor-pointer absolute top-4 right-4 bg-[#1D1D1D] rounded-md py-3 px-3">
            <img src={downloadIcon} alt="" className="w-4" />
          </div>
        </div>
      </div>


      <div>
        
      </div>
    </div>
  );
};

export default Generate;
