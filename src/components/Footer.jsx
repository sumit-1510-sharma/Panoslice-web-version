import React from "react";

const Footer = () => {
  const handleRedirectBlankCanvas = () => {
    window.location.href = "http://blankcanvasdesign.co/";
  };

  return (
    <div className="z-50">
      <div className="bg-[#1D1D1D] h-[40px] sm:h-[60px] text-white fixed -bottom-0.5 w-full">
        <div className="mx-8 sm:mx-24 py-[8.5px] sm:py-[17px] flex items-center justify-between">
          <div className="hidden sm:flex"></div>
          <div
            onClick={handleRedirectBlankCanvas}
            className="cursor-pointer opacity-60 text-sm sm:text-base"
          >
            Blank Canvas Design Co.
          </div>
          <div className="text-sm sm:text-base">Contact</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
