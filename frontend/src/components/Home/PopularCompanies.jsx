import React from "react";
import { FaMicrosoft, FaApple } from "react-icons/fa";
import { SiTesla } from "react-icons/si";

const PopularCompanies = () => {
  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "Bengaluru, India",
      openPositions: 10,
      icon: <FaMicrosoft className="text-4xl text-indigo-500" />,
    },
    {
      id: 2,
      title: "Tesla",
      location: "Bengaluru, India",
      openPositions: 5,
      icon: <SiTesla className="text-4xl text-indigo-500" />,
    },
    {
      id: 3,
      title: "Apple",
      location: "Bengaluru, India",
      openPositions: 20,
      icon: <FaApple className="text-4xl text-indigo-500" />,
    },
  ];

  return (
    <div className="py-12 companies bg-gray-50">
      <div className="container mx-auto text-center">
        <h3 className="mb-8 text-3xl font-bold text-gray-800">TOP COMPANIES</h3>
        <div className="grid grid-cols-1 gap-8 banner md:grid-cols-2 lg:grid-cols-3">
          {companies.map((element) => (
            <div
              key={element.id}
              className="flex flex-col items-center p-6 text-center bg-white rounded-lg shadow-md card"
            >
              <div className="flex flex-col items-center mb-4 content">
                <div className="mb-4 icon">{element.icon}</div>
                <div className="text">
                  <p className="mb-2 text-xl font-semibold text-gray-800">{element.title}</p>
                  <p className="text-gray-600">{element.location}</p>
                </div>
              </div>
              <button className="w-full px-4 py-2 mt-auto text-white bg-indigo-500 rounded-full sm:w-auto">
                Open Positions {element.openPositions}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularCompanies;
