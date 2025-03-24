import React, { useState, useEffect } from "react";
import "./SkipOptionsComponentStyle.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./SkipsCarousel.css";
import "lucide-static/font/lucide.css";
import Spinner from "./SpinnerComponent";
import SkipModal from "./SkipSelectedModal";
import TitleComponent from "./TitleComponent";

function SkipOptionsComponent() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null); // Store the active index
  const [selectedSkip, setSelectedSkip] = useState(null);
  const [showModal, setShowModal] = useState(false); // Show/Hide modal state

  useEffect(() => {
    const apiUrl =
      "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft";

    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (e) {
        setError(e.message);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleModalClose = () => {
    setShowModal(false); // Begin fade-out by setting showModal to false
    setActiveIndex(null);
    setTimeout(() => {
      setSelectedSkip(null); // Reset selected skip after fade-out
    }, 300); // This matches the fade-out transition duration (300ms)
  };

  const handleModalOpen = (skip, index) => {
    setSelectedSkip(skip);
    setActiveIndex(index);
    setShowModal(true); // Show the modal and trigger fade-in
  };

  return (
    <div className="container">
      <TitleComponent
        mainTitle="Choose Your Skip Size"
        subTitle="Select the skip size that best suits your needs"
      />
      {loading ? (
        <Spinner />
      ) : (
        <div className="grid-container">
          {data.map((skip, index) => (
            <div
              key={index}
              className={`grid-item ${
                !skip.allows_heavy_waste ? "disabled" : ""
              }`}  onClick={() => handleModalOpen(skip, index)}
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1590496793929-36417d3117de?q=80&amp;w=800"
                  alt={`${skip.size} Yard Skip`}
                  className="item-walpapper"
                />
                <div className="text-sm yards absolute">{skip.size} Yards</div>
                <div className="warnings-container absolute">
                  {!skip.allowed_on_road && (
                    <div className="private-prop">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-alert-triangle w-4 h-4 text-yellow shrink-0"
                      >
                        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                        <path d="M12 9v4"></path>
                        <path d="M12 17h.01"></path>
                      </svg>
                      <span className="text-xs font-medium text-yellow">
                        Private Property Only
                      </span>
                    </div>
                  )}
                  {!skip.allows_heavy_waste && (
                    <div className="heavy-waste">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-alert-triangle w-4 h-4 text-red shrink-0"
                      >
                        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                        <path d="M12 9v4"></path>
                        <path d="M12 17h.01"></path>
                      </svg>
                      <span className="text-xs font-medium text-red">
                        Not Suitable for Heavy Waste
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <h3 className="h3 text-white">{skip.size} Yard Skip</h3>
              <p className="text-sm p mb-p">
                {skip.hire_period_days} day hire period
              </p>
              <div className="price-container">
                <div>
                  <span className="price">£{skip.price_before_vat}</span>
                  <span className="text-sm price-period">per week</span>
                </div>
              </div>
              <button
                // onClick={() => handleModalOpen(skip, index)}
                className={`pb skip-button text-white ${
                  activeIndex === index ? "clicked" : ""
                }`}
              >
                <span>
                  {activeIndex === index ? "Selected" : "Select This Skip"}
                </span>
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedSkip && (
        <SkipModal
          show={showModal}
          skip={selectedSkip}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}

export default SkipOptionsComponent;
