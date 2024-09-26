import React, { useEffect, useRef, useState } from "react";
import BrowserUpdatedIcon from "@mui/icons-material/BrowserUpdated";
import ImageIcon from "@mui/icons-material/Image";
import downloadIcon from "../assets/downloadIcon.png";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import "./Generate.css";
import { Alert, Snackbar } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { green } from "@mui/material/colors";

const Generate = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [prompt, setPrompt] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("option1");
  const [selectedStyle, setSelectedStyle] = useState("illustration");
  const [loading, setLoading] = useState(false);
  const [generatedImages, setGeneratedImages] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [credits, setCredits] = useState(5);

  const stylePredefinedStrings = {
    illustration:
      "in the detailed and artistic style of an illustration, capturing creative visual elements. This style must focus on expressive lines, bold colors, and imaginative interpretations, perfect for a visually engaging and artistic look.",
    animated:
      "in the lively, colorful style of animation, with exaggerated features and dynamic visuals. This approach must bring a playful and energetic feel to the image, making it ideal for content that aims to entertain or engage with a vibrant flair.",
    realistic:
      "in a true-to-life, detailed realistic style, mimicking photography with precise, natural visuals. This style must emphasize authenticity and clarity, providing a convincing and accurate representation of the subject matter in the image.",
    nature:
      "In the serene, lush style of nature, highlighting natural landscapes and organic elements. The focus is to capture the beauty of the outdoors, evoking a peaceful and harmonious connection with the environment.",
    historical:
      "in a nostalgic, vintage historical style, evoking the aesthetics of a bygone era. Use muted tones, sepia effects, and period-specific details to transport viewers back in time, adding a touch of history and nostalgia.",
    abstract:
      "in an abstract style, focusing on shapes, colors, and forms rather than literal representations. This style must encourage creativity and interpretation, make it suitable for thought-provoking and visually intriguing content.",
    fantasy:
      "in a fantastical style, filled with magical, imaginative elements and otherworldly scenes. This approach should be perfect for creating whimsical, dreamlike images that must transport viewers into a world of imagination and wonder.",
    sci_fi:
      "in a futuristic sci-fi style, emphasizing advanced technology, space themes, and speculative fiction. This style must features sleek designs, high-tech elements, and imaginative concepts that envision the future or alternate realities.",
    cyberpunk:
      "in a gritty, neon-lit cyberpunk style, with dystopian themes and high-tech, low-life elements. This approach must capture a dark, futuristic world where technology and urban decay coexist, creating a rebellious and edgy visual atmosphere.",
    vintage:
      "in a classic, muted vintage style, evoking the charm and aesthetics of past decades. This style must use nostalgic color palettes and retro design elements to create a timeless and classic look, perfect for content with a touch of nostalgia.",
  };

  const getAspectRatioDimensions = (format) => {
    switch (format) {
      case "option1":
        return { width: 1280, height: 720 }; // 16:9
      case "option2":
        return { width: 1080, height: 1080 }; // 1:1
      case "option3":
        return { width: 720, height: 1280 }; // 9:16
      case "option4":
        return { width: 800, height: 1000 }; // 4:5
      default:
        return { width: 1080, height: 1080 }; // Default to 1:1
    }
  };

  const initializeCredits = () => {
    const today = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD
    const storedData = JSON.parse(localStorage.getItem("creditData")) || {};

    // If no stored data or if 24 hours have passed, reset credits to 5
    if (!storedData.date || storedData.date !== today) {
      const newCreditData = { date: today, credits: 5 };
      localStorage.setItem("creditData", JSON.stringify(newCreditData));
      setCredits(5); // Reset state to 5 credits
    } else {
      setCredits(storedData.credits); // Load remaining credits
    }
  };

  const reduceCredits = () => {
    const today = new Date().toISOString().split("T")[0];
    const storedData = JSON.parse(localStorage.getItem("creditData")) || {
      date: today,
      credits: 5,
    };

    if (storedData.credits > 0) {
      storedData.credits -= 1;
      localStorage.setItem("creditData", JSON.stringify(storedData));
      setCredits(storedData.credits); // Update state with new credit count
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(true);
  };

  const clearExpiredImages = () => {
    // Retrieve stored images from localStorage or initialize to an empty array
    const storedImages =
      JSON.parse(localStorage.getItem("generatedImages")) || [];

    // Get current time in milliseconds
    const currentTime = Date.now();

    // Filter out expired images (older than 1 hour)
    const filteredImages = storedImages.filter((image) => {
      return (
        image &&
        image.timestamp &&
        currentTime - image.timestamp < 1 * 60 * 60 * 1000 // 1 hour in milliseconds
      );
    });

    // Update localStorage with valid images only
    localStorage.setItem("generatedImages", JSON.stringify(filteredImages));

    // Update the state with only valid image URLs
    setGeneratedImages(filteredImages.map((image) => image.url));
  };

  // const checkGenerationLimit = () => {
  //   const limit = 5;
  //   const today = new Date().toISOString().split("T")[0];
  //   const storageKey = `imageLimit_${today}`;
  //   const storageValue = localStorage.getItem(storageKey);

  //   if (storageValue) {
  //     const data = JSON.parse(storageValue);
  //     if (data.count >= limit) {
  //       return false;
  //     } else {
  //       return true;
  //     }
  //   }
  //   localStorage.setItem(storageKey, JSON.stringify({ count: 1 }));
  //   return true;
  // };

  // const updateGenerationCount = () => {
  //   const today = new Date().toISOString().split("T")[0];
  //   const storageKey = `imageLimit_${today}`;
  //   const storageValue = localStorage.getItem(storageKey);
  //   let data = { count: 1 };

  //   if (storageValue) {
  //     data = JSON.parse(storageValue);
  //     data.count += 1;
  //   }

  //   localStorage.setItem(storageKey, JSON.stringify(data));
  // };

  // Function to generate a new image using the API
  const generateImage = async () => {
    if (credits <= 0) {
      setSnackbarMessage("Insufficient credits. Please try again tomorrow.");
      setSnackbarOpen(true);
      return;
    }

    setLoading(true);
    const url = "https://api.getimg.ai/v1/flux-schnell/text-to-image";
    const apiKey = import.meta.env.VITE_IMAGE_API_KEY;
    const seed = Math.floor(Math.random() * 100) + 1;
    const steps = Math.floor(Math.random() * 4) + 2;
    const { width, height } = getAspectRatioDimensions(selectedFormat);
    const appendedPrompt = `${prompt} ${stylePredefinedStrings[selectedStyle]}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          prompt: appendedPrompt,
          seed,
          steps,
          width,
          height,
          response_format: "url",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate image. Please try again.");
      }

      const data = await response.json();
      const generatedImageUrl = data.url;

      setImageUrl(generatedImageUrl);
      const newImage = { url: generatedImageUrl, timestamp: Date.now() };
      const storedImages =
        JSON.parse(localStorage.getItem("generatedImages")) || [];
      const updatedImages = [...storedImages, newImage];

      localStorage.setItem("generatedImages", JSON.stringify(updatedImages));
      setGeneratedImages(updatedImages.map((image) => image.url));

      reduceCredits(); // Reduce credits after successful image generation
    } catch (error) {
      setSnackbarMessage(error.message);
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  // In your component's useEffect or on initial render, you should clear expired images:
  useEffect(() => {
    clearExpiredImages(); // This will clean up expired images on component load
    initializeCredits(); // Initialize or reset credits based on the date
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false); // Close the dropdown if clicked outside
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup event listener when component unmounts or isDropdownOpen changes
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="mt-24 mx-4 sm:mx-8">
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <div className="flex items-center text-white mb-6 space-x-3">
        <p>Prompt</p>
        <div className="relative">
          <InfoOutlinedIcon
            onClick={toggleDropdown}
            className="cursor-pointer text-[#D398C3]"
            fontSize=""
          />
          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute text-sm w-[200px] sm:w-[400px] top-2 left-6 sm:left-8 bg-[#161616] opacity-85 border border-[#707070] text-white p-4 rounded-md shadow-md z-40"
            >
              <p>
                Create images by just providing the text or topic of what you
                want to create.
              </p>
              <div className="mt-4 text-xs space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="text-green-600">
                    <CheckCircleOutlineIcon fontSize="small" />
                  </div>
                  <p>
                    Just enter the topic. (Don’t need to enter “Create an image
                    of…”)
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-green-600">
                    <CheckCircleOutlineIcon fontSize="small" />
                  </div>
                  <p>
                    Just select the style. (No need for descriptions apart from
                    the topic)
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start">
        {/* Left side: Text area for input */}
        <div className="relative w-[100%] md:w-[40%]">
          <textarea
            className="w-full text-white h-32 sm:h-44 md:h-60 p-4 bg-[#343434] rounded-md resize-y focus:outline-none"
            placeholder="Enter your prompt here..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          ></textarea>
          <button className="absolute -top-12 right-0 text-sm text-[#73D484] px-5 py-1 border border-[#2F483A] bg-[#1F2823] rounded-md">
            Credits: {credits}
          </button>

          <div className="flex items-center justify-between">
            <select
              className="w-[50%] px-6 py-1 mt-4 mr-2 bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
            >
              <option value="option1">Landscape (16:9)</option>
              <option value="option2">Square (1:1)</option>
              <option value="option3">Portrait 1 (9:16)</option>
              <option value="option4">Portrait 2 (4:5)</option>
            </select>

            <select
              className="w-[50%] px-6 py-1 mt-4 ml-2 bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
            >
              <option value="illustration">Illustration</option>
              <option value="animated">Animated</option>
              <option value="realistic">Realistic</option>
              <option value="nature">Nature</option>
              <option value="historical">Historical</option>
              <option value="abstract">Abstract</option>
              <option value="fantasy">Fantasy</option>
              <option value="sci_fi">Sci-Fi</option>
              <option value="cyberpunk">Cyberpunk</option>
              <option value="vintage">Vintage</option>
            </select>
          </div>
          <button
            className={`w-full mt-5 md:mb-24 px-6 py-2.5 rounded-md ${
              loading ? "bg-gray-400" : "bg-white"
            }`}
            onClick={generateImage}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Image"}
          </button>
        </div>
        <hr className="md:hidden border border-[#B276AA] border-opacity-30 w-full my-10 sm:my-16" />

        <div className="hidden md:flex h-[470px] -mt-10 border-l mx-[5%] border border-[#B276AA] border-opacity-30"></div>

        {/* Right side: Blank canvas for generated image */}
        <div className="section-with-dots mb-24 relative w-[100%] md:w-[50%] flex items-center justify-center rounded-md">
          <div className="w-full h-[350px] flex items-center justify-center relative">
            {/* Display loading bar */}
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#00000066] z-10">
                <div className="relative w-full max-w-xs h-6 bg-gray-300 rounded-sm">
                  <div className="absolute top-0 left-0 h-full bg-[#B276AA] rounded-sm animate-load-bar"></div>
                </div>
              </div>
            )}
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Generated"
                className="object-contain w-full h-full rounded-md"
              />
            ) : (
              !loading && (
                <div className="flex flex-col items-center justify-center h-full">
                  <p className="text-center text-white">
                    Image will appear here...
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {generatedImages.length > 0 && (
        <div className="mb-32">
          <h2 className="text-white text-lg mb-4">Generated Images</h2>
          <div className="flex flex-wrap gap-4">
            {generatedImages.map((image, index) => (
              <div key={index} className="w-1/2 sm:w-1/4 md:w-1/6">
                <a href={image} download={`generated-image-${index}.png`}>
                  <img
                    src={image}
                    alt={`Generated ${index}`}
                    className="object-cover w-full h-full rounded-md"
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Generate;
