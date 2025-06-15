import type React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  const handleTryAgain = () => {
    navigate("/");
  };

  const handleSupportContact = () => {
    window.location.href = "mailto:sagarthakkar@carpeno.in";
  };

  return (
    <div
      className="w-screen h-screen flex flex-col items-center justify-center bg-cover bg-center text-white"
      style={{ backgroundImage: `url('/What_background.svg')` }}
    >
      <img src="/error.svg" alt="Error Icon" className="w-50 h-40 mb-4" />
      <h1 className="text-5xl font-bold text-gray-700 mb-5">Oops!</h1>
      <p className="text-xl text-gray-500 mb-6">Something Went Wrong</p>
      <button
        onClick={handleTryAgain}
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-md mb-4 transition"
      >
        Try Again
      </button>
      <p className="text-gray-600">
        Please contact our{" "}
        <span
          onClick={handleSupportContact}
          className="text-blue-500 hover:underline cursor-pointer"
        >
          support team
        </span>
      </p>
    </div>
  );
};

export default ErrorPage;
