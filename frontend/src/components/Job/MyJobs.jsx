import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa";
import { RiCloseLine } from "react-icons/ri"; // Changed from `RxCross2` to `RiCloseLine`
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  // Fetching all jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await api.get(
          "job/getmyjobs",
          { withCredentials: true }
        );
        setMyJobs(data.myJobs);
      } catch (error) {
        toast.error(error.response.data.message);
        setMyJobs([]);
      }
    };
    fetchJobs();
  }, []);

  // Redirect if not authorized or not an employer
  useEffect(() => {
    if (!isAuthorized || (user && user.role !== "Employer")) {
      navigateTo("/");
    }
  }, [isAuthorized, user, navigateTo]);

  // Function for enabling editing mode
  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };

  // Function for disabling editing mode
  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  // Function for updating a job
  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    try {
      const response = await api.put(
        `job/update/${jobId}`,
        updatedJob,
        { withCredentials: true }
      );
      toast.success(response.data.message);
      setEditingMode(null);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // Function for deleting a job
  const handleDeleteJob = async (jobId) => {
    try {
      const response = await api.delete(
        `job/delete/${jobId}`,
        { withCredentials: true }
      );
      toast.success(response.data.message);
      setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // Function for handling input changes
  const handleInputChange = (jobId, field, value) => {
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  return (
    <section className="py-8 bg-gray-100 myJobs page">
      <div className="container mx-auto">
        <h1 className="mb-4 text-2xl font-bold text-center">Your Posted Jobs</h1>
        {myJobs.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {myJobs.map((element) => (
              <div key={element._id} className="p-6 bg-white rounded-md shadow-md card">
                <div className="content">
                  <div className="grid grid-cols-2 gap-4 short_fields">
                    <div>
                      <span className="block font-semibold">Title:</span>
                      <input
                        type="text"
                        disabled={editingMode !== element._id}
                        value={element.title}
                        onChange={(e) =>
                          handleInputChange(element._id, "title", e.target.value)
                        }
                        className="w-full px-2 py-1 border rounded-md"
                      />
                    </div>
                    <div>
                      <span className="block font-semibold">Country:</span>
                      <input
                        type="text"
                        disabled={editingMode !== element._id}
                        value={element.country}
                        onChange={(e) =>
                          handleInputChange(element._id, "country", e.target.value)
                        }
                        className="w-full px-2 py-1 border rounded-md"
                      />
                    </div>
                    <div>
                      <span className="block font-semibold">City:</span>
                      <input
                        type="text"
                        disabled={editingMode !== element._id}
                        value={element.city}
                        onChange={(e) =>
                          handleInputChange(element._id, "city", e.target.value)
                        }
                        className="w-full px-2 py-1 border rounded-md"
                      />
                    </div>
                    <div>
                      <span className="block font-semibold">Category:</span>
                      <select
                        value={element.category}
                        onChange={(e) =>
                          handleInputChange(element._id, "category", e.target.value)
                        }
                        disabled={editingMode !== element._id}
                        className="w-full px-2 py-1 border rounded-md"
                      >
                        <option value="Graphics & Design">Graphics & Design</option>
                        <option value="Mobile App Development">Mobile App Development</option>
                        <option value="Frontend Web Development">Frontend Web Development</option>
                        <option value="MERN Stack Development">MERN STACK Development</option>
                        <option value="Account & Finance">Account & Finance</option>
                        <option value="Artificial Intelligence">Artificial Intelligence</option>
                        <option value="Video Animation">Video Animation</option>
                        <option value="MEAN Stack Development">MEAN STACK Development</option>
                        <option value="MEVN Stack Development">MEVN STACK Development</option>
                        <option value="Data Entry Operator">Data Entry Operator</option>
                      </select>
                    </div>
                    <div>
                      <span className="block font-semibold">Salary:</span>{" "}
                      {element.fixedSalary ? (
                        <input
                          type="number"
                          disabled={editingMode !== element._id}
                          value={element.fixedSalary}
                          onChange={(e) =>
                            handleInputChange(element._id, "fixedSalary", e.target.value)
                          }
                          className="w-full px-2 py-1 border rounded-md"
                        />
                      ) : (
                        <>
                          <input
                            type="number"
                            disabled={editingMode !== element._id}
                            value={element.salaryFrom}
                            onChange={(e) =>
                              handleInputChange(element._id, "salaryFrom", e.target.value)
                            }
                            className="w-full px-2 py-1 border rounded-md"
                          />
                          <input
                            type="number"
                            disabled={editingMode !== element._id}
                            value={element.salaryTo}
                            onChange={(e) =>
                              handleInputChange(element._id, "salaryTo", e.target.value)
                            }
                            className="w-full px-2 py-1 border rounded-md"
                          />
                        </>
                      )}
                    </div>
                    <div>
                      <span className="block font-semibold">Expired:</span>
                      <select
                        value={element.expired}
                        onChange={(e) =>
                          handleInputChange(element._id, "expired", e.target.value)
                        }
                        disabled={editingMode !== element._id}
                        className="w-full px-2 py-1 border rounded-md"
                      >
                        <option value={true}>TRUE</option>
                        <option value={false}>FALSE</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-4 long_field">
                    <div>
                      <span className="block font-semibold">Description:</span>{" "}
                      <textarea
                        rows={5}
                        value={element.description}
                        disabled={editingMode !== element._id}
                        onChange={(e) =>
                          handleInputChange(element._id, "description", e.target.value)
                        }
                        className="w-full px-2 py-1 border rounded-md"
                      />
                    </div>
                    <div>
                      <span className="block font-semibold">Location:</span>{" "}
                      <textarea
                        rows={5}
                        value={element.location}
                        disabled={editingMode !== element._id}
                        onChange={(e) =>
                          handleInputChange(element._id, "location", e.target.value)
                        }
                        className="w-full px-2 py-1 border rounded-md"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 button_wrapper">
                  <div className="edit_btn_wrapper">
                    {editingMode === element._id ? (
                      <>
                        <button
                          onClick={() => handleUpdateJob(element._id)}
                          className="px-3 py-1 text-white transition duration-300 bg-green-500 rounded-md check_btn hover:bg-green-600"
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={() => handleDisableEdit()}
                          className="px-3 py-1 text-white transition duration-300 bg-red-500 rounded-md cross_btn hover:bg-red-600"
                        >
                          <RiCloseLine />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleEnableEdit(element._id)}
                        className="px-3 py-1 text-white transition duration-300 bg-blue-500 rounded-md edit_btn hover:bg-blue-600"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteJob(element._id)}
                    className="px-3 py-1 text-white transition duration-300 bg-red-500 rounded-md delete_btn hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">You haven't posted any jobs yet.</p>
        )}
      </div>
    </section>
  );
};

export default MyJobs;
