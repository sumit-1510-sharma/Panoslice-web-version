import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

const Navbar = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="bg-[#1D1D1D] h-[44px] sm:h-[60px] text-white fixed top-0 w-full z-50">
      <div className="w-full py-[14px] flex items-center justify-between -mt-1 sm:mt-0.5 md:-mt-0.5">
        <div onClick={() => navigate("/")} className="cursor-pointer ml-8">
          Panoslice
        </div>

        <div className="relative sm:flex items-center justify-left w-[30%] border border-[#707070] rounded-md px-1 md:ml-[4%] lg:ml-[20%]">
          <SearchIcon />
          <input
            className="bg-[#1D1D1D] text-white text-sm opacity-70 focus:outline-none p-1"
            type="text"
            onClick={() => setShowDropdown(!showDropdown)}
            onBlur={() => setShowDropdown(false)} // Optional: Hide on blur
          />

          {showDropdown && (
            <div className="absolute flex flex-col items-start justify-between space-y-4 bg-[#161616] w-[50vw] top-10 -left-20 rounded-md border border-[#707070] p-4">
              <div className="flex flex-col items-start space-y-4">
                <h4 className="text-sm">Popular Searches</h4>
                <div className="flex items-center flex-wrap gap-x-4 gap-y-2">
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
              <div className="flex flex-col items-start space-y-4">
                <h4 className="text-sm">Categories</h4>
                <div className="flex items-center flex-wrap gap-x-4 gap-y-2">
                  <button className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30">
                    AI & ML
                  </button>
                  <button className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30">
                    Remote Work
                  </button>
                  <button className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30">
                    HR
                  </button>
                  <button className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30">
                    Gaming
                  </button>
                  <button className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30">
                    Cybersecurity
                  </button>
                  <button className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30">
                    Sports
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-6 mx-8">
          <button
            onClick={() => navigate("/toptools")}
            className="flex items-center space-x-2"
          >
            <span className="hidden sm:flex">Explore</span>
            <span>More AI Tools</span>
          </button>
          <button
            onClick={() => navigate("/generate")}
            className="bg-white rounded-full text-black px-12 py-1.5 hidden md:flex"
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
