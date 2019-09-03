import React from "react";
import "./requestSkhera.css";

function RequestSkhera(props) {
  return (
    <>
      <div className="main-content">
        <div className="header-content">
          <span className="jible-header">Jible</span>
          <div className="profile-header-section">
            <img className="profile-img" alt="" />
            <div className="current-username"></div>
          </div>
        </div>
        <div className="body-content">
          <h1>Request a Skhera</h1>
        </div>
      </div>
    </>
  );
}

export default RequestSkhera;
