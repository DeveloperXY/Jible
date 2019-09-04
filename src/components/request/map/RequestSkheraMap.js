import React from "react";
import "./requestSkheraMap.css";

function RequestSkheraMap(props) {
  return (
    <div className="request-map">
      <label className="form-label" htmlFor="description">
        Describe your skhera
      </label>
      <textarea rows="2" />
    </div>
  );
}

export default RequestSkheraMap;
