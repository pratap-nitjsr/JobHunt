import React from "react";

const ResumeModal = ({ fileUrl, onClose }) => {
  const isImage = (url) => /\.(jpg|jpeg|png|webp)$/i.test(url);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="relative w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
        <span
          className="absolute text-2xl font-bold text-gray-700 cursor-pointer top-2 right-2 hover:text-gray-900"
          onClick={onClose}
        >
          &times;
        </span>
        {isImage(fileUrl) ? (
          <object
          data={fileUrl}
          type="image/jpeg"
          className="w-full h-full"
          style={{ height: "calc(100vh - 120px)" }}/
        >
        ) : (
          <object
            data={fileUrl}
            type="application/pdf"
            className="w-full h-full"
            style={{ height: "calc(100vh - 120px)" }}
          >
            <p>
              Your browser does not support viewing PDFs directly. Please
              download the PDF to view it:
            </p>
            <a href={fileUrl} download>
              <button className="px-4 py-2 mt-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600">
                Download PDF
              </button>
            </a>
          </object>
        )}
      </div>
    </div>
  );
};

export default ResumeModal;
