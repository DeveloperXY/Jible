import React, { useState, useEffect, useRef } from "react";
import "./requestSkheraMap.css";
import SimpleMap from "./SimpleMap";
import AutoCompleteInput from "./AutoCompleteInput";
import * as placesApi from "../../../api/placesApi";

function RequestSkheraMap({ onFromAddrChange, onToAddrChange }) {
  const [fromAddressText, setFromAddressText] = useState("");
  const [toAddressText, setToAddressText] = useState("");
  const [mapZoom, setMapZoom] = useState(6);
  const [latelyChangedAddress, setLatelyChangedAddress] = useState(undefined);
  const [fromAddress, setFromAddress] = useState({});
  const [toAddress, setToAddress] = useState({});
  const [googleMap, setGoogleMap] = useState({});
  const [polyline, setPolyline] = useState(undefined);
  const isFirstRun = useRef(true);
  const isFirstRun2 = useRef(true);

  const onFromChange = (event, { newValue }) => {
    setFromAddressText(newValue);
  };

  const onToChange = (event, { newValue }) => {
    setToAddressText(newValue);
  };

  const fromInputProps = {
    value: fromAddressText,
    onChange: onFromChange
  };

  const toInputProps = {
    value: toAddressText,
    onChange: onToChange
  };

  useEffect(() => {
    if (isFirstRun2.current) {
      isFirstRun2.current = false;
      return;
    }

    polyline.setMap(googleMap);
  }, [polyline]);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    if (fromAddress == {} || toAddress == {}) return;

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

        // Hide any previously displayed polylines
        if (polyline !== undefined) polyline.setMap(null);

        setPolyline(
          new window.google.maps.Polyline({
            path: steps,
            geodesic: true,
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 1
          })
        );
      });
  }, [toAddress, fromAddress]);

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
      const from = { ...address, ...geometry };
      setFromAddress(from);
      onFromAddrChange(from);
      setLatelyChangedAddress(geometry);
      setMapZoom(15);
    });
  };

  const onToAddressSelected = (event, { suggestion: address }) => {
    placesApi.fetchPlaceGeometry(address.placeId, googleMap).then(geometry => {
      geometry = {
        lat: geometry.lat(),
        lng: geometry.lng()
      };
      const to = { ...address, ...geometry };
      setToAddress(to);
      onToAddrChange(to);
      setLatelyChangedAddress(geometry);
      setMapZoom(15);
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
          className="from-wrapper"
          placeholder="Where to pick the Skhera from"
          getSuggestions={getAddressSuggestions}
          onSuggestionSelected={onFromAddressSelected}
          inputProps={fromInputProps}
        />
      </div>
      <div className="input-inline-label">
        <label className="inline-label" htmlFor="toAddress">
          To
        </label>
        <AutoCompleteInput
          id="toAddress"
          name="toAddress"
          className="to-wrapper"
          placeholder="Where to deliver"
          getSuggestions={getAddressSuggestions}
          onSuggestionSelected={onToAddressSelected}
          inputProps={toInputProps}
        />
      </div>
      <SimpleMap
        fromAddress={fromAddress}
        toAddress={toAddress}
        onGoogleMapReady={onGoogleMapReady}
        mapRef={setGoogleMap}
        center={latelyChangedAddress}
        zoom={mapZoom}
      />
    </div>
  );
}

export default RequestSkheraMap;
