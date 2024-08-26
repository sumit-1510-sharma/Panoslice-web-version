// // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCIBU01HnC4XzOzWwJavRJDSoQKs-JLUeA",
//   authDomain: "panoslice-web-version.firebaseapp.com",
//   projectId: "panoslice-web-version",
//   storageBucket: "panoslice-web-version.appspot.com",
//   messagingSenderId: "1094008845372",
//   appId: "1:1094008845372:web:55232f6a4ed0e2ee81ff39",
//   measurementId: "G-ZT5CPHR67M"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// export const db = getFirestore(app);
// export const storage = getStorage(app);

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCM7iZc8pkjDBYMFlbNaQm6J34CgPkLLVw",
  authDomain: "cr8r-dev.firebaseapp.com",
  projectId: "cr8r-dev",
  storageBucket: "cr8r-dev.appspot.com",
  messagingSenderId: "739607422406",
  appId: "1:739607422406:web:20a443b6c4bd2420f3fec7",
  measurementId: "G-H8KNNM4E02",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
