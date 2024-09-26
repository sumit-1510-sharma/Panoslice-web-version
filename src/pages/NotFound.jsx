import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="text-center">
        <h1 className="text-6xl sm:text-8xl font-bold text-white mb-4">404</h1>
        <p className="mx-6 text-lg sm:text-2xl text-gray-400 mb-8">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <Link
          to="/"
          className="bg-gradient-to-r from-purple-600 to-purple-900 hover:from-purple-500 hover:to-purple-800 text-white font-semibold py-2 px-6 rounded-full transition duration-300"
        >
          Go Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
