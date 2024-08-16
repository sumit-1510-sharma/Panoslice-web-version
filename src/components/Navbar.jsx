import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#1D1D1D] h-[44px] sm:h-[60px] text-white fixed top-0 w-full z-50">
      <div className="mx-8 py-[14px] flex items-center justify-between -mt-1 sm:-mt-0.5">
        <div onClick={() => navigate("/")} className="cursor-pointer">
          Panoslice
        </div>

        <div className="flex items-center space-x-6">
          <button onClick={() => navigate("/toptools")} className="flex items-center space-x-2">
            <span className="hidden sm:flex">Explore</span>
            <span>More AI Tools</span>
          </button>
          <button
            onClick={() => navigate("/generate")}
            className="bg-white rounded-full text-black px-12 py-1.5 hidden sm:flex"
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
