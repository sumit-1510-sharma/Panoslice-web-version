import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { ImagesContext } from "./ImagesContext"; // Import Context

const Navbar = () => {
  const navigate = useNavigate();
  const { setSearchQuery } = useContext(ImagesContext);
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
            placeholder="Search by tag"
            onChange={(e) => setSearchQuery(e.target.value)}
            onClick={() => setShowDropdown(!showDropdown)}
            onBlur={() => setShowDropdown(false)} // Optional: Hide on blur
          />

          {/* Dropdown code remains unchanged */}
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
