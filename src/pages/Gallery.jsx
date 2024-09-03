import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { db } from "../firebase";
import { collection, where, query, getDocs } from "firebase/firestore";
import SaveAltIcon from "@mui/icons-material/SaveAlt";

const Gallery = () => {
  const [searchParams] = useSearchParams();
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      const imageIdParam = searchParams.get("imageId");
      if (!imageIdParam) {
        setError("No image ID provided");
        setLoading(false);
        return;
      }

      const imageId = parseInt(imageIdParam, 10); // Parse imageId as a number
      if (isNaN(imageId)) {
        setError("Invalid image ID");
        setLoading(false);
        return;
      }

      try {
        const imagesRef = collection(db, "AI and ML"); // Adjust collection name as necessary
        const q = query(imagesRef, where("imageId", "==", imageId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          setImageData(doc.data());
        } else {
          setError("No such image found");
        }
      } catch (err) {
        setError("Error fetching image");
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [searchParams]);

  return (
    <div className="flex flex-col items-center mt-32 text-white w-full">
      <div className="w-[90%] flex items-start justify-between">
        <div className="relative bg-[#2B2929] w-[50%] h-[270px]">
          <img src={imageData} alt="" />
          <div className="cursor-pointer flex items-center absolute top-3 right-3 text-xs sm:text-sm bg-[#1D1D1D] rounded-md border border-white border-opacity-20 text-white px-4 py-1 space-x-2">
            <button>Download</button>
            <SaveAltIcon />
          </div>
          <div className="absolute -bottom-10 flex items-center space-x-4">
            <img className="rounded-full w-8 h-8" src="" alt="" />
            <div>Dipin Chopra</div>
          </div>
          <div className="text-xs opacity-60 absolute -bottom-6 right-0 flex items-center space-x-4">
            <p>270 Downloads</p>
            <p>70 Views</p>
          </div>
        </div>

        <div className="w-[40%]">
          <h2 className="text-lg mb-2">Tags</h2>
          <div className="flex items-center flex-wrap gap-x-2 gap-y-2">
            {[
              "nature",
              "nature",
              "nature",
              "nature",
              "nature",
              "nature",
              "nature",
            ].map((tag, index) => (
              <button
                onClick={() => handleSearch(tag)}
                key={index}
                className="bg-[#161616] rounded-full text-xs px-4 py-1 border border-white border-opacity-30"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="w-[90%] flex items-center justify-between text-xl mt-24 sticky top-[44px] sm:top-[60px] py-4 border-b border-[#B276AA] border-opacity-25 bg-[#161616] z-10">
        <p>More Like This</p>
      </div>

      <div className="columns-1 sm:columns-2 md:columns-3 gap-5 mt-8 mb-24">
        {[1,1,1,1,1,1].map((imageUrl, index) => (
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

export default Gallery;
