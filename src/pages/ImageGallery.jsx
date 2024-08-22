import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Import Firestore
import { collection, query, where, getDocs } from "firebase/firestore";

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(""); // New state for filtering by category

  useEffect(() => {
    const fetchImages = async () => {
      if (!categoryFilter) {
        alert("Please select a category to fetch images");
        return;
      }

      let q = query(collection(db, categoryFilter)); // Fetch images from the selected category collection

      if (searchQuery) {
        q = query(
          collection(db, categoryFilter),
          where("tags", "array-contains", searchQuery)
        );
      }

      const querySnapshot = await getDocs(q);
      const fetchedImages = querySnapshot.docs.map((doc) => doc.data());
      setImages(fetchedImages);
    };

    fetchImages();
  }, [searchQuery, categoryFilter]);

  return (
    <div className="m-24">
      <input
        type="text"
        placeholder="Search by tag"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <input
        type="text"
        placeholder="Filter by category (e.g., AI, Nature, Sports)"
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
      />
      <div className="image-gallery">
        {images.map((image, index) => (
          <div key={index} className="image-item">
            <img src={image.downloadURL} alt={image.category} />
            <p>Category: {image.category}</p>
            <p>Tags: {image.tags.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
