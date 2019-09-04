import React from "react";
import "./requestSkheraMap.css";
import SimpleMap from "./SimpleMap";
import AutoCompleteInput from "./AutoCompleteInput";

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
        <AutoCompleteInput
          id="fromAddress"
          name="fromAddress"
          placeholder="Where to pick the Skhera from"
        />
      </div>
      <div className="input-inline-label">
        <label className="inline-label" htmlFor="toAddress">
          To
        </label>
        <AutoCompleteInput
          id="toAddress"
          name="toAddress"
          placeholder="Where to deliver"
        />
      </div>
      <SimpleMap />
    </div>
  );
}

export default RequestSkheraMap;
