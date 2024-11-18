import React, { useState } from "react";
import { CircleArrowRight, CircleArrowLeft } from 'lucide-react';

// Function to import images
const importAll = (r) => {
  let images = [];
  r.keys().forEach((item) => {
    images.push(r(item));
  });
  return images;
};

// Import all images from the specified folder
const images = importAll(
  require.context("../assets/gallery", false, /\.(png|jpe?g|svg)$/)
);

const ImageGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <section className="py-16 bg-gray-200 rounded-lg">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10 libre-baskerville-bold">Image Gallery</h2>
        <div className="relative">
          <img
            src={images[currentIndex]}
            alt={`Gallery ${currentIndex + 1}`}
            className="mx-auto w-[70vh] max-h-[calc(100vh/2)] object-cover rounded-lg shadow-lg"
          />
          <button
            onClick={prevImage}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white h-full w-15 flex items-center justify-center shadow-md hover:bg-black/60 "
          >
            <CircleArrowLeft/>
          </button>
          <button
            onClick={nextImage}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white h-full w-15 flex items-center justify-center shadow-md hover:bg-black/60 "
          >
            <CircleArrowRight/>
          </button>
          
        </div>
      </div>
    </section>
  );
};

export default ImageGallery;
