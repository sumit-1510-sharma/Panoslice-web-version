import React, { useState } from "react";
import imageCompression from "browser-image-compression";
import { storage, db } from "../firebase"; // Import Firebase storage and Firestore
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image || !category) return;

    try {
      // Convert and compress the image to WebP format
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        fileType: "image/webp", // Specify WebP format
      };
      const compressedFile = await imageCompression(image, options);

      // Set the storage path based on the category
      const storageRef = ref(storage, `${category}/${compressedFile.name}`);
      await uploadBytes(storageRef, compressedFile);
      const downloadURL = await getDownloadURL(storageRef);

      // Save metadata to the appropriate Firestore collection based on category
      await addDoc(collection(db, category), {
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
      alert("Failed to upload image.");
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
        defaultChecked="AI and ML"
        onChange={(e) => setCategory(e.target.value)}
      />
      <button onClick={handleUpload}>Upload Image</button>
    </div>
  );
};

export default UploadImage;
