import React, { useState, useEffect, useContext } from "react";
import Tool from "../components/Tool";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useNavigate } from "react-router-dom";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import ShareSharpIcon from "@mui/icons-material/ShareSharp";
import DownloadModal from "../components/DownloadModal";
import Marquee from "react-fast-marquee";
import { Skeleton } from "@mui/material";
import { ImagesContext } from "../components/ImagesContext";
import carouselMaker from "../assets/carouselmaker.png";
import blogToCarousel from "../assets/blogtocarousel.png";
import aiArtGenerator from "../assets/aiartgenerator.png";
import bgRemover from "../assets/bgremover.png";
import aiReelMaker from "../assets/aireelmaker.png";
import aiColorGrader from "../assets/aicolorgrader.png";
import aiHashtagGenerator from "../assets/aihashtaggenerator.png";
import aiCaptionWriter from "../assets/aicaptionwriter.png";
import bulkEditor from "../assets/bulkeditor.png";

const Homepage = () => {
  const [category, setCategory] = useState("All");
  const [displayedImages, setDisplayedImages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { images } = useContext(ImagesContext);

  useEffect(() => {
    console.log(images);
    setIsLoading(true);

    setDisplayedImages(images);
    setIsLoading(false);
  }, [images]);

  const handleCategoryChange = (cat) => {
    setCategory(cat);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const categories = [
    "All",
    "AI and ML",
    "Climate Tech",
    "Commerce & Retail",
    "Fintech",
    "Gaming",
    "Healthcare",
    "HR & Team",
    "Product Shoot",
    "Remote Work",
  ];

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
        <div className="bg-[#1D1D1D] rounded-full py-1 px-4 mt-32 shadow-[0_0_24px_10px_rgba(178,118,170,0.5)] z-10">
          <div className="flex items-center w-[35vw]">
            <p
              onClick={() => navigate("/toptools")}
              className="cursor-pointer pr-3 rounded-full"
            >
              Top AI Tools:
            </p>
            <div className="flex items-center w-[77%]">
              <Marquee pauseOnHover={true} speed={27}>
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

        {isLoading ? (
          <div className="w-full opacity-50 columns-1 sm:columns-2 md:columns-3 gap-5 mt-8 mb-24">
            <Skeleton
              variant="rectangular"
              animation="wave"
              sx={{ bgcolor: "grey.700" }}
              height={200}
              className="mb-5 rounded-sm"
            />
            <Skeleton
              variant="rectangular"
              animation="wave"
              sx={{ bgcolor: "grey.800" }}
              height={300}
              className="mb-5 rounded-sm"
            />
            <Skeleton
              variant="rectangular"
              animation="wave"
              sx={{ bgcolor: "grey.900" }}
              height={400}
              className="mb-5 rounded-sm"
            />
            <Skeleton
              variant="rectangular"
              animation="wave"
              sx={{ bgcolor: "grey.800" }}
              height={300}
              className="mb-5 rounded-sm"
            />
            <Skeleton
              variant="rectangular"
              animation="wave"
              sx={{ bgcolor: "grey.900" }}
              height={400}
              className="mb-5 rounded-sm"
            />
            <Skeleton
              variant="rectangular"
              animation="wave"
              sx={{ bgcolor: "grey.800" }}
              height={200}
              className="mb-5 rounded-sm"
            />
            <Skeleton
              variant="rectangular"
              animation="wave"
              sx={{ bgcolor: "grey.800" }}
              height={250}
              className="mb-5 rounded-sm"
            />
            <Skeleton
              variant="rectangular"
              animation="wave"
              sx={{ bgcolor: "grey.900" }}
              height={300}
              className="mb-5 rounded-sm"
            />
            <Skeleton
              variant="rectangular"
              animation="wave"
              sx={{ bgcolor: "grey.800" }}
              height={350}
              className="mb-5 rounded-sm"
            />
          </div>
        ) : (
          <div className="w-full columns-1 sm:columns-2 md:columns-3 gap-5 mt-8 mb-24">
            {displayedImages.length > 0 ? (
              displayedImages.map((image, index) => (
                <div
                  key={index}
                  className="cursor-pointer mb-5 relative hover:shadow-lg hover:scale-[102%] transition duration-300 ease-in-out"
                >
                  <img
                    src={image.downloadURL}
                    alt={`Image ${index + 1}`}
                    className="w-full h-auto rounded-sm"
                  />
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <SaveAltIcon
                      className="cursor-pointer"
                      onClick={() => setOpenModal(image.downloadURL)}
                    />
                    <ShareSharpIcon className="cursor-pointer" />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center w-full text-white opacity-50">
                No images available in this category.
              </p>
            )}
          </div>
        )}
      </div>

      {openModal && (
        <DownloadModal url={openModal} onClose={() => setOpenModal(null)} />
      )}
    </div>
  );
};

export default Homepage;
