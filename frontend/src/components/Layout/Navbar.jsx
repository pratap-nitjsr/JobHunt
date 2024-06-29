import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import api from "../../services/api";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await api.get("user/logout", {
        withCredentials: true,
      });
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthorized(true);
    }
  };

  return (
    <nav className={`bg-gray-800 text-white p-4 ${isAuthorized ? "block" : "hidden"}`}>
      <div className="container flex items-center justify-between mx-auto">
        <div className="flex items-center">
          <img src="/navlogo.gif" alt="logo" className="h-24" />
        </div>
        <div className="md:hidden">
          <GiHamburgerMenu onClick={() => setShow(!show)} className="w-8 h-8 cursor-pointer" />
        </div>
        <div className={`absolute top-16 right-0 w-full md:static md:flex md:items-center md:space-x-4 ${show ? "block" : "hidden"} bg-gray-800 md:bg-transparent z-10 md:w-auto`}>
          <ul className="flex flex-col md:flex-row md:items-center md:space-x-4">
            <li>
              <Link to="/" onClick={() => setShow(false)} className="block px-4 py-2 hover:bg-gray-700">
                HOME
              </Link>
            </li>
            <li>
              <Link to="/job/getall" onClick={() => setShow(false)} className="block px-4 py-2 hover:bg-gray-700">
                ALL JOBS
              </Link>
            </li>
            <li>
              <Link to="/applications/me" onClick={() => setShow(false)} className="block px-4 py-2 hover:bg-gray-700">
                {user && user.role === "Employer" ? "APPLICANT'S APPLICATIONS" : "MY APPLICATIONS"}
              </Link>
            </li>
            {user && user.role === "Employer" && (
              <>
                <li>
                  <Link to="/job/post" onClick={() => setShow(false)} className="block px-4 py-2 hover:bg-gray-700">
                    POST NEW JOB
                  </Link>
                </li>
                <li>
                  <Link to="/job/me" onClick={() => setShow(false)} className="block px-4 py-2 hover:bg-gray-700">
                    VIEW YOUR JOBS
                  </Link>
                </li>
              </>
            )}
            <li>
              <button onClick={handleLogout} className="block px-4 py-2 hover:bg-gray-700">
                LOGOUT
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
