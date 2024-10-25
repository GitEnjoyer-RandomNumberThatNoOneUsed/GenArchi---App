import React, { useState, useEffect } from "react";
import Clock from "./Clock";

import { useNavigate } from "react-router-dom"; // Import useNavigate

interface BannerProps {
  applicationsName: string;
}

const Banner: React.FC<BannerProps> = ({ applicationsName }) => {
  const navigate = useNavigate(); // Use navigate for redirection


  const handleTitleClick = () => {
    navigate("/"); // Redirect to homepage
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 text-white bg-blue-500">
      <div className="flex-none">
        <Clock/>
      </div>
      <div className="flex-2 text-center align-self-center">
        <div
          className="mx-auto px-4 py-2 text-4xl font-bold text-white bg-blue-300 rounded-md cursor-pointer " // Add align-self here
          style={{ alignSelf: 'center' }} // Aligning this specific item
          onClick={handleTitleClick}
        >
          {applicationsName}
        </div>
      </div>
      <div className="flex-none space-y-1 text-right">
      </div>
    </div>
  );
};
  
export default Banner;
