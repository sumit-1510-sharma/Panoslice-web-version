// // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

//                  (Dev project)

// const firebaseConfig = {
//   apiKey: "AIzaSyCM7iZc8pkjDBYMFlbNaQm6J34CgPkLLVw",
//   authDomain: "cr8r-dev.firebaseapp.com",
//   projectId: "cr8r-dev",
//   storageBucket: "cr8r-dev.appspot.com",
//   messagingSenderId: "739607422406",
//   appId: "1:739607422406:web:20a443b6c4bd2420f3fec7",
//   measurementId: "G-H8KNNM4E02",
// };

//                  (Production project)

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
