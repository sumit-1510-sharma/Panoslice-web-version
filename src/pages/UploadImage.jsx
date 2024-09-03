import React, { useState } from "react";
import imageCompression from "browser-image-compression";
import { storage, db } from "../firebase"; // Import Firebase storage and Firestore
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, getDocs, query, orderBy, limit } from "firebase/firestore";

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [imageId, setImageId] = useState(1);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Fetch the last imageId from Firestore and increment it
  const fetchAndIncrementImageId = async (category) => {
    const q = query(collection(db, category), orderBy("imageId", "desc"), limit(1));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const lastImage = querySnapshot.docs[0].data();
      setImageId(lastImage.imageId + 1);
    }
  };

  const handleUpload = async () => {
    if (!image || !category) return;

    try {
      await fetchAndIncrementImageId(category); // Fetch and increment imageId

      // Convert and compress the image to WebP format with a maximum size of 250KB
      const options = {
        maxSizeMB: 0.25, // Set max size to 0.25MB, which is 250KB
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        fileType: "image/webp", // Specify WebP format
      };
      const compressedFile = await imageCompression(image, options);

      // Ensure the compressed file is under 250KB
      if (compressedFile.size > 250 * 1024) {
        throw new Error("Compressed file size exceeds 250KB. Please try uploading a smaller image.");
      }

      // Set the storage path based on the category
      const storageRef = ref(storage, `${category}/${compressedFile.name}`);
      await uploadBytes(storageRef, compressedFile);
      const downloadURL = await getDownloadURL(storageRef);

      // Save metadata to the appropriate Firestore collection based on category
      await addDoc(collection(db, category), {
        creator: "Dipin Chopra", // Set creator to "Dipin Chopra"
        imageId, // Save the auto-incremented imageId
        tags: tags.split(",").map((tag) => tag.trim()), // Split tags by comma and trim whitespace
        category,
        storagePath: storageRef.fullPath,
        downloadURL,
        uploadDate: new Date(),
      });

      setImage(null);
      setTags("");
      setCategory("");
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert(error.message || "Failed to upload image.");
    }
  };

  return (
    <div className="text-pink-500 mt-24 p-12 flex items-center space-x-6">
      <input type="file" onChange={handleImageChange} />
      <input
        type="text"
        placeholder="Enter tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter category (e.g., AI, Nature, Sports)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button onClick={handleUpload}>Upload Image</button>
    </div>
  );
};

export default UploadImage;
