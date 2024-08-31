import React, { createContext, useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export const ImagesContext = createContext();

export const ImagesProvider = ({ children }) => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      let allResults = [];

      // Split the searchQuery into an array of tags by spaces
      const tagsArray = searchQuery
        .split(" ")
        .filter((tag) => tag.trim() !== "");

      // Check if there are tags to search
      if (tagsArray.length > 0) {
        // Query for documents in "AI and ML" that contain any of the tags
        const q = query(
          collection(db, "AI and ML"),
          where("tags", "array-contains-any", tagsArray)
        );

        const querySnapshot = await getDocs(q);
        const fetchedImages = querySnapshot.docs.map((doc) => doc.data());
        allResults = [...allResults, ...fetchedImages];
      } else {
        // If no tags provided, just fetch all documents in "AI and ML"
        const querySnapshot = await getDocs(collection(db, "AI and ML"));
        const fetchedImages = querySnapshot.docs.map((doc) => doc.data());
        allResults = [...allResults, ...fetchedImages];
      }

      // Optionally, remove duplicates if needed based on a unique identifier
      // const uniqueResults = Array.from(
      //   new Map(allResults.map((image) => [image.id, image])).values()
      // );

      // setImages(uniqueResults);
      setImages(allResults);
    };

    fetchImages();
  }, [searchQuery]);

  return (
    <ImagesContext.Provider value={{ images, searchQuery, setSearchQuery }}>
      {children}
    </ImagesContext.Provider>
  );
};
