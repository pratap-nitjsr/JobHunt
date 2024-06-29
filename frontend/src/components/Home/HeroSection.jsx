import React from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";

const HeroSection = () => {
  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Job",
      icon: <FaSuitcase className="text-3xl text-indigo-500" />,
    },
    {
      id: 2,
      title: "91,220",
      subTitle: "Companies",
      icon: <FaBuilding className="text-3xl text-indigo-500" />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Job Seekers",
      icon: <FaUsers className="text-3xl text-indigo-500" />,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Employers",
      icon: <FaUserPlus className="text-3xl text-indigo-500" />,
    },
  ];
  
  return (
    <>
      <div className="py-12 bg-gray-100 heroSection">
        <div className="container flex flex-col items-center px-6 mx-auto md:flex-row">
          <div className="text-center title md:text-left md:w-1/2">
            <h1 className="mb-4 text-4xl font-bold leading-tight text-gray-800">
              Find a job that suits
              <br />
              your interests and skills
            </h1>
            <p className="mb-6 text-lg text-gray-600">
              Discover opportunities that match your expertise and passion. Connect with top companies and grow your career.
            </p>
          </div>
          <div className="image md:w-1/2">
            <img src="/heroS.png" alt="hero" className="w-full h-auto rounded-lg shadow-lg" />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 px-6 mt-12 details md:grid-cols-4">
          {details.map((element) => (
            <div key={element.id} className="p-6 text-center bg-white rounded-lg shadow-lg card">
              <div className="mb-4 icon">{element.icon}</div>
              <div className="content">
                <p className="text-2xl font-semibold text-gray-800">{element.title}</p>
                <p className="text-gray-600">{element.subTitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HeroSection;
