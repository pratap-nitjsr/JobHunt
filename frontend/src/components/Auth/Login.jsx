import React, { useContext, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import toast from "react-hot-toast";
import { Context } from "../../main";
import api from "../../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post(
        "user/login",
        { email, password, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setEmail("");
      setPassword("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthorized) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <section className="flex items-center justify-center min-h-screen bg-gray-100 md:bg-none">
        <div className="container flex flex-col p-6 mx-auto bg-white rounded-lg shadow-lg md:flex-row">
          <div className="w-full p-6 md:w-1/2">
            <div className="mb-6 text-center header">
              <img src="/Logo.gif" alt="logo" className="mx-auto h-72" />
              <h3 className="mt-4 text-xl font-semibold">Login to your account</h3>
            </div>
            <form onSubmit={handleLogin}>
              <div className="mb-4 inputTag">
                <label className="block mb-1">Login As</label>
                <div className="relative">
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select Role</option>
                    <option value="Employer">Employer</option>
                    <option value="Job Seeker">Job Seeker</option>
                  </select>
                  <FaRegUser className="absolute inset-y-0 text-gray-400 right-3 top-2" />
                </div>
              </div>
              <div className="mb-4 inputTag">
                <label className="block mb-1">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="example@mail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <MdOutlineMailOutline className="absolute inset-y-0 text-gray-400 right-3 top-2" />
                </div>
              </div>
              <div className="mb-6 inputTag">
                <label className="block mb-1">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <RiLock2Fill className="absolute inset-y-0 text-gray-400 right-3 top-2" />
                </div>
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Login
              </button>
              <Link to="/register" className="block mt-4 text-center text-indigo-600 hover:underline">
                Register Now
              </Link>
            </form>
          </div>
          <div className="hidden w-full bg-center bg-no-repeat bg-cover rounded-r-lg md:w-1/2 md:block md:bg-none md:relative" style={{ backgroundImage: "url('/login.png')" }}>
            {/* Empty div to handle background image */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
