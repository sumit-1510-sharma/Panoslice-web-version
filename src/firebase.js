// // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

//                  (Dev project)

const firebaseConfig = {
  apiKey: "AIzaSyCM7iZc8pkjDBYMFlbNaQm6J34CgPkLLVw",
  authDomain: "cr8r-dev.firebaseapp.com",
  projectId: "cr8r-dev",
  storageBucket: "cr8r-dev.appspot.com",
  messagingSenderId: "739607422406",
  appId: "1:739607422406:web:20a443b6c4bd2420f3fec7",
  measurementId: "G-H8KNNM4E02",
};

//                  (Production project)

// const firebaseConfig = {
//   apiKey: "AIzaSyD4OSVicD_15svApBXj9Zh3kRcz-FcxPW0",
//   authDomain: "cr8r-eae75.firebaseapp.com",
//   projectId: "cr8r-eae75",
//   storageBucket: "cr8r-eae75.appspot.com",
//   messagingSenderId: "889453834144",
//   appId: "1:889453834144:web:0a7d2e1a45c0554a1c7ec5",
//   measurementId: "G-WNZSFRVFKV",
// };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
