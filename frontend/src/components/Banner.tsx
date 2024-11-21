import React from "react";
import Clock from "./Clock";

interface BannerProps {
  subtitle: string;
  redirectPath: string;
}

const Banner: React.FC<BannerProps> = ({ subtitle }) => {
  return (
    <div
      className="relative flex items-center px-6 py-4 text-white bg-black"
      style={{ height: "16vh" }}
    >
      <div className="absolute text-sm left-6">
        <Clock />
      </div>
      <div className="absolute text-center transform -translate-x-1/2 cursor-pointer left-1/2">
        <div className="py-2 text-2xl font-bold text-white">
          Stock Management
        </div>
      </div>

      <div className="mt-1 text-sm text-white">{subtitle}</div>
    </div>
  );
};

export default Banner;
