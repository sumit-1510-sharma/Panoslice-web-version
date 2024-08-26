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

      for (const collectionName of collectionsToSearch) {
        let q = query(collection(db, collectionName));

        if (searchQuery) {
          q = query(
            collection(db, collectionName),
            where("tags", "array-contains", searchQuery)
          );
        }

        const querySnapshot = await getDocs(q);
        const fetchedImages = querySnapshot.docs.map((doc) => doc.data());
        allResults = [...allResults, ...fetchedImages];
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
