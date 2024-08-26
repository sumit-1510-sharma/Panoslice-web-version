import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Generate from "./pages/Generate";
import TopTools from "./pages/TopTools";
import Creator from "./pages/Creator";
import UploadImage from "./pages/UploadImage";
import ImageGallery from "./pages/ImageGallery";
import { ImagesProvider } from "./components/ImagesContext"; // Import the provider

function App() {
  return (
    <ImagesProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-[#161616]">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/generate" element={<Generate />} />
              <Route path="/toptools" element={<TopTools />} />
              <Route path="/creator" element={<Creator />} />
              <Route path="/upload" element={<UploadImage />} />
              <Route path="/gallery" element={<ImageGallery />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ImagesProvider>
  );
}

export default App;
