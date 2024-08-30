import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { ImagesContext } from "./ImagesContext"; // Import Context
import logo from "../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const { setSearchQuery } = useContext(ImagesContext);
  const { images } = useContext(ImagesContext);
  const { searchQuery } = useContext(ImagesContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentValue, setCurrentValue] = useState(""); // State to manage input value
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Function to handle clicks outside the dropdown
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    // Add event listener for clicks outside the dropdown
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchQuery) {
      navigate(`/search/${searchQuery}`);
      setShowDropdown(false); // Hide dropdown on search
    } else {
      navigate("/");
    }
  }, [searchQuery, navigate]);

  const handleSearch = () => {
    setSearchQuery(currentValue); // Update searchQuery in context
  };

  return (
    <div className="bg-[#1D1D1D] h-[44px] sm:h-[60px] text-white fixed top-0 w-full z-50">
      <div className="w-full py-[14px] flex items-center justify-between -mt-1 sm:mt-0.5 md:-mt-0.5">
        <img
          src={logo}
          onClick={() => navigate("/")}
          className="cursor-pointer w-[66px] ml-8"
          alt="Logo"
        />

        <div className="relative sm:flex items-center justify-left w-[30%] border border-[#707070] rounded-md px-1 md:ml-[4%] lg:ml-[20%]">
          <SearchIcon />
          <input
            className="bg-[#1D1D1D] text-white text-sm opacity-70 focus:outline-none p-1"
            type="text"
            placeholder="Search by tag"
            value={currentValue} // Set input value to currentValue
            onChange={(e) => {
              // Update currentValue on change
              setCurrentValue(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch(); // Optional: Hide dropdown on search
              }
            }}
            onClick={() => setShowDropdown(!showDropdown)}
            // Optional: Hide dropdown on blur
          />

          {/* Dropdown code remains unchanged */}

          {showDropdown && (
            <div
              ref={dropdownRef}
              className="absolute flex flex-col items-start justify-between space-y-4 bg-[#161616] w-[50vw] top-10 -left-20 rounded-md border border-[#707070] p-4"
            >
              <div className="flex flex-col items-start space-y-4">
                <h4 className="text-sm">Popular Searches</h4>
                <div className="relative">
                  <button className="absolute -left-3">
                    <ArrowLeftIcon />
                  </button>
                  <button className="absolute -right-6">
                    <ArrowRightIcon />
                  </button>
                  <div
                    id="popular-searches"
                    className="flex items-center w-[45vw] scrollbar-hide overflow-x-scroll ml-2.5"
                  >
                    <button className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30 mx-2">
                      Nature
                    </button>
                    <button className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30 mx-2">
                      Cyberpunk
                    </button>
                    <button className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30 mx-2">
                      CyberSecurity
                    </button>
                    <button className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30 mx-2">
                      AI
                    </button>
                    <button className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30 mx-2">
                      HR
                    </button>
                    <button className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30 mx-2">
                      Sports
                    </button>
                    <button className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30 mx-2">
                      Sports
                    </button>
                    <button className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30 mx-2">
                      Sports
                    </button>
                    <button className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30 mx-2">
                      Sports
                    </button>

                    {/* Add more tags as needed */}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <h4 className="text-sm">Popular Searches</h4>
                <div className="relative">
                  <button className="absolute -left-3">
                    <ArrowLeftIcon />
                  </button>
                  <button className="absolute -right-6">
                    <ArrowRightIcon />
                  </button>
                  <div
                    id="popular-searches"
                    className="flex items-center w-[45vw] scrollbar-hide overflow-x-scroll ml-2.5"
                  >
                    <button className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30 mx-2">
                      Nature
                    </button>
                    <button className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30 mx-2">
                      Cyberpunk
                    </button>
                    <button className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30 mx-2">
                      CyberSecurity
                    </button>
                    <button className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30 mx-2">
                      AI
                    </button>
                    <button className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30 mx-2">
                      HR
                    </button>
                    <button className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30 mx-2">
                      Sports
                    </button>
                    <button className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30 mx-2">
                      Sports
                    </button>
                    <button className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30 mx-2">
                      Sports
                    </button>
                    <button className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30 mx-2">
                      Sports
                    </button>

                    {/* Add more tags as needed */}
                  </div>
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
