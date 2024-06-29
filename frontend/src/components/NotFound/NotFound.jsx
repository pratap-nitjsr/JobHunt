import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <img src="/notfound.png" alt="Page Not Found" className="w-full max-w-md mx-auto" />
        <Link
          to="/"
          className="inline-block px-4 py-2 mt-6 text-white bg-indigo-500 rounded-md hover:bg-indigo-600"
        >
          RETURN TO HOME PAGE
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
