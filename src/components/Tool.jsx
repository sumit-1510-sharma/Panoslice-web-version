import React from "react";
import bulkEditor from "../assets/bulkeditor.png";

const Tool = ({ image, title }) => {
  return (
    <div className="flex items-center space-x-2">
      <img src={image} alt="" className="object-cover rounded-full w-6 border border-white border-opacity-75" />
      <p>{title}</p>
    </div>
  );
};

export default Tool;
