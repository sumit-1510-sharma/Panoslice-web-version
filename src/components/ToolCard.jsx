import React from "react";
import appsImage from "../assets/guitarimage.jpg";

const ToolCard = ({ title, image }) => {
  return (
    <div className="cursor-pointer h-full relative">
      <div className="hover:opacity-85 transition-opacity duration-300">
        <img
          src={appsImage}
          alt=""
          className="border border-[#B276AA] border-opacity-25 rounded-sm"
        />
      </div>
      <div className="absolute bottom-0 h-[18%] pb-0.5 bg-black border border-b-[#B276AA] border-x-[#B276AA] border-t-transparent border-opacity-25 w-full text-center bg-opacity-75 flex items-center justify-center">
        <h2 className="">{title}</h2>
      </div>
    </div>
  );
};

export default ToolCard;
