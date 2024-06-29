import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";
import JobSeekerCard from "./Cards/JobSeekerCard";
import EmployerCard from "./Cards/EmployerCard";
import api from "../../services/api";

const MyApplications = () => {
  const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeFileUrl, setResumeFileUrl] = useState("");

  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const endpoint =
          user && user.role === "Employer"
            ? "application/employer/getall"
            : "application/jobseeker/getall";

        const res = await api.get(endpoint, { withCredentials: true });
        setApplications(res.data.applications);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    if (isAuthorized) {
      fetchApplications();
    } else {
      navigateTo("/");
    }
  }, [isAuthorized, user, navigateTo]);

  const deleteApplication = async (id) => {
    try {
      const res = await api.delete(
        `application/delete/${id}`,
        {
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
      setApplications((prevApplications) =>
        prevApplications.filter((application) => application._id !== id)
      );
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (fileUrl) => {
    setResumeFileUrl(fileUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const acceptApplication = async (id) => {
    try {
      const res = await api.patch(
        `application/accept/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
      setApplications((prevApplications) =>
        prevApplications.map((application) =>
          application._id === id ? { ...application, status: "Accepted" } : application
        )
      );
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const rejectApplication = async (id) => {
    try {
      const res = await api.patch(
        `application/reject/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
      setApplications((prevApplications) =>
        prevApplications.map((application) =>
          application._id === id ? { ...application, status: "Rejected" } : application
        )
      );
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className="py-8 bg-gray-100">
      <div className="container mx-auto">
        <h1 className="mb-4 text-2xl font-bold">
          {user && user.role === "Job Seeker"
            ? "My Applications"
            : "Applications From Job Seekers"}
        </h1>
        {applications.length <= 0 ? (
          <h4 className="text-lg text-center">No Applications Found</h4>
        ) : (
          applications.map((element) => (
            <div key={element._id} className="mb-4">
              {user && user.role === "Job Seeker" ? (
                <JobSeekerCard
                  element={element}
                  deleteApplication={deleteApplication}
                  openModal={openModal}
                />
              ) : (
                <EmployerCard
                  element={element}
                  openModal={openModal}
                  acceptApplication={acceptApplication}
                  rejectApplication={rejectApplication}
                />
              )}
            </div>
          ))
        )}
      </div>
      {modalOpen && (
        <ResumeModal fileUrl={resumeFileUrl} onClose={closeModal} />
      )}
    </section>
  );
};

export default MyApplications;
