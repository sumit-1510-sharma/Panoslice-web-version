import React from "react";
import sportImage from "../assets/sportimage.jpg";
import creatorImage from "../assets/creatorimage.jpg";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";

const Creator = () => {
  return (
    <div className="flex flex-col items-center mx-12 sm:mx-16 mt-32 text-white">
      <div className="w-full flex justify-between">
        <div className="w-[35%] flex flex-col items-start space-y-4">
          <img
            className="object-cover rounded-full w-14 h-14"
            src={creatorImage}
            alt=""
          />
          <h2 className="text-4xl font-semibold">Dipin Chopra</h2>
          <p className="max-w-[85%] opacity-80 text-sm">
            Caffeine powered marketing generalist and creative enabler
          </p>
          <div className="flex items-center opacity-90 space-x-2.5">
            <InstagramIcon fontSize="small"/>
            <LinkedInIcon fontSize="small" />
            <XIcon fontSize="small" />
          </div>
        </div>

        <div className="w-[55%] h-[320px] bg-white rounded-md"></div>
      </div>

      <div className="flex items-center justify-between w-full mt-2 sticky top-[44px] sm:top-[60px] py-4 border-b border-[#B276AA] border-opacity-25 bg-[#161616] z-10">
        <p>Browse Images</p>
      </div>

      <div className="columns-1 sm:columns-2 md:columns-3 gap-5 mt-8 mb-24">
        {[1, 1, 1, 1, 1, 1, 1, 1, 1].map((item, index) => (
          <div
            key={index}
            className="cursor-pointer relative group hover:opacity-85 transition-opacity duration-300"
          >
            <img
              src={sportImage}
              alt=""
              className="mb-5 border border-[#B276AA] border-opacity-25 rounded-sm"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Creator;
