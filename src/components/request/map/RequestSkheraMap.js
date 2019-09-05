import React from "react";
import "./requestSkheraMap.css";
import SimpleMap from "./SimpleMap";
import AutoCompleteInput from "./AutoCompleteInput";
import * as placesApi from "../../../api/placesApi";

function RequestSkheraMap(props) {
  const getAddressSuggestions = (query, setSuggestions) => {
    const inputValue = query.trim().toLowerCase();
    const inputLength = inputValue.length;

    if (inputLength < 3) {
      setSuggestions([]);
      return;
    }

    placesApi.fetchAddressSuggestions(query).then(data => {
      setSuggestions(data);
    });
  };

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
          getSuggestions={getAddressSuggestions}
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
          getSuggestions={getAddressSuggestions}
        />
      </div>
      <SimpleMap />
    </div>
  );
}

export default RequestSkheraMap;
