import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleRedirectBlankCanvas = () => {
    window.location.href = "http://blankcanvasdesign.co/";
  };

  const handleBlogClick = () => {
    navigate("/blog");
  };

  const handleTermsClick = () => {
    navigate("/terms-of-service");
  };

  const handlePrivacyPolicyClick = () => {
    navigate("/privacy-policy");
  };

  const handleContactClick = () => {
    window.location.href =
      "mailto:dipin@blankcanvasdesign.co?subject=Contact%20Inquiry&body=Hello%20there%2C%0A%0A...";
  };

  const handleBecomeACr8rClick = () => {
    window.location.href = "https://forms.gle/s9y4znoAF7uSjx25A";
  };

  return (
    <div className="z-50">
      <div className="bg-[#1D1D1D] h-[40px] sm:h-[60px] text-white fixed -bottom-0.5 w-full">
        <div className="mx-4 sm:mx-8 py-[8.5px] sm:py-[17px] flex items-center justify-between overflow-x-auto scroll-smooth">
          <button
            onClick={handleRedirectBlankCanvas}
            className="opacity-60 text-sm sm:text-base whitespace-nowrap"
          >
            Blank Canvas Design Co.
          </button>
          <div className="text-sm sm:text-base flex space-x-8 ml-12 whitespace-nowrap">
            <button onClick={handleBlogClick}>Blog</button>
            <button onClick={handleContactClick}>Contact</button>
            <button onClick={handleBecomeACr8rClick}>Become a cr8r</button>
            <button onClick={handleTermsClick}>Terms of Service</button>
            <button onClick={handlePrivacyPolicyClick}>Privacy Policy</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
