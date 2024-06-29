import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { Context } from "../../main";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();
  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    api
      .get(`job/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setJob(res.data.job);
      })
      .catch(() => {
        navigateTo("/notfound");
      });
  }, [id, navigateTo]);

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/login");
    }
  }, [isAuthorized, navigateTo]);

  return (
    <section className="py-8 bg-gray-100">
      <div className="container px-4 mx-auto">
        <h3 className="mb-4 text-2xl font-semibold">Job Details</h3>
        <div className="p-6 bg-white rounded-md shadow-md">
          <p className="mb-2">
            Title: <span className="font-semibold">{job.title}</span>
          </p>
          <p className="mb-2">
            Category: <span>{job.category}</span>
          </p>
          <p className="mb-2">
            Country: <span>{job.country}</span>
          </p>
          <p className="mb-2">
            City: <span>{job.city}</span>
          </p>
          <p className="mb-2">
            Location: <span>{job.location}</span>
          </p>
          <p className="mb-2">
            Description: <span>{job.description}</span>
          </p>
          <p className="mb-2">
            Job Posted On: <span>{job.jobPostedOn}</span>
          </p>
          <p className="mb-2">
            Salary:{" "}
            {job.fixedSalary ? (
              <span>{job.fixedSalary}</span>
            ) : (
              <span>
                {job.salaryFrom} - {job.salaryTo}
              </span>
            )}
          </p>
          {user && user.role !== "Employer" && (
            <Link
              to={`/application/${job._id}`}
              className="inline-block px-4 py-2 mt-4 text-white transition duration-300 bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Apply Now
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
