import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ImageSlider = () => {
  const [index, setIndex] = useState(0);

  // ✅ Replace with Unsplash random image URLs (you can customize topics)
  const images = [
    "\image1",
    "https://source.unsplash.com/random/1600x900?college",
    "https://source.unsplash.com/random/1600x900?students",
    "https://source.unsplash.com/random/1600x900?education",
    "https://source.unsplash.com/random/1600x900?library",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={index} // Use index to force remount for animation
          src={images[index] + `&sig=${index}`} // Add `sig` to force different images
          alt={`slide-${index}`}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8 }}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Dot indicators */}
      <div className="absolute bottom-6 w-full flex justify-center gap-2 z-10">
        {images.map((_, i) => (
          <div
            key={i}
            className={`h-3 w-3 rounded-full transition-colors ${
              i === index ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
