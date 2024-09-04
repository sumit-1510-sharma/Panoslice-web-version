import React, { useEffect, useState, Suspense, useMemo } from "react";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import Masonry from "@mui/lab/Masonry";
import { motion } from "framer-motion";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import { db } from "../firebase";
import creatorImage from "../assets/creatorimage.jpg";

const Creator = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const q = query(
          collection(db, "AI and ML"),
          where("creator", "==", "Dipin Chopra"),
          limit(18)
        );
        const querySnapshot = await getDocs(q);
        const fetchedImages = querySnapshot.docs.map(
          (doc) => doc.data().downloadURL
        );
        setImages(fetchedImages);
        setLoading(false);
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

  const memoizedImages = useMemo(() => images, [images]);

  return (
    <div className="flex flex-col items-center mx-12 sm:mx-16 mt-28 text-white">
      <div className="w-full flex flex-col items-center space-y-4 mb-12">
        <img
          className="object-cover rounded-full w-14 h-14"
          src={creatorImage}
          alt=""
        />
        <h2 className="text-4xl font-semibold">Dipin Chopra</h2>
        <p className="max-w-[85%] opacity-80 text-sm">
          Caffeine powered marketing generalist and creative enabler
        </p>
        <div className="cursor-pointer flex items-center opacity-90 space-x-2.5">
          <InstagramIcon onClick={handleInstagramIconClick} fontSize="small" />
          <LinkedInIcon onClick={handleLinkedinIconClick} fontSize="small" />
          <XIcon onClick={handleXIconClick} fontSize="small" />
        </div>
      </div>

      <div className="flex items-center justify-between w-full mt-2 mb-8 sticky top-[44px] sm:top-[60px] py-4 border-b border-[#B276AA] border-opacity-25 bg-[#161616] z-10">
        <p>Browse Images</p>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
          {memoizedImages.map((imageUrl, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="masonry-item cursor-pointer relative group hover:opacity-85 transition-opacity duration-300 mb-5 p-1"
            >
              <img
                src={imageUrl}
                alt=""
                loading="lazy"
                decoding="async"
                className="border border-[#B276AA] border-opacity-25 rounded-sm w-full h-auto object-cover"
              />
            </motion.div>
          ))}
        </Masonry>
      </Suspense>
    </div>
  );
};

export default Creator;
