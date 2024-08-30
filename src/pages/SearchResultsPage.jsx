import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ImagesContext } from "../components/ImagesContext";

const SearchResultsPage = () => {
  const { images } = useContext(ImagesContext);
  const { query } = useParams(); // Get the query from the URL
  const [displayedImages, setDisplayedImages] = useState([]);

  useEffect(() => {
    console.log(images);

    setDisplayedImages(images);
  }, [images]);

  return (
    <div>
      <h1>Search Results for "{query}"</h1>
      <div className="image-grid">
        {displayedImages.map((image, index) => (
          <div key={index} className="image-item">
            <img src={image.downloadURL} alt={image.description} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResultsPage;
