import React from "react";
import "./mapMarker.css";

function MapMarker({ text, lat, lng }) {
  return lat === undefined || lng === undefined ? (
    <></>
  ) : (
    <div className="marker">{text}</div>
  );
}

export default MapMarker;
