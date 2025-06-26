
import React, { useEffect, useState } from "react";
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";
import img4 from "../assets/img4.png";

const images = [img1, img2, img3, img4];

const FloatingImages = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden z-0 flex items-center justify-center">
      <img
        src={images[currentImage]}
        alt="Floating Food"
        className="w-70 h-70 object-cover rounded-full shadow-xl opacity-90 animate-float"
      />
    </div>
  );
};

export default FloatingImages;
