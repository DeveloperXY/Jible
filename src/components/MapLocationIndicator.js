import React from "react";
import "./mapLocationIndicator.css";

function MapLocationIndicator({ type, first }) {
  const pickupColor = "#419D78";
  const dropOffColor = "#4A90E2";
  return (
    <div
      className="location-indicator"
      style={{
        backgroundColor: type === "PICK_UP_POINT" ? pickupColor : dropOffColor
      }}
    ></div>
  );
}

export default MapLocationIndicator;
