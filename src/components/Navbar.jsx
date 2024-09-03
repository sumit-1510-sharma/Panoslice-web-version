import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { ImagesContext } from "./ImagesContext"; // Import Context
import logo from "../assets/logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const { setSearchQuery } = useContext(ImagesContext);
  const { searchQuery } = useContext(ImagesContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentValue, setCurrentValue] = useState(""); // State to manage input value
  const dropdownRef = useRef(null);
  const location = useLocation();
  const hideSearchBar = location.pathname === "/generate";

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
    }
  }, [searchQuery]);

  const handleSearch = (value) => {
    setCurrentValue(value);
    setSearchQuery(value);
    // Update searchQuery in context
  };

  return (
    <div className="bg-[#1D1D1D] h-[44px] sm:h-[60px] text-white fixed top-0 w-full z-50">
      <div className="w-full py-[14px] flex items-center justify-between -mt-1 sm:mt-0.5 md:-mt-0.5">
        <img
          src={logo}
          onClick={() => {
            
            navigate("/");
            window.location.reload();
          }}
          className="cursor-pointer w-[48px] sm:w-[66px] ml-4 sm:ml-8"
          alt="Logo"
        />

        {!hideSearchBar && (
          <div className="relative flex items-center justify-left w-[36%] sm:w-[30%] border border-[#707070] rounded-md px-1 ml-4 md:ml-[4%] lg:ml-[20%]">
            <SearchIcon />
            <input
              className="bg-[#1D1D1D] text-white text-sm opacity-70 focus:outline-none p-1 max-w-[75%]"
              type="text"
              placeholder="Search by tag"
              value={currentValue} // Set input value to currentValue
              onChange={(e) => {
                setCurrentValue(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(currentValue); // Optional: Hide dropdown on search
                }
              }}
              onClick={() => setShowDropdown(!showDropdown)}
              // Optional: Hide dropdown on blur
            />

            {/* Dropdown code remains unchanged */}

            {showDropdown && (
              <div
                ref={dropdownRef}
                className="absolute flex flex-col items-start justify-between space-y-4 bg-[#161616] mx-2 w-[260px] sm:w-[400px] md:w-[500px] lg:w-[600px] top-10 -left-20 rounded-md border border-[#707070] p-4"
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
                      className="flex items-center w-[200px] sm:w-[330px] md:w-[430px] lg:w-[530px] scrollbar-hide overflow-x-scroll ml-2.5"
                    >
                      <button
                        onClick={() => handleSearch("Nature")}
                        className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30 mx-2"
                      >
                        Nature
                      </button>
                      <button
                        onClick={() => handleSearch("Cyberpunk")}
                        className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30 mx-2"
                      >
                        Cyberpunk
                      </button>
                      <button
                        onClick={() => handleSearch("CyberSecurity")}
                        className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30 mx-2"
                      >
                        CyberSecurity
                      </button>
                      <button
                        onClick={() => handleSearch("AI")}
                        className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30 mx-2"
                      >
                        AI
                      </button>
                      <button
                        onClick={() => handleSearch("HR")}
                        className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30 mx-2"
                      >
                        HR
                      </button>
                      <button
                        onClick={() => handleSearch("Sports")}
                        className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30 mx-2"
                      >
                        Sports
                      </button>
                      <button
                        onClick={() => handleSearch("Sports")}
                        className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30 mx-2"
                      >
                        Sports
                      </button>
                      <button
                        onClick={() => handleSearch("Sports")}
                        className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30 mx-2"
                      >
                        Sports
                      </button>
                      <button
                        onClick={() => handleSearch("Sports")}
                        className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30 mx-2"
                      >
                        Sports
                      </button>

                      {/* Add more tags as needed */}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start space-y-4">
                  <h4 className="text-sm">Popular Categories</h4>
                  <div className="relative">
                    <button className="absolute -left-3">
                      <ArrowLeftIcon />
                    </button>
                    <button className="absolute -right-6">
                      <ArrowRightIcon />
                    </button>
                    <div
                      id="popular-searches"
                      className="flex items-center w-[200px] sm:w-[330px] md:w-[430px] lg:w-[530px] scrollbar-hide overflow-x-scroll ml-2.5"
                    >
                      <button
                        onClick={() => handleSearch("Nature")}
                        className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30 mx-2"
                      >
                        Nature
                      </button>
                      <button
                        onClick={() => handleSearch("Cyberpunk")}
                        className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30 mx-2"
                      >
                        Cyberpunk
                      </button>
                      <button
                        onClick={() => handleSearch("CyberSecurity")}
                        className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30 mx-2"
                      >
                        CyberSecurity
                      </button>
                      <button
                        onClick={() => handleSearch("AI")}
                        className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30 mx-2"
                      >
                        AI
                      </button>
                      <button
                        onClick={() => handleSearch("HR")}
                        className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30 mx-2"
                      >
                        HR
                      </button>
                      <button
                        onClick={() => handleSearch("Sports")}
                        className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30 mx-2"
                      >
                        Sports
                      </button>
                      <button
                        onClick={() => handleSearch("Sports")}
                        className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30 mx-2"
                      >
                        Sports
                      </button>
                      <button
                        onClick={() => handleSearch("Sports")}
                        className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30 mx-2"
                      >
                        Sports
                      </button>
                      <button
                        onClick={() => handleSearch("Sports")}
                        className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30 mx-2"
                      >
                        Sports
                      </button>
                      {/* Add more tags as needed */}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center space-x-6 mr-4 sm:mr-8">
          <button
            onClick={() => navigate("/toptools")}
            className="flex items-center space-x-2"
          >
            <span className="hidden sm:flex">Explore</span>
            <span className="text-sm sm:text-base">More AI Tools</span>
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
