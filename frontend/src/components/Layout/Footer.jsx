import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  const { isAuthorized } = useContext(Context);
  return (
    <footer className={`py-4 bg-gray-800 text-white w-full ${isAuthorized ? "block" : "hidden"} relative md:fixed md:bottom-0`}>
      <div className="container flex flex-col items-center justify-between mx-auto space-y-4 md:flex-row md:space-y-0">
        <div className="text-center md:text-left">&copy; All Rights Reserved By PK.</div>
        <div className="flex space-x-4">
          <Link to="#" target="_blank" className="hover:text-blue-500">
            <FaFacebookF />
          </Link>
          <Link to="#" target="_blank" className="hover:text-red-500">
            <FaYoutube />
          </Link>
          <Link to="https://www.linkedin.com/in/pratap-kumar-784815207/" target="_blank" className="hover:text-blue-700">
            <FaLinkedin />
          </Link>
          <Link to="#" target="_blank" className="hover:text-pink-500">
            <RiInstagramFill />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
