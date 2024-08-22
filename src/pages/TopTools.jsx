import React from "react";
import spaceImage from "../assets/spaceimage.jpg";
import ToolCard from "../components/ToolCard";
import { useNavigate } from "react-router-dom";

const TopTools = () => {
  const navigate = useNavigate();

  const handleRedirectPanoslice = () => {
    window.location.href = "https://panoslicepro.page.link/XH3T";
  };

  const handleRedirectLono = () => {
    window.location.href =
      "https://apps.apple.com/in/app/lono-ai-reel-video-editor/id1632742723";
  };

  return (
    <div className="flex flex-col items-center text-white mx-12 sm:mx-16">
      <div className="flex flex-col items-center space-y-5 mt-32 mb-8">
        <div className="-space-y-2">
          <p className="text-[40px] sm:text-[44px] leading-tight sm:leading-tight max-w-lg text-center">
            Blank Canvas
          </p>
          <p className="text-[40px] font-bold sm:text-[44px] leading-tight sm:leading-tight max-w-lg text-center">
            AI Apps Collection
          </p>
        </div>
        <p className="text-center">
          Our collection of AI apps that help creators make 1M+ designs and
          videos.
        </p>
        <div className="flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-8">
          <button
            onClick={() => navigate("/generate")}
            className="bg-white rounded-full text-black px-12 sm:px-16 py-1 sm:py-1.5"
          >
            Generate
          </button>
          <button
            className="bg-[#161616] border rounded-full px-9 sm:px-[50px] py-1 sm:py-1.5"
          >
            Browse Apps
          </button>
        </div>
      </div>

      {/* Tools gallery */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-8 mb-24">
        <div onClick={handleRedirectPanoslice}>
          <ToolCard title={"AI Carausel Maker"} />
        </div>
        <div onClick={handleRedirectPanoslice}>
          <ToolCard title={"Blog To Carousel"} />
        </div>
        <div onClick={handleRedirectPanoslice}>
          <ToolCard title={"AI Art Generator"} />
        </div>
        <div onClick={handleRedirectPanoslice}>
          <ToolCard title={"BG Remover"} />
        </div>
        <div onClick={handleRedirectLono}>
          <ToolCard title={"AI Reel Maker"} />
        </div>
        <div onClick={handleRedirectLono}>
          <ToolCard title={"AI Color Grading"} />
        </div>
        <div onClick={handleRedirectPanoslice}>
          <ToolCard title={"AI Hashtag Generator"} />
        </div>
        <div onClick={handleRedirectPanoslice}>
          <ToolCard title={"AI Caption Writer"} />
        </div>
        <div onClick={handleRedirectLono}>
          <ToolCard title={"Bulk Editor"} />
        </div>
      </div>
    </div>
  );
};

export default TopTools;
