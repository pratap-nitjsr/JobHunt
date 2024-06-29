import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";
import api from "../../services/api";

const Application = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);

  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleFileChange = (event) => {
    const resume = event.target.files[0];
    setResume(resume);
  };

  const { id } = useParams();
  const handleApplication = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);

    try {
      const { data } = await api.post(
        "application/post",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setAddress("");
      setResume(null);
      toast.success(data.message);
      navigateTo("/job/getall");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthorized || (user && user.role === "Employer")) {
    navigateTo("/");
  }

  return (
    <section className="py-8 bg-gray-100 application">
      <div className="container mx-auto">
        <h3 className="mb-4 text-2xl font-bold">Application Form</h3>
        <form onSubmit={handleApplication} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
          />
          <input
            type="number"
            placeholder="Your Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
          />
          <input
            type="text"
            placeholder="Your Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
          />
          <textarea
            placeholder="Cover Letter..."
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
          />
          <div>
            <label className="block mb-2 text-lg">Select Resume</label>
            <input
              type="file"
              accept=".pdf, .jpg, .png"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Send Application
          </button>
        </form>
      </div>
    </section>
  );
};

export default Application;
