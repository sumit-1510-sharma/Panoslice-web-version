import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { db } from "../firebase";
import { collection, where, query, getDocs } from "firebase/firestore";
// Adjust the import path as necessary

const Gallery = () => {
  const [searchParams] = useSearchParams();
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      const imageId = searchParams.get("imageId");
      if (!imageId) {
        setError("No image ID provided");
        setLoading(false);
        return;
      }

      try {
        const imagesRef = collection(db, "AI and ML"); // Adjust collection name as necessary
        const q = query(imagesRef, where("imageId", "==", imageId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          setImageData(doc.data());
        } else {
          setError("No such image found");
        }
      } catch (err) {
        setError("Error fetching image");
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [searchParams]);

  if (loading)
    return <div className="mt-32 text-white text-5xl">Loading...</div>;
  if (error) return <div className="mt-32 text-white text-5xl">{error}</div>;

  return (
    <div className="mt-32 text-white text-5xl">
      {imageData ? (
        <div>
          <h1>Gallery</h1>
          <img src={imageData.downloadURL} alt={imageData.description} />{" "}
          {/* Adjust fields based on your Firestore document structure */}
        </div>
      ) : (
        <div>No image data found</div>
      )}
    </div>
  );
};

export default Gallery;
