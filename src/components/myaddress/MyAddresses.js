import React, { useState } from "react";
import RequestSkheraButton from "../RequestSkheraButton";
import "./myAddresses.css";
import AutoCompleteInput from "../request/map/AutoCompleteInput";
import * as placesApi from "../../api/placesApi";
import * as addressApi from "../../api/addressApi";
import SimpleMap from "../request/map/SimpleMap";
import deleteIcon from "../../images/ic_delete.svg";
import MapPin from "../request/map/marker/MapPin";
import mapPin from "../../images/map_pin.svg";

function MyAddresses({ history }) {
  const [googleMap, setGoogleMap] = useState({});
  const [value, setValue] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(undefined);
  const [addresses, setAddresses] = useState([]);

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const inputProps = {
    value,
    onChange
  };

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

  const handleAddressSelected = (event, { suggestion: address }) => {
    placesApi.fetchPlaceGeometry(address.placeId, googleMap).then(geometry => {
      geometry = {
        lat: geometry.lat(),
        lng: geometry.lng()
      };
      setSelectedAddress({ ...address, ...geometry });
    });
  };

  const clearAddress = () => {
    setValue("");
  };

  const saveAddress = () => {
    console.log(selectedAddress);
    if (selectedAddress !== undefined) {
      addressApi.saveAddress(selectedAddress).then(data => {
        if (data.status === "ok") {
          clearAddress();
          setAddresses([...addresses, selectedAddress]);
        } else console.log("not ok");
      });
    }
  };

  return (
    <div className="profile-container">
      <div className="addresses-view page-section">
        <div className="new-address">
          <div className="new-address-label form-label">Add a new address</div>
          <AutoCompleteInput
            getSuggestions={getAddressSuggestions}
            onSuggestionSelected={handleAddressSelected}
            inputProps={inputProps}
          />
          <input
            type="button"
            className="add-address-btn"
            value="Add"
            onClick={saveAddress}
          />
          <SimpleMap width="0px" height="0px" mapRef={setGoogleMap} />
          {addresses.map((a, index) => (
            <div className="user-address">
              <div className="user-address-label form-label">
                Address #{index + 1}
              </div>
              <div className="user-address-wrapper">
                <div className="user-address-view">
                  <img className="location-icon" src={mapPin} alt="" />
                  <div className="user-address-text">{a.name}</div>
                  <img className="delete-icon" src={deleteIcon} alt="" />
                </div>
              </div>
              <SimpleMap
                className="user-address-map"
                width="100%"
                height="150px"
                center={{ lat: a.lat, lng: a.lng }}
                zoom={15}
                centerMarker={<MapPin lat={a.lat} lng={a.lng} />}
              />
            </div>
          ))}
        </div>
      </div>
      <RequestSkheraButton history={history} />
    </div>
  );
}

export default MyAddresses;
