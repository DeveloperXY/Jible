import React from "react";
import "./requestSkheraMap.css";

function RequestSkheraMap(props) {
  return (
    <div className="request-map">
      <label className="form-label" htmlFor="address">
        Address
      </label>
      <div className="input-inline-label">
        <label className="inline-label" htmlFor="fromAddress">
          From
        </label>
        <input
          type="text"
          id="fromAddress"
          name="fromAddress"
          placeholder="Where to pick the Skhera from"
        />
      </div>
      <div className="input-inline-label">
        <label className="inline-label" htmlFor="toAddress">
          To
        </label>
        <input
          type="text"
          id="toAddress"
          name="toAddress"
          placeholder="Where to deliver"
        />
      </div>
    </div>
  );
}

export default RequestSkheraMap;
