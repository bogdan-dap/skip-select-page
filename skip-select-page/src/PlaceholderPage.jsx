import React from "react";
import "./Placeholders.css";
import { useNavigate } from "react-router-dom";

function PlaceholderPage() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="placeholder-container ">
      <h1 className="placeholder-title ">
        This is an placeholder for Waste Type page
      </h1>
      <button className="placeholder-button text-white" onClick={handleBack}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="lucide lucide-arrow-left"
        >
          <path d="m12 19-7-7 7-7" />
          <path d="M19 12H5" />
        </svg>
        Back to Select Skip
      </button>
    </div>
  );
}

export default PlaceholderPage;
