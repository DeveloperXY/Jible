import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import currentLocationIndicator from "../images/current_location.png";
import "./riderSkheras.css";
import { connect } from "react-redux";
import { loadRiderItinerary } from "../../../redux/actions/skheraActions";
import { fetchRouteSegmentsByCoords } from "../../../api/placesApi";
import MapLocationIndicator from "../../MapLocationIndicator";

function RiderSkheras(props) {
  const {
    height,
    width,
    history,
    location,
    riderItinerary,
    currentUser,
    loadRiderItinerary
  } = props;
  const pickupColor = "#419D78";
  const dropOffColor = "#4A90E2";

  const [googleMap, setGoogleMap] = useState(undefined);
  const [polylines, setPolylines] = useState([]);
  const [itineraryCheckpoints, setItineraryCheckpoints] = useState([]);

  useEffect(() => {
    setInterval(() => {
      loadRiderItinerary(currentUser._id);
    }, 5000);
  }, []);

  useEffect(() => {
    const mapData = riderItinerary.mapData;
    if (mapData.length > 0) {
      // Hide any previously displayed polylines
      polylines.forEach(p => p.setMap(null));

      for (var i = 0; i < mapData.length && i + 1 < mapData.length; i++) {
        const index = i;
        const segmentStart = mapData[index];
        const segmentEnd = mapData[index + 1];
        fetchRouteSegmentsByCoords(segmentStart, segmentEnd).then(data => {
          const endType = segmentEnd.type;
          const polyColor =
            endType === "PICK_UP_POINT" ? pickupColor : dropOffColor;
          processSegments(data, index, polyColor);
        });
      }

      setItineraryCheckpoints(
        mapData
          .filter(e => e.type !== "STARTING_POINT")
          .map((e, index) => (
            <MapLocationIndicator
              type={e.type}
              first={index < 2}
              lat={e.lat}
              lng={e.lng}
            />
          ))
      );
    }
  }, [riderItinerary]);

  useEffect(() => {}, [polylines]);

  function processSegments(data, index, polyColor) {
    console.log("processing index: " + index);
    const segments = data.segments;

    const steps = segments
      .map(segment => ({
        startLat: segment.start_location.lat(),
        endLat: segment.end_location.lat(),
        startLng: segment.start_location.lng(),
        endLng: segment.end_location.lng()
      }))
      .reduce(
        (acc, s) => [
          ...acc,
          { lat: s.startLat, lng: s.startLng },
          { lat: s.endLat, lng: s.endLng }
        ],
        []
      );

    const polyline = new window.google.maps.Polyline({
      path: steps,
      geodesic: true,
      strokeColor: polyColor,
      strokeOpacity: 1.0,
      strokeWeight: 2,
      map: googleMap
    });

    setPolylines([...polylines, polyline]);
  }

  function onSkheraSelected(skheraId) {
    history.push(`/profile/skhera/${skheraId}`);
  }

  return (
    <div className="skheras-container">
      <div className="skheras-itinerary">
        <div
          className="shapes-line-connector"
          style={{
            display: riderItinerary.points.length > 0 ? "block" : "none"
          }}
        ></div>
        {riderItinerary.points.map((point, index) => {
          const skheraId = point.skheraId;
          const shapeNumber = point.type === "pick-up" ? 1 : 2;
          const pointType = point.type === "pick-up" ? "pickup" : "drop-off";
          const isActive = point.isActive;
          return (
            <div className="stop-address">
              <div className="stop-address-shape-wrapper">
                <div
                  className={`${pointType}-address-shape-${shapeNumber} ${
                    isActive ? "current-skhera" : ""
                  }`}
                ></div>
              </div>
              <div
                className={`${pointType}-address-text ${
                  isActive ? "current-skhera" : ""
                }`}
                onClick={() => onSkheraSelected(skheraId)}
              >
                {point.name}
              </div>
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
          {itineraryCheckpoints}
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

const mapStateToProps = ({ riderItinerary, currentUser }) => ({
  riderItinerary,
  currentUser
});

const mapDispatchToProps = {
  loadRiderItinerary
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RiderSkheras);
