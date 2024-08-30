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
        "Fintech",
        "Gaming",
        "Healthcare",
        "HR & Team",
        "Product Shoot",
        "Remote Work",
      ];

      let allResults = [];

      // Split the searchQuery into an array of tags by spaces
      const tagsArray = searchQuery
        .split(" ")
        .filter((tag) => tag.trim() !== "");

      for (const collectionName of collectionsToSearch) {
        if (tagsArray.length > 0) {
          // Query for documents that contain any of the tags
          let q = query(
            collection(db, collectionName),
            where("tags", "array-contains-any", tagsArray)
          );

          const querySnapshot = await getDocs(q);
          const fetchedImages = querySnapshot.docs.map((doc) => doc.data());

          // No need to filter further, as `array-contains-any` already ensures any tag matches
          allResults = [...allResults, ...fetchedImages];
        } else {
          // If no tags provided, just fetch all documents
          const querySnapshot = await getDocs(collection(db, collectionName));
          const fetchedImages = querySnapshot.docs.map((doc) => doc.data());
          allResults = [...allResults, ...fetchedImages];
        }
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
