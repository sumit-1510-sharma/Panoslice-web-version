import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { ImagesContext } from "./ImagesContext"; // Import Context
import logo from "../assets/logo.png";
import searchIcon from "../assets/searchIcon.png";
// import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { setSearchQuery } = useContext(ImagesContext);
  const { searchQuery } = useContext(ImagesContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentValue, setCurrentValue] = useState(""); // State to manage input value
  const dropdownRef = useRef(null);
  const location = useLocation();
  const hideSearchBar =
    location.pathname === "/generate" || location.pathname === "/blog";

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

  const handleSearch = (value) => {
    if (value) {
      setCurrentValue("");
      setSearchQuery(value);
      navigate(`/search/${value}`);
      setShowDropdown(false);
    }
  };

  const popularSearchesRef = useRef(null);
  const popularCategoriesRef = useRef(null);

  const handleScroll = (direction, ref) => {
    if (ref.current) {
      const scrollAmount = 100; // Adjust this value for how far to scroll
      if (direction === "left") {
        ref.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="bg-[#1D1D1D] h-[44px] sm:h-[60px] text-white fixed top-0 w-full z-50">
      <div className="w-full py-[14px] flex items-center justify-between -mt-1 sm:mt-0.5 md:-mt-0.5">
        <img
          src={logo}
          onClick={() => navigate("/")}
          className="cursor-pointer w-[48px] sm:w-[66px] ml-4 sm:ml-8"
          alt="Logo"
        />

        {!hideSearchBar && (
          <div className="relative flex items-center justify-left w-[36%] sm:w-[30%] border sm:space-x-2 border-[#707070] rounded-md px-1 ml-4 md:ml-[4%] lg:ml-[20%]">
            <img className="w-6" src={searchIcon} alt="" />
            <input
              className="bg-[#1D1D1D] text-white text-sm opacity-100 focus:outline-none p-1 max-w-[75%]"
              type="text"
              placeholder="What’s the vibe?"
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
                    <button
                      onClick={() => handleScroll("left", popularSearchesRef)}
                      className="absolute -left-3"
                    >
                      <ArrowLeftIcon />
                    </button>
                    <button
                      onClick={() => handleScroll("right", popularSearchesRef)}
                      className="absolute -right-6"
                    >
                      <ArrowRightIcon />
                    </button>
                    <div
                      id="popular-searches"
                      ref={popularSearchesRef}
                      className="flex items-center w-[200px] sm:w-[330px] md:w-[430px] lg:w-[530px] scrollbar-hide overflow-x-scroll ml-2.5"
                    >
                      <button
                        onClick={() => handleSearch("nature")}
                        className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30 mx-2"
                      >
                        nature
                      </button>
                      <button
                        onClick={() => handleSearch("gaming")}
                        className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30 mx-2"
                      >
                        gaming
                      </button>
                      <button
                        onClick={() => handleSearch("ocean")}
                        className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30 mx-2"
                      >
                        ocean
                      </button>
                      <button
                        onClick={() => handleSearch("dark")}
                        className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30 mx-2"
                      >
                        dark
                      </button>
                      <button
                        onClick={() => handleSearch("company")}
                        className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30 mx-2"
                      >
                        company
                      </button>
                      <button
                        onClick={() => handleSearch("sports")}
                        className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30 mx-2"
                      >
                        sports
                      </button>
                      <button
                        onClick={() => handleSearch("technology")}
                        className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30 mx-2"
                      >
                        technology
                      </button>

                      {/* Add more tags as needed */}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start space-y-4">
                  <h4 className="text-sm">Popular Categories</h4>
                  <div className="relative">
                    <button
                      onClick={() => handleScroll("left", popularCategoriesRef)}
                      className="absolute -left-3"
                    >
                      <ArrowLeftIcon />
                    </button>
                    <button
                      onClick={() =>
                        handleScroll("right", popularCategoriesRef)
                      }
                      className="absolute -right-6"
                    >
                      <ArrowRightIcon />
                    </button>
                    <div
                      id="popular-searches"
                      ref={popularCategoriesRef}
                      className="flex items-center w-[200px] sm:w-[330px] md:w-[430px] lg:w-[530px] scrollbar-hide overflow-x-scroll ml-2.5"
                    >
                      <button
                        onClick={() => handleSearch("AI")}
                        className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30 mx-2"
                      >
                        AI
                      </button>
                      <button
                        onClick={() => handleSearch("ML")}
                        className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30 mx-2"
                      >
                        ML
                      </button>
                      <button
                        onClick={() => handleSearch("Commerce")}
                        className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30 mx-2"
                      >
                        Commerce
                      </button>

                      <button
                        onClick={() => handleSearch("Fintech")}
                        className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30 mx-2"
                      >
                        Fintech
                      </button>
                      <button
                        onClick={() => handleSearch("Gaming")}
                        className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30 mx-2"
                      >
                        Gaming
                      </button>
                      <button
                        onClick={() => handleSearch("Healthcare")}
                        className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30 mx-2"
                      >
                        Healthcare
                      </button>
                      <button
                        onClick={() => handleSearch("Product")}
                        className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30 mx-2"
                      >
                        Product
                      </button>
                      <button
                        onClick={() => handleSearch("Remote")}
                        className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30 mx-2"
                      >
                        Remote
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
