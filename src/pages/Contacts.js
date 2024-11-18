import React from "react";
import Footer from "../components/Footer";
import map from "../assets/map.png"
import email from "../assets/email.png"
import phone from "../assets/phone.png"



const Contacts = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 ">
      
      {/* Main Content */}
      <div className="flex-grow">
        <h1 className="text-3xl font-bold text-center mt-8 mb-4 libre-baskerville-bold">
          Contact Us
        </h1>
        <div className="flex flex-wrap items-center justify-center m-4 space-x-4">
          
          {/* Contact Card */}
          <div className="max-w-xl bg-white rounded-lg shadow-lg overflow-hidden p-5">
            <div className="flex items-center">
                <img src={map} className="w-16 h-16 rounded-xl" />
                <div className="flex-col m-2 p-2">
                    <p className="libre-baskerville-bold">Address</p>
                    <p className="tinos-regular">Indian Institute of Information Technology Allahabad</p>
                    <p className="tinos-regular-italic">Devghat, Jhalwa, Prayagraj-211015, U. P. INDIA</p>
                </div>

            </div>
            <div className="flex items-center">
                <img src={phone} className="w-16 h-16 rounded-xl" />
                <div className="flex-col m-2 p-2">
                    <p className="libre-baskerville-bold">Phone</p>
                    <p className="tinos-regular">+91 639628XXXX , +91 912577XXXX</p>

                </div>

            </div>
            <div className="flex items-center">
                <img src={email} className="w-16 h-16 rounded-xl" />
                <div className="flex-col m-2 p-2">
                    <p className="libre-baskerville-bold">Email</p>
                    <p className="tinos-regular">asmita@iiita.ac.in , buzo1yeardog@gmail.com</p>

                </div>

            </div>

          </div>

          {/* Google Maps Embed */}
          <div className="w-full sm:w-auto border-2 border-gray-200 shadow-xl rounded-2xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3603.263492502276!2d81.76757767485836!3d25.429452922255333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399acda4892cc187%3A0xb07e2e87ab51e82a!2sIndian%20Institute%20of%20Information%20Technology%2C%20Allahabad!5e0!3m2!1sen!2sin!4v1730668542629!5m2!1sen!2sin"  
              width="500"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="College Location on Google Maps"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Contacts;
