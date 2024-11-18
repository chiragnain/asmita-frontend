import React from "react";
import logo from "../assets/logo.png";
import logo_iiita from "../assets/logo_iiita.png";
import { MapPinned, Phone, Mail } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-white  pt-10 pb-2 ">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-2 px-5">
        {/* Logo Section */}
        <div className="flex my-auto   border-red-500">
          <img src={logo} alt="Logo" className="h-32  border-red-500" />
          <div className="my-auto">
            <h2 className="libre-baskerville-bold my-auto font-extrabold  border-red-500">
              ASMITA 2024
            </h2>
            <h3 className="libre-baskerville-regular my-auto  border-red-500">
              IIIT Allahabad
            </h3>
          </div>
        </div>

        {/* Links Section */}
        <div className="flex flex-col items-center md:items-start  mx-auto   border-red-500">
          <h4 className="font-semibold text-lg mx-auto libre-baskerville-bold  border-red-500 mb-3">
            Useful Links
          </h4>
          <div className="flex justify-center w-full">
            <a
              href="https://github.com/chiragnain"
              className=" px-1 text-xl"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a
              href="https://www.linkedin.com/in/chirag-nain-2980961b7/"
              className=" px-3 text-xl"
            >
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100075798047724"
              className=" px-1 text-xl"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </a>
          </div>
          <div className="flex flex-col items-center mt-4">
            <p className=" tinos-bold mx-auto font-bold  border-red-500">
              Overall Coordinator
            </p>
            <h3 className=" tinos-regular mx-auto  border-red-500">
              Chirag Nain (iit2021079@iiita.ac.in)
            </h3>
          </div>
        </div>

        {/* Contacts Section */}
        <div className="flex flex-col items-center md:items-start libre-baskerville-bold mx-auto   border-red-500">
          <h4 className="font-semibold text-lg mx-auto  border-red-500 mb-3">
            Contact Us
          </h4>
          <div className="flex mb-1 items-center">
            <FontAwesomeIcon icon={faLocationDot} />
            <p className="pl-2 tinos-regular-italic">
              Jhalwa, Prayagraj-211015, U.P
            </p>
          </div>
          <div className="flex mb-1 items-center">
            <FontAwesomeIcon icon={faPhone} />
            <p className="pl-2 tinos-regular-italic">+91 34628XXXX</p>
          </div>
          <div className="flex mb-1 items-center">
            <FontAwesomeIcon icon={faEnvelope} />
            <p className="pl-2 tinos-regular-italic">buzo1yeardog@gmail.com</p>
          </div>
        </div>

        {/* IIITA Logo Section */}
        <div className="flex flex-col   border-red-500">
          <img
            src={logo_iiita}
            alt="IIIA Logo"
            className="h-24 w-24 mx-auto border-red-500"
          />
          <p className="text-xs tinos-bold mx-auto font-bold  border-red-500">
            Indian Institute of Information Technology
          </p>
          <p className="text-xs tinos-bold mx-auto font-bold  border-red-500">
            Allahabad (IIIT A)
          </p>
          <h3 className="text-xs tinos-regular mx-auto  border-red-500">
            Devghat, Jhalwa, Prayagraj-211015, U. P. INDIA
          </h3>
        </div>
      </div>

      {/* Copyright Statement */}
      <div className="mt-8 text-center text-sm tinos-regular text-gray-500 border-t border-gray-200 pt-4">
        © {new Date().getFullYear()} IIIT Allahabad. All rights reserved.
        <p>Developed by Chirag Nain</p>
      </div>
    </footer>
  );
};

export default Footer;
