import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SkipSelectedModalStyle.css";

function SkipModal({ skip, onClose }) {
  const modalRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/permit-check");
  };

  useEffect(() => {
    setTimeout(() => setVisible(true), 10);

    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeWithAnimation();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const closeWithAnimation = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  if (!skip) return null;

  return (
    <div className={`modal-overlay ${visible ? "fade-in" : "fade-out"}`}>
      <div className="modal-content text-white" ref={modalRef}>
        <h2 className="text-white">{skip.size} Yard Skip</h2>
        <span>{skip.size} £7 day hire</span>
        <p className="pb text-white">
          You selected the {skip.size} Yard Skip, which comes with a{" "}
          {skip.hire_period_days}-day hire period at a rate of £
          {skip.price_before_vat} per week, offering a convenient waste disposal
          solution.{" "}
        </p>
        <p className="pb text-white">
          If the 4 Yard Skip is the right fit for you, just hit confirm to move
          on to the next steps! 😊
        </p>
        <div className="buttons-container">
          <button onClick={closeWithAnimation} className="modal-buttons">
            <span className="text-white">Close</span>
          </button>
          <button className="modal-buttons text-white" onClick={handleContinue}>
            <span className="text-white">
              Confirm
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-right w-4 h-4 text-sm"
            >
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SkipModal;
