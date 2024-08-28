import React, { createContext, useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export const ImagesContext = createContext();

export const ImagesProvider = ({ children }) => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      const collectionsToSearch = [
        "AI and ML",
        "Climate Tech",
        "Commerce & Retail",
        "FinTech",
        "Gaming",
        "Healthcare",
        "HR & Team",
        "Product Shoot",
        "Remote Work",
        // Add more collections as needed
      ];

      let allResults = [];

      // Split the searchQuery into an array of tags by spaces
      const tagsArray = searchQuery
        .split(" ")
        .filter((tag) => tag.trim() !== "");

      for (const collectionName of collectionsToSearch) {
        if (tagsArray.length > 0) {
          // Start by querying for documents that contain the first tag
          let q = query(
            collection(db, collectionName),
            where("tags", "array-contains", tagsArray[0])
          );

          const querySnapshot = await getDocs(q);
          const fetchedImages = querySnapshot.docs.map((doc) => doc.data());

          // Filter images to keep only those that contain all tags
          const filteredImages = fetchedImages.filter((image) =>
            tagsArray.every((tag) => image.tags.includes(tag))
          );

          allResults = [...allResults, ...filteredImages];
        } else {
          // If no tags provided, just fetch all documents
          const querySnapshot = await getDocs(collection(db, collectionName));
          const fetchedImages = querySnapshot.docs.map((doc) => doc.data());
          allResults = [...allResults, ...fetchedImages];
        }
      }

      setImages(allResults);
    };

    fetchImages();
  }, [searchQuery]);

  return (
    <ImagesContext.Provider value={{ images, setSearchQuery }}>
      {children}
    </ImagesContext.Provider>
  );
};
