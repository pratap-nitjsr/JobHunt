import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { Context } from "../../main";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get("job/getall", {
          withCredentials: true,
        });
        setJobs(response.data.jobs);
      } catch (error) {
        console.log(error);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/");
    }
  }, [isAuthorized, navigateTo]);

  return (
    <section className="py-8 bg-gray-100">
      <div className="container mx-auto">
        <h1 className="mb-8 text-2xl font-bold text-center">ALL AVAILABLE JOBS</h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <div key={job._id} className="p-6 bg-white rounded-md shadow-md">
              <p className="mb-2 text-lg font-semibold">{job.title}</p>
              <p className="mb-2 text-gray-600">{job.category}</p>
              <p className="mb-2 text-gray-600">{job.country}</p>
              <Link
                to={`/job/${job._id}`}
                className="inline-block px-4 py-2 mt-4 text-white transition duration-300 bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                Job Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
