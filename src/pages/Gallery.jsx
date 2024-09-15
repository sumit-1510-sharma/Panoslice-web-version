import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { db } from "../firebase";
import { collection, where, query, getDocs } from "firebase/firestore";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import sportImage from "../assets/sportimage.jpg";
import creatorImage from "../assets/dipin_creatorimage.jpeg";
import ShareSharpIcon from "@mui/icons-material/ShareSharp";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import DownloadModal from "../components/DownloadModal";
import { ImagesContext } from "../components/ImagesContext";

const Gallery = () => {
  const [searchParams] = useSearchParams();
  const [imageData, setImageData] = useState(null);
  const [similarImages, setSimilarImages] = useState([]); // For images in the same category
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { setSearchQuery } = useContext(ImagesContext);
  const navigate = useNavigate();

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const setOpenModal = (image) => {
    setModalData(image);
    console.log(modalData);
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
    navigate(`/search/${value}`);
  };

  const handleDownload = async (url, filename, format = "png") => {
    try {
      // Fetch the image as a blob
      const response = await fetch(url);
      const blob = await response.blob();

      // Create a temporary image element to load the blob
      const image = new Image();
      const blobURL = URL.createObjectURL(blob);
      image.src = blobURL;

      image.onload = () => {
        // Create a canvas to convert the image format
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Set canvas size to the image size
        canvas.width = image.width;
        canvas.height = image.height;

        // Draw the image onto the canvas
        ctx.drawImage(image, 0, 0);

        // Convert the canvas to the desired format (JPG or PNG)
        const convertedImage = canvas.toDataURL(`image/${format}`);

        // Create an anchor element and trigger a download
        const link = document.createElement("a");
        link.href = convertedImage;
        link.download = `${filename}.${format}`;
        document.body.appendChild(link);
        link.click();

        // Clean up
        link.remove();
        URL.revokeObjectURL(blobURL);
      };
    } catch (error) {
      console.error("Error downloading the image:", error);
    }
  };

  const handleShare = (imageId) => {
    const url = `${window.location.origin}/gallery?imageId=${imageId}`;
    navigator.clipboard.writeText(url).then(() => {
      setSnackbarOpen(true); // Show the snackbar
    });
  };

  useEffect(() => {
    const fetchImage = async () => {
      const imageIdParam = searchParams.get("imageId");
      if (!imageIdParam) {
        setError("No image ID provided");
        setLoading(false);
        return;
      }

      const imageId = imageIdParam; // Firestore ID is a string
      try {
        const imagesRef = collection(db, "AI and ML"); // Adjust collection name as necessary
        const q = query(imagesRef, where("imageId", "==", imageId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          const imageData = doc.data();
          setImageData(imageData);

          // Fetch similar images by category
          fetchSimilarImages(imageData.category);
        } else {
          setError("No such image found");
        }
      } catch (err) {
        setError("Error fetching image");
      } finally {
        setLoading(false);
      }
    };

    const fetchSimilarImages = async (category) => {
      try {
        const imagesRef = collection(db, "AI and ML"); // Adjust collection name as necessary
        const q = query(imagesRef, where("category", "==", category)); // Fetching images in the same category
        const querySnapshot = await getDocs(q);

        const similarImages = querySnapshot.docs.map((doc) => doc.data());
        setSimilarImages(similarImages);
      } catch (err) {
        console.error("Error fetching similar images", err);
      }
    };

    fetchImage();
  }, [searchParams]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center mt-20 sm:mt-32 text-white w-full">
      <div className="w-[90%] flex flex-col sm:flex-row items-center sm:items-start space-y-24 sm:space-y-0 justify-between">
        <div className="relative bg-[#2B2929] w-full sm:w-[50%] h-[270px]">
          <img
            className="w-full h-full object-contain"
            src={imageData ? imageData.downloadURL : sportImage} // Use imageData if available
            alt=""
          />
          <div className="cursor-pointer flex items-center absolute top-3 right-3 text-xs sm:text-sm bg-[#1D1D1D] rounded-md border border-white border-opacity-20 text-white px-4 py-1 space-x-2">
            <button
              onClick={() =>
                handleDownload(
                  imageData.downloadURL,
                  `${imageData.imageId}.webp`
                )
              }
            >
              Download
            </button>
            <SaveAltIcon />
          </div>
          <div className="absolute -bottom-14 sm:-bottom-10 flex items-center space-x-4">
            <img
              className="rounded-full w-6 h-6 sm:w-6 sm:h-6"
              src={creatorImage}
              alt=""
            />
            <div>Dipin Chopra</div>
          </div>
          <div className="text-xs opacity-60 absolute -bottom-6 right-0 flex items-center space-x-4">
            <p>
              {imageData ? `${imageData.downloads} Downloads` : "0 Downloads"}
            </p>
            <p>{imageData ? `${imageData.views} Views` : "0 Views"}</p>
          </div>
        </div>

        <div className="w-full sm:w-[40%]">
          <h2 className="text-lg mb-2">Tags</h2>
          <div className="flex items-center flex-wrap gap-x-2 gap-y-2">
            {(imageData?.tags || []).map((tag, index) => (
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

      <div className="w-[90%] flex items-center justify-between text-lg mt-12 sm:mt-24 sticky top-[44px] sm:top-[60px] py-4 border-b border-[#B276AA] border-opacity-25 bg-[#161616] z-10">
        <p>More Like This</p>
      </div>

      <div className="w-[90%] columns-1 sm:columns-2 md:columns-3 gap-5 mt-8 mb-24">
        {similarImages.length > 0 ? (
          similarImages.map((image, index) => (
            <div
              key={index}
              className="cursor-pointer relative group hover:opacity-85 transition-opacity duration-300"
            >
              <img
                src={image.downloadURL || sportImage}
                alt={`Image ${index + 1}`}
                className="mb-5 border border-[#B276AA] border-opacity-25 rounded-sm"
                onClick={() => setOpenModal(image)}
                loading="lazy"
              />
              <div
                className="absolute bottom-2 left-2 z-20 bg-black bg-opacity-80 py-0.5 px-1 rounded-md opacity-0 group-hover:opacity-85 transition-opacity duration-200"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent image click from triggering
                  handleDownload(image.downloadURL, `${image.imageId}.webp`);
                }}
              >
                <SaveAltIcon className="cursor-pointer text-white" />
              </div>
              {/* Share button, only visible on hover */}
              <div
                className="absolute bottom-2 right-2 z-20 bg-black bg-opacity-80 py-0.5 px-1 rounded-md opacity-0 group-hover:opacity-85 transition-opacity duration-200"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent image click from triggering
                  handleShare(image.imageId);
                }}
              >
                <ShareSharpIcon className="cursor-pointer text-white" />
              </div>
            </div>
          ))
        ) : (
          <p>No similar images found.</p>
        )}
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <MuiAlert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Image link copied to clipboard!
        </MuiAlert>
      </Snackbar>

      {modalData && (
        <DownloadModal
          imageUrl={modalData.downloadURL}
          imageId={modalData.imageId}
          onClose={() => setOpenModal(null)}
        />
      )}
    </div>
  );
};

export default Gallery;
