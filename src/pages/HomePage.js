import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ImageGallery from "../components/ImageGallery";
import Banner from "../components/Banner";
import Footer from "../components/Footer";

const Homepage = () => {
  return (
    <div className="bg-gray-100 h-screen overflow-y-auto">
      <Banner/>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10 libre-baskerville-bold">About</h2>
          <p className="text-2xl max-w-[65vw] p-12 tinos-regular bg-white mx-auto text-justify">
            The IIIT Allahabad Sports Fest, known as Asmita, is one of India's
            largest sports events, promoting sportsmanship and athletic
            excellence among students. Scheduled from March 9 to 15, 2024, it
            features over 15 competitive events and expects around 1,200
            participants from various IIITs. The fest not only showcases
            athletic talent but also fosters unity and camaraderie among
            students and staff, making it a significant event in the
            intercollegiate sports calendar.
          </p>
        </div>
      </section>

      {/* Featured Sports Section */}
      <section className="py-16 mx-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10 libre-baskerville-bold">Featured Sports</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            <div className="bg-white p-5 rounded-lg shadow-lg">
              <h3 className="font-semibold text-xl mb-3">Aquatics</h3>
              <p>Swim your way to victory in various water events!</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-lg">
              <h3 className="font-semibold text-xl mb-3">Athletics</h3>
              <p>Get ready for track and field competitions.</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-lg">
              <h3 className="font-semibold text-xl mb-3">Badminton</h3>
              <p>Join us for exciting matches and team spirit!</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-lg">
              <h3 className="font-semibold text-xl mb-3">Basketball</h3>
              <p>Check out schedules and team tryouts.</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-lg">
              <h3 className="font-semibold text-xl mb-3">Football</h3>
              <p>Join our team and represent the college!</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-lg">
              <h3 className="font-semibold text-xl mb-3">Lawn Tennis</h3>
              <p>Compete in thrilling matches on the court.</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-lg">
              <h3 className="font-semibold text-xl mb-3">Squash</h3>
              <p>Test your skills and agility in this fast-paced game.</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-lg">
              <h3 className="font-semibold text-xl mb-3">Table Tennis</h3>
              <p>Join us for quick rallies and fun competitions!</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-lg">
              <h3 className="font-semibold text-xl mb-3">Volleyball</h3>
              <p>Be part of the action on the volleyball court!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <ImageGallery />

      <Footer/>

    </div>
  );
};

export default Homepage;
