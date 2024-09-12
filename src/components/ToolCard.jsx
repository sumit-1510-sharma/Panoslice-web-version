import React from "react";

const ToolCard = ({ title, media, mediaType }) => {
  return (
    <div className="cursor-pointer h-full relative">
      <div className="hover:opacity-85 transition-opacity duration-300">
        {mediaType === "video" ? (
          <video
            src={media}
            className="border border-[#B276AA] border-opacity-25 rounded-sm object-cover mx-auto"
            loop
            autoPlay
            muted
            playsInline
          />
        ) : (
          <img
            src={media}
            alt={title}
            className="border border-[#B276AA] border-opacity-25 rounded-sm"
          />
        )}
      </div>
      <div className="absolute bottom-0 h-[42px] pb-0.5 bg-black border border-b-[#B276AA] border-x-[#B276AA] border-t-transparent border-opacity-25 w-full text-center bg-opacity-75 flex items-center justify-center">
        <h2 className="font-semibold text-sm">{title}</h2>
      </div>
      <div className="absolute h-[42px] pb-0.5 w-full text-center flex items-center justify-center">
        <div className="w-[98%] rounded-md py-1.5 bg-white">
          <h2 className="text-black font-semibold text-sm">Try App</h2>
        </div>
      </div>
    </div>
  );
};

export default ToolCard;
