import React from "react";
import {
  MdOutlineDesignServices,
  MdOutlineWebhook,
  MdAccountBalance,
  MdOutlineAnimation,
} from "react-icons/md";
import { TbAppsFilled } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";

const PopularCategories = () => {
  const categories = [
    {
      id: 1,
      title: "Graphics & Design",
      subTitle: "305 Open Positions",
      icon: <MdOutlineDesignServices className="text-3xl text-indigo-500" />,
    },
    {
      id: 2,
      title: "Mobile App Development",
      subTitle: "500 Open Positions",
      icon: <TbAppsFilled className="text-3xl text-indigo-500" />,
    },
    {
      id: 3,
      title: "Frontend Web Development",
      subTitle: "200 Open Positions",
      icon: <MdOutlineWebhook className="text-3xl text-indigo-500" />,
    },
    {
      id: 4,
      title: "MERN STACK Development",
      subTitle: "1000+ Open Postions",
      icon: <FaReact className="text-3xl text-indigo-500" />,
    },
    {
      id: 5,
      title: "Account & Finance",
      subTitle: "150 Open Positions",
      icon: <MdAccountBalance className="text-3xl text-indigo-500" />,
    },
    {
      id: 6,
      title: "Artificial Intelligence",
      subTitle: "867 Open Positions",
      icon: <GiArtificialIntelligence className="text-3xl text-indigo-500" />,
    },
    {
      id: 7,
      title: "Video Animation",
      subTitle: "50 Open Positions",
      icon: <MdOutlineAnimation className="text-3xl text-indigo-500" />,
    },
    {
      id: 8,
      title: "Game Development",
      subTitle: "80 Open Positions",
      icon: <IoGameController className="text-3xl text-indigo-500" />,
    },
  ];
  
  return (
    <div className="py-12 bg-gray-100 categories">
      <h3 className="mb-8 text-3xl font-bold text-center text-gray-800">POPULAR CATEGORIES</h3>
      <div className="grid grid-cols-1 gap-8 px-6 banner md:grid-cols-2 lg:grid-cols-4">
        {categories.map((element) => (
          <div key={element.id} className="flex flex-col items-center p-6 text-center bg-white rounded-lg shadow-md card">
            <div className="mb-4 icon">{element.icon}</div>
            <div className="text">
              <p className="mb-2 text-xl font-semibold text-gray-800">{element.title}</p>
              <p className="text-gray-600">{element.subTitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCategories;
