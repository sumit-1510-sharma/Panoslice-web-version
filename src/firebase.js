// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIBU01HnC4XzOzWwJavRJDSoQKs-JLUeA",
  authDomain: "panoslice-web-version.firebaseapp.com",
  projectId: "panoslice-web-version",
  storageBucket: "panoslice-web-version.appspot.com",
  messagingSenderId: "1094008845372",
  appId: "1:1094008845372:web:55232f6a4ed0e2ee81ff39",
  measurementId: "G-ZT5CPHR67M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
