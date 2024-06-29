import React, {useContext} from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { Context } from "../../main";

const HowItWorks = () => {
  
  const { isAuthorized, user } = useContext(Context);
  
  return (
    <>
      <div className="py-12 bg-white howitworks">
        <div className="container mx-auto text-center">
          <h3 className="mb-8 text-3xl font-bold text-gray-800">How JobHunt Works</h3>
          <div className="grid grid-cols-1 gap-8 banner md:grid-cols-3">
            <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md card">
              <FaUserPlus className="mb-4 text-5xl text-indigo-500" />
              <p className="mb-2 text-xl font-semibold text-gray-700">Create Account</p>
              <p className="text-gray-600">
              Create an account on JobHunt to access all its features
              </p>
            </div>
            <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md card">
              <MdFindInPage className="mb-4 text-5xl text-indigo-500" />
              <p className="mb-2 text-xl font-semibold text-gray-700">
                {(user.role == "Employer")?
                  ("Post a Job"):
                  ("Find a Job")
                }
              </p>
              <p className="text-gray-600">
              {(user.role == "Employer")?
                  ("Post the job with all the details on jobHunt"):
                  ("Find a job that meets your skills and requirements")
                }
              </p>
            </div>
            <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md card">
              <IoMdSend className="mb-4 text-5xl text-indigo-500" />
              <p className="mb-2 text-xl font-semibold text-gray-700">
                {(user.role == "Employer")?
                  ("Recruit Suitable Candidates"):
                  ("Apply For Job")
              }
              </p>
              <p className="text-gray-600">
              {(user.role == "Employer")?
                  ("Recruit candidates that meet the requirements of job"):
                  ("Apply for your dream jobs and get recruited")
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
