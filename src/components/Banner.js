import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Carousel CSS

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
    require.context("../assets/bannerImages", false, /\.(png|jpe?g|svg)$/)
  );

const Banner = () => {
  return (
    <section className="">
      <Carousel autoPlay infiniteLoop interval={2000} showThumbs={false} showStatus={false} stopOnHover={false} >
        {images.map((image, index) =>  (
          <div key={index}>
            <img
              src={image} // For some setups, this may need to be just `image` based on your configuration.
              alt={`Event ${index + 1}`}
              className="w-screen h-[70vh] object-cover"
            />
          </div>
        ))}
      </Carousel>

      <div className=" container mx-auto text-center mt-10">
        <h1 className="libre-baskerville-bold  text-5xl font-bold mb-4">Welcome to ASMITA 2024</h1>
        <p className=" libre-baskerville-bold text-lg mb-8">IIITA Sports Fest</p>
      </div>
    </section>
  );
};

export default Banner;
