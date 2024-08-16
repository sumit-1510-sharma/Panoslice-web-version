import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Generate from "./pages/Generate";
import TopTools from "./pages/TopTools";

function App() {
  return (
    <div>
      <Router>
        <div className="flex flex-col min-h-screen bg-[#161616]">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/generate" element={<Generate />} />
              <Route path="/toptools" element={<TopTools />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App;
