import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ImagesContext } from "../components/ImagesContext";

const SearchResultsPage = () => {
  const { images } = useContext(ImagesContext);
  const { query } = useParams(); // Get the query from the URL
  const [displayedImages, setDisplayedImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // Loading state to control shimmer effect
  const imagesPerPage = 18;

  useEffect(() => {
    if (images.length > 0) {
      const startIndex = (currentPage - 1) * imagesPerPage;
      const endIndex = startIndex + imagesPerPage;
      setDisplayedImages(images.slice(0, endIndex));
      setLoading(false); // Images are loaded, stop showing shimmer
    }
  }, [images, currentPage]);

  const loadMoreImages = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="my-24 text-white">
      <h1>Search Results for "{query}"</h1>

      {/* Show shimmer effect when loading */}
      {loading ? (
        <div className="">
          <img src={guitarImage} alt="" />
        </div>
      ) : (
        <div className="">
          {displayedImages.map((image, index) => (
            <div key={index} className="image-item">
              <img src={image.downloadURL} alt={image.description} />
            </div>
          ))}
        </div>
      )}

      {/* Load More Button */}
      {displayedImages.length < images.length && !loading && (
        <button onClick={loadMoreImages}>Load More</button>
      )}
    </div>
  );
};

export default SearchResultsPage;
