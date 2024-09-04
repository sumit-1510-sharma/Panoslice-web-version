import React, { createContext, useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export const ImagesContext = createContext();

export const ImagesProvider = ({ children }) => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Initialize searchQuery without localStorage

  useEffect(() => {
    const fetchImages = async () => {
      let allResults = [];

      const tagsArray = searchQuery
        .split(" ")
        .filter((tag) => tag.trim() !== "");

      if (tagsArray.length > 0) {
        const q = query(
          collection(db, "AI and ML"),
          where("tags", "array-contains-any", tagsArray)
        );
        const querySnapshot = await getDocs(q);
        const fetchedImages = querySnapshot.docs.map((doc) => doc.data());
        allResults = [...allResults, ...fetchedImages];
      } else {
        const querySnapshot = await getDocs(collection(db, "AI and ML"));
        const fetchedImages = querySnapshot.docs.map((doc) => doc.data());
        allResults = [...allResults, ...fetchedImages];
      }

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
