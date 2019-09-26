import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import currentLocationIndicator from "../images/current_location.png";
import "./riderSkheras.css";
import { connect } from "react-redux";

function RiderSkheras(props) {
  const [googleMap, setGoogleMap] = useState(undefined);
  const { height, width, location, riderItinerary } = props;

  return (
    <div className="skheras-container">
      <div className="skheras-itinerary">
        <div
          className="shapes-line-connector"
          style={{ display: riderItinerary.length > 0 ? "block" : "none" }}
        ></div>
        {riderItinerary.map((point, index) => {
          const shapeNumber = index < 2 ? 1 : 2;
          const pointType = point.type === "pick-up" ? "pickup" : "drop-off";
          return (
            <div className="stop-address">
              <div className="stop-address-shape-wrapper">
                <div
                  className={`${pointType}-address-shape-${shapeNumber}`}
                ></div>
              </div>
              <div className={`${pointType}-address-text`}>{point.name}</div>
            </div>
          );
        })}
      </div>
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
          {location !== undefined && (
            <img
              lat={location.lat}
              lng={location.lng}
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

const mapStateToProps = ({ riderItinerary }) => ({
  riderItinerary
});

export default connect(mapStateToProps)(RiderSkheras);
