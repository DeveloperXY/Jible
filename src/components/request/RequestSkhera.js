import React from "react";
import "./requestSkhera.css";
import RequestSkheraDetails from "./details/RequestSkheraDetails";
import RequestSkheraMap from "./map/RequestSkheraMap";

function RequestSkhera(props) {
  return (
    <div className="request-skhera-body">
      <h1 className="request-skhera-header">Request a Skhera</h1>
      <div className="request-content">
        <RequestSkheraDetails />
        <RequestSkheraMap />
      </div>
    </div>
  );
}

export default RequestSkhera;
