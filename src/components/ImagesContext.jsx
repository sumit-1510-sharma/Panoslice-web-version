import React, { createContext, useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export const ImagesContext = createContext();

export const ImagesProvider = ({ children }) => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "AI and ML"));
        const fetchedImages = querySnapshot.docs.map((doc) => doc.data());
        console.log(fetchedImages);
        setImages(fetchedImages);
      } catch (error) {
        console.error("Error fetching images: ", error);
      }
    };

    fetchImages();
  }, []); // No dependencies as searchQuery is no longer needed

  return (
    <ImagesContext.Provider value={{ images, searchQuery, setSearchQuery }}>
      {children}
    </ImagesContext.Provider>
  );
};
