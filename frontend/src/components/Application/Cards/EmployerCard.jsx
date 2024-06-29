import React from "react";

const EmployerCard = ({ element, openModal, acceptApplication, rejectApplication }) => {
  return (
    <div className="p-4 bg-gray-100 shadow-xl rouded-md">
      <div className="space-y-2">
        <p>
          <span className="font-semibold">Name:</span> {element.name}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {element.email}
        </p>
        <p>
          <span className="font-semibold">Phone:</span> {element.phone}
        </p>
        <p>
          <span className="font-semibold">Address:</span> {element.address}
        </p>
        <p>
          <span className="font-semibold">CoverLetter:</span>{" "}
          {element.coverLetter}
        </p>
      </div>
      <div className="flex justify-around mt-4">
        <div>
          <button
            onClick={() => openModal(element.resume.url)}
            className="px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600"
          >
            View Resume
          </button>
        </div>
        {element.status === "Pending" ? (
          <div className="flex justify-around">
            <button
              onClick={() => acceptApplication(element._id)}
              className="px-4 py-2 m-1 text-white align-middle bg-green-500 rounded-md hover:bg-green-600"
            >
              Accept
            </button>
            <button
              onClick={() => rejectApplication(element._id)}
              className="px-4 py-2 m-1 text-white align-middle bg-red-500 rounded-md hover:bg-red-600"
            >
              Reject
            </button>
          </div>
        ) : (
          <button
            disabled
            className="px-4 py-2 m-1 text-white align-middle bg-gray-500 rounded-md hover:bg-gray-600"
          >
            Status: {element.status}
          </button>
        )}
      </div>
    </div>
  );
};

export default EmployerCard;
