import React, { useState } from "react";
import "./requestSkheraMap.css";
import SimpleMap from "./SimpleMap";
import AutoCompleteInput from "./AutoCompleteInput";
import * as placesApi from "../../../api/placesApi";

function RequestSkheraMap(props) {
  const [fromAddress, setFromAddress] = useState({});
  const [toAddress, setToAddress] = useState({});

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

  const onFromAddressSelected = (event, { address }) => {
    setFromAddress(address);
  };

  const onToAddressSelected = (event, { address }) => {
    setToAddress(address);
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
          onSuggestionSelected={onFromAddressSelected}
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
          onSuggestionSelected={onToAddressSelected}
        />
      </div>
      <SimpleMap />
    </div>
  );
}

export default RequestSkheraMap;
