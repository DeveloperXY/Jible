import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import currentLocationIndicator from "../images/current_location.png";
import * as placesApi from "../../../api/placesApi";
import "./riderSkheras.css";

function RiderSkheras(props) {
  const [googleMap, setGoogleMap] = useState(undefined);
  const [currentLocation, setCurrentLocation] = useState(undefined);
  const { height, width } = props;

  useEffect(() => {
    if (googleMap !== undefined) {
      placesApi
        .fetchCurrentLocation(window.navigator)
        .then(position => {
          setCurrentLocation(position);
        })
        .catch(error => console.log(error));
    }
  }, [googleMap]);

  return (
    <div className="skheras-container">
      <div className="skheras-itinerary"></div>
      <div className="rider-map" style={{ height, width }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDd3dI_tqR6Rx-IMpS9r5mWCP5oAEibiE0" }}
          defaultCenter={props.center}
          defaultZoom={props.zoom}
          center={props.center}
          zoom={props.zoom}
          onGoogleApiLoaded={({ map, _ }) => {
            setGoogleMap(map);
          }}
        >
          {currentLocation !== undefined && (
            <img
              lat={currentLocation.lat}
              lng={currentLocation.lng}
              className="current-location-indicator"
              src={currentLocationIndicator}
              alt=""
            />
          )}
        </GoogleMapReact>
      </div>
    </div>
  );
}

RiderSkheras.defaultProps = {
  height: "400px",
  width: "100%",
  center: {
    lat: 34.0220189,
    lng: -6.8282644
  },
  zoom: 11
};

export default RiderSkheras;
