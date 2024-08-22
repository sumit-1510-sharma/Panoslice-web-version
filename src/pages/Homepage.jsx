import React, { useState, useEffect } from "react";
import Tool from "../components/Tool";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import spaceImage from "../assets/spaceimage.jpg";
import guitarImage from "../assets/guitarImage.jpg";
import octoberImage from "../assets/october.jpg";
import { useNavigate } from "react-router-dom";
import carouselMaker from "../assets/carouselmaker.png";
import blogToCarousel from "../assets/blogtocarousel.png";
import aiArtGenerator from "../assets/aiartgenerator.png";
import bgRemover from "../assets/bgremover.png";
import aiReelMaker from "../assets/aireelmaker.png";
import aiColorGrader from "../assets/aicolorgrader.png";
import aiHashtagGenerator from "../assets/aihashtaggenerator.png";
import aiCaptionWriter from "../assets/aicaptionwriter.png";
import bulkEditor from "../assets/bulkeditor.png";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import ShareSharpIcon from "@mui/icons-material/ShareSharp";
import DownloadModal from "../components/DownloadModal";
import Marquee from "react-fast-marquee";

const guitar = [
  guitarImage,
  guitarImage,
  guitarImage,
  guitarImage,
  guitarImage,
];

const space = [spaceImage, spaceImage, spaceImage, spaceImage, spaceImage];

const october = [
  octoberImage,
  octoberImage,
  octoberImage,
  octoberImage,
  octoberImage,
];

const allImages = [...guitar, ...space, ...october];

const Homepage = () => {
  const [category, setCategory] = useState("all");
  const [displayedImages, setDisplayedImages] = useState(allImages);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // useEffect(() => {
  //   if (category === "all") {
  //     const shuffledImages = [...allImages].sort(() => Math.random() - 0.5);
  //     setDisplayedImages(shuffledImages);
  //   }
  // }, [category]);

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    if (cat === "all") {
      const shuffledImages = [...allImages].sort(() => Math.random() - 0.5);
      setDisplayedImages(shuffledImages);
    } else {
      const imagesMap = {
        guitar,
        space,
        october,
      };
      setDisplayedImages(imagesMap[cat]);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const categories = ["all", "guitar", "space", "october"];

  const handleRedirectPanoslice = () => {
    window.location.href = "https://panoslicepro.page.link/XH3T";
  };

  const handleRedirectLono = () => {
    window.location.href =
      "https://apps.apple.com/in/app/lono-ai-reel-video-editor/id1632742723";
  };

  return (
    <div>
      <div className="flex flex-col items-center text-white mx-12 sm:mx-16">
        {/* marqee component */}

        <div className="bg-[#1D1D1D] rounded-full py-1 px-4 mt-32 shadow-[0_0_24px_10px_rgba(178,118,170,0.5)] z-10">
          <div className="flex items-center w-[35vw]">
            <p
              onClick={() => navigate("/toptools")}
              className="cursor-pointer pr-3 rounded-full"
            >
              Top AI Tools:
            </p>
            <div className="flex items-center w-[77%]">
              <Marquee pauseOnHover={true}>
                <div className="flex items-center space-x-4 mx-2">
                  <div
                    className="cursor-pointer"
                    onClick={handleRedirectPanoslice}
                  >
                    <Tool title="AI Carousel Maker" image={carouselMaker} />
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={handleRedirectPanoslice}
                  >
                    <Tool title="Blog To Carousel" image={blogToCarousel} />
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={handleRedirectPanoslice}
                  >
                    <Tool title="AI Art Generator" image={aiArtGenerator} />
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={handleRedirectPanoslice}
                  >
                    <Tool title="BG Remover" image={bgRemover} />
                  </div>
                  <div className="cursor-pointer" onClick={handleRedirectLono}>
                    <Tool title="AI Reel Maker" image={aiReelMaker} />
                  </div>
                  <div className="cursor-pointer" onClick={handleRedirectLono}>
                    <Tool title="AI Color Grading" image={aiColorGrader} />
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={handleRedirectPanoslice}
                  >
                    <Tool
                      title="AI Hashtag Generator"
                      image={aiHashtagGenerator}
                    />
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={handleRedirectPanoslice}
                  >
                    <Tool title="AI Caption Writer" image={aiCaptionWriter} />
                  </div>
                  <div className="cursor-pointer" onClick={handleRedirectLono}>
                    <Tool title="Bulk Editor" image={bulkEditor} />
                  </div>
                </div>
              </Marquee>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-5 mt-12">
          <p className="text-[40px] sm:text-[44px] leading-tight sm:leading-tight max-w-lg text-center">
            Best AI Art for your posts, blogs, brand
          </p>

          {/* <div className="-space-y-2">
            <p className="text-[40px] sm:text-[44px] leading-tight sm:leading-tight max-w-lg text-center">
              Best AI art for your
            </p>
            <p className="text-[40px] font-bold sm:text-[44px] leading-tight sm:leading-tight max-w-lg text-center">
              Posts, Blogs, Brands
            </p>
          </div> */}

          <p className="text-center">
            Free forever. Stop Reading, Start Creating.
          </p>
          <button
            onClick={() => navigate("/generate")}
            className="bg-white rounded-full text-black px-16 sm:px-24 py-1.5"
          >
            Generate
          </button>
        </div>

        <div className="flex items-center justify-between w-full mt-2 sticky top-[44px] sm:top-[60px] py-4 border-b border-[#B276AA] border-opacity-25 bg-[#161616] z-10">
          <p>Browse Images</p>
          <div className="relative">
            <div
              onClick={toggleMenu}
              className="flex items-center cursor-pointer bg-black rounded-full pl-5 space-x-3 pr-2 border group border-white"
            >
              <button>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
              <ArrowRightIcon
                className={`transition-transform ease-in-out ${
                  isOpen ? "rotate-90" : ""
                }`}
                fontSize=""
              />
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute top-6 right-0 mt-2 w-40 bg-black bg-opacity-75 border border-white border-opacity-50 rounded-md shadow-lg z-10">
                <ul className="text-white">
                  {categories.map((cat, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-gray-800 rounded-md cursor-pointer"
                      onClick={() => {
                        handleCategoryChange(cat);
                        toggleMenu();
                      }}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Image Gallery */}
        <div className="columns-1 sm:columns-2 md:columns-3 gap-5 mt-8 mb-24">
          {displayedImages.map((item, index) => (
            <div
              key={index}
              className="cursor-pointer relative group hover:opacity-85 transition-opacity duration-300"
            >
              <img
                src={item}
                alt=""
                className="mb-5 border border-[#B276AA] border-opacity-25 rounded-sm"
              />
              <DownloadModal
                open={isModalOpen}
                handleClose={handleCloseModal}
              />

              {/* Share Icon */}
              <div>
                <div className="cursor-pointer absolute bottom-3 right-3 bg-black py-1 px-1.5 rounded-md hidden opacity-60 group-hover:flex hover:opacity-100">
                  <ShareSharpIcon />
                </div>

                {/* Save Icon */}
                <div
                  onClick={handleOpenModal}
                  className="cursor-pointer absolute bottom-3 left-3 bg-black py-1 px-1.5 rounded-md hidden opacity-60 group-hover:flex hover:opacity-100"
                >
                  <SaveAltIcon />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
