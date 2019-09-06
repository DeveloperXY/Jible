import React, { useState, useEffect, useRef } from "react";
import "./requestSkheraMap.css";
import SimpleMap from "./SimpleMap";
import AutoCompleteInput from "./AutoCompleteInput";
import * as placesApi from "../../../api/placesApi";

function RequestSkheraMap(props) {
  const [fromAddress, setFromAddress] = useState({});
  const [toAddress, setToAddress] = useState({});
  const [googleMap, setGoogleMap] = useState({});
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    placesApi
      .fetchRouteSegments(fromAddress.placeId, toAddress.placeId)
      .then(segments => {
        const steps = segments
          .map(segment => {
            const s = {
              startLat: segment.start_location.lat(),
              endLat: segment.end_location.lat(),
              startLng: segment.start_location.lng(),
              endLng: segment.end_location.lng()
            };
            console.log(s);
            return s;
          })
          .reduce(
            (acc, s) => [
              ...acc,
              { lat: s.startLat, lng: s.startLng },
              { lat: s.endLat, lng: s.endLng }
            ],
            []
          );
        const path = new window.google.maps.Polyline({
          path: steps,
          geodesic: true,
          strokeColor: "#FF0000",
          strokeOpacity: 1.0,
          strokeWeight: 2
        });
        path.setMap(googleMap);
      });
  }, [toAddress]);

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

  const onFromAddressSelected = (event, { suggestion: address }) => {
    placesApi.fetchPlaceGeometry(address.placeId, googleMap).then(geometry => {
      geometry = {
        lat: geometry.lat(),
        lng: geometry.lng()
      };
      setFromAddress({ ...address, ...geometry });
    });
  };

  const onToAddressSelected = (event, { suggestion: address }) => {
    placesApi.fetchPlaceGeometry(address.placeId, googleMap).then(geometry => {
      geometry = {
        lat: geometry.lat(),
        lng: geometry.lng()
      };
      setToAddress({ ...address, ...geometry });
    });
  };

  const onGoogleMapReady = (map, maps) => {
    setGoogleMap(map);
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
      <SimpleMap
        fromAddress={fromAddress}
        toAddress={toAddress}
        onGoogleMapReady={onGoogleMapReady}
        mapRef={setGoogleMap}
      />
    </div>
  );
}

export default RequestSkheraMap;
