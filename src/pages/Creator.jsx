import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase"; // Adjust the import path as needed
import sportImage from "../assets/sportimage.jpg";
import creatorImage from "../assets/creatorimage.jpg";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";

const Creator = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const q = query(
          collection(db, "AI and ML"), // Collection name in Firestore
          where("creator", "==", "Dipin Chopra") // Replace with dynamic creator if needed
        );
        const querySnapshot = await getDocs(q);
        const fetchedImages = querySnapshot.docs.map(
          (doc) => doc.data().downloadURL
        ); // Assumes each document has a `url` field
        setImages(fetchedImages);
      } catch (error) {
        console.error("Error fetching images: ", error);
      }
    };

    fetchImages();
  }, []);

  const handleInstagramIconClick = () => {
    window.location.href = "https://instagram.com/redeyereduction_";
  };
  const handleLinkedinIconClick = () => {
    window.location.href = "https://www.linkedin.com/in/dipinkumarchopra/";
  };
  const handleXIconClick = () => {
    window.location.href = "https://twitter.com/redeyereduction";
  };

  return (
    <div className="flex flex-col items-center mx-12 sm:mx-16 mt-28 text-white">
      <div className="w-full flex">
        <div
          // onClick={() => navigate("/upload")}
          className="w-full flex flex-col items-center space-y-4 mb-12"
        >
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
            <InstagramIcon
              onClick={handleInstagramIconClick}
              fontSize="small"
            />
            <LinkedInIcon
              onClick={() => (onClick = { handleLinkedinIconClick })}
              fontSize="small"
            />
            <XIcon onClick={handleXIconClick} fontSize="small" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between w-full mt-2 sticky top-[44px] sm:top-[60px] py-4 border-b border-[#B276AA] border-opacity-25 bg-[#161616] z-10">
        <p>Browse Images</p>
      </div>

      <div className="columns-1 sm:columns-2 md:columns-3 gap-5 mt-8 mb-24">
        {images.map((imageUrl, index) => (
          <div
            key={index}
            className="cursor-pointer relative group hover:opacity-85 transition-opacity duration-300"
          >
            <img
              src={imageUrl}
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
