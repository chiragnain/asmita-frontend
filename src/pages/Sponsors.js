import React from 'react';
import Footer from '../components/Footer';
import { NavLink, useNavigate } from "react-router-dom";


const Sponsors = () => {
  const navigate=useNavigate();

  const gotoContacts=()=>{
    navigate('/contacts');
  }

    // Function to import images
const importAll = (r) => {
    let images = [];
    r.keys().forEach((item) => {
      images.push(r(item));
    });
    return images;
  };
  
  // Import all images from the specified folder
  const currentSponsorImages = importAll(
    require.context("../assets/currentSponsors", false, /\.(png|jpe?g|svg)$/)
  );

  const pastSponsorImages = importAll(
    require.context("../assets/pastSponsors", false, /\.(png|jpe?g|svg)$/)
  );

  return (
    <div className="flex flex-col h-screen bg-gray-100 overflow-y-auto">
      {/* Header Section */}
      <header className="bg-blue-500 text-white py-10">
        <h1 className="text-4xl font-bold text-center text-white libre-baskerville-bold">Our Sponsors</h1>
        <p className="text-center mt-2 text-lg tinos-bold">
          We are proudly supported by industry-leading companies and organizations.
        </p>
      </header>
      
      {/* Current Sponsors Section */}
      <section className="flex-grow container mx-auto py-10 px-4">
        {/* <h2 className="text-2xl font-semibold text-center mb-6">Our Sponsor</h2> */}
        <div className="w-full h-auto p-6 rounded-lg shadow-lg bg-white transform hover:scale-105 transition-transform duration-200">
          {currentSponsorImages.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Current Sponsor ${index + 1}`}
              className=""
            />
          ))}
        </div>
      </section>

      {/* Past Sponsors Section */}
      <section className="container mx-auto py-10 px-4 bg-white p rounded-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Our Past Sponsors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {pastSponsorImages.map((src, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-lg shadow-lg p-4 flex flex-col items-center text-center"
            >
              <img
                src={src}
                alt={`Past Sponsor ${index + 1}`}
                className="w-36 h-20 mb-4 rounded-lg shadow-md"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Become a Sponsor Section */}
      <section className="bg-indigo-100 py-10 text-center">
        <h2 className="text-2xl font-bold mb-4">Interested in Sponsoring Us?</h2>
        <p className="max-w-xl mx-auto text-gray-700 mb-6">
          Partner with us and gain visibility in our community. We offer a range of sponsorship 
          opportunities to suit your brand and goals.
        </p>
        <button onClick={gotoContacts} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
          Contact Us for Sponsorship
        </button>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Sponsors;
