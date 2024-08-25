import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Import Firestore
import { collection, query, where, getDocs } from "firebase/firestore";

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      let q = query(
        collection(db, "Artificial Intelligence (AI) & Machine Learning")
      );

      if (searchQuery) {
        q = query(
          collection(db, "Artificial Intelligence (AI) & Machine Learning"),
          where("tags", "array-contains", searchQuery)
        );
      }

      const querySnapshot = await getDocs(q);
      const fetchedImages = querySnapshot.docs.map((doc) => doc.data());
      setImages(fetchedImages);
    };

    fetchImages();
  }, [searchQuery]);

  return (
    <div className="bg-white m-24">
      <input
        type="text"
        placeholder="Search by tag"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
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
