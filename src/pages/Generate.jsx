import React, { useEffect, useState } from "react";
import BrowserUpdatedIcon from "@mui/icons-material/BrowserUpdated";
import ImageIcon from "@mui/icons-material/Image";
import downloadIcon from "../assets/downloadIcon.png";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import "./Generate.css";

const Generate = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [prompt, setPrompt] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("option1");
  const [selectedStyle, setSelectedStyle] = useState("illustration");
  const [loading, setLoading] = useState(false); // New state for loading
  const [generatedImages, setGeneratedImages] = useState([]);

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

  const generateImage = async () => {
    setLoading(true); // Set loading to true
    const url = "https://api.getimg.ai/v1/flux-schnell/text-to-image";
    const apiKey =
      "key-3kGXa8tdB06z9j7dJ9LypacAAM4598Tsa8rlZzKCNplyIaKPoMBy1GzYAJwRjUqg7xyjujFiBhrCaRftM16xTjmRKEggGB0O"; // Replace with your actual API key
    // const apiKey = "hello-world";
    const seed = Math.floor(Math.random() * 100) + 1; // Random seed between 1 and 100
    const steps = Math.floor(Math.random() * 4) + 2; // Random steps between 2 and 5

    const { width, height } = getAspectRatioDimensions(selectedFormat);

    // Append the predefined string to the prompt based on the selected style
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
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const generatedImageUrl = data.url;

      // Update the state with the generated image URL
      setImageUrl(generatedImageUrl);

      // Add the new image to the list of generated images and store in localStorage
      setGeneratedImages((prevImages) => {
        const updatedImages = [...prevImages, generatedImageUrl];
        localStorage.setItem("generatedImages", JSON.stringify(updatedImages));
        return updatedImages;
      });
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setLoading(false); // Set loading to false when done
    }
  };

  useEffect(() => {
    // Load images from localStorage when component mounts
    const storedImages = localStorage.getItem("generatedImages");
    if (storedImages) {
      setGeneratedImages(JSON.parse(storedImages));
    }
  }, []);

  return (
    <div className="mt-24 mx-10">
      <div className="flex items-center text-white mb-6 space-x-3">
        <p>Prompt</p>
        <InfoOutlinedIcon className="text-[#D398C3]" fontSize="" />
      </div>
      <div className="flex flex-col md:flex-row items-start">
        {/* Left side: Text area for input */}
        <div className="w-[100%] md:w-[40%]">
          <textarea
            className="w-full text-white h-60 p-4 bg-[#343434] rounded-md resize-y focus:outline-none"
            placeholder="Enter your prompt here..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          ></textarea>

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

        <div className="hidden md:flex h-[67vh] -mt-10 border-l mx-[5%] border border-[#B276AA] border-opacity-30"></div>

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

      <div className="mb-24">
        <h2 className="text-white text-lg mb-4">Generated Images</h2>
        <div className="flex flex-wrap gap-4">
          {generatedImages.map((image, index) => (
            <div key={index} className="w-1/2 sm:w-1/3 lg:w-1/4 p-2">
              <img
                src={image}
                alt={`Generated ${index}`}
                className="w-full h-auto rounded-md"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Generate;
