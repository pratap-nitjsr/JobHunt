import React from "react";

const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  const statusStyles = {
    Pending: "bg-yellow-100 border-yellow-500",
    Accepted: "bg-green-100 border-green-500",
    Rejected: "bg-red-100 border-red-500",
  };

  const statusTextStyles = {
    Pending: "text-yellow-700",
    Accepted: "text-green-700",
    Rejected: "text-red-700",
  };

  return (
    <div
      className={`p-4 rounded-md shadow-md border-l-4 ${statusStyles[element.status]}`}
    >
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
        <p className={`font-semibold ${statusTextStyles[element.status]}`}>
          Status: {element.status}
        </p>
        <p>
          <span className="font-semibold">Cover Letter:</span> {element.coverLetter}
        </p>
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => openModal(element.resume.url)}
          className="px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600"
        >
          View Resume
        </button>
        <button
          onClick={() => deleteApplication(element._id)}
          className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
        >
          Delete Application
        </button>
      </div>
    </div>
  );
};

export default JobSeekerCard;
