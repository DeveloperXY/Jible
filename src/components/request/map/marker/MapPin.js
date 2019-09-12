import React from "react";
import mapPin from "../../../../images/map_pin.svg";

function MapPin({ lat, lng }) {
  return lat === undefined || lng === undefined ? (
    <></>
  ) : (
    <img src={mapPin} alt="" />
  );
}

export default MapPin;
