import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";

export default function BackToTopBtn() {
  return (
    <div className="back-to-top-btn">
      <button
        className="top-btn"
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }}
      >
        <FontAwesomeIcon icon={faAngleUp} />
      </button>
    </div>
  );
}
// dodać jako cały pasek
