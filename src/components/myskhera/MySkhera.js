import React, { useEffect, useState } from "react";
import "./mySkhera.css";
import { fetchSkheras } from "../../api/skheraApi";
import { connect } from "react-redux";
import GoogleMapReact from "google-map-react";
import icPickUp from "../../images/ic_pickup.svg";
import icDropOff from "../../images/ic_drop_off.svg";
import ScooterImg from "../../images/ic_scooter.svg";
import { fetchRouteSegmentsByCoords } from "../../api/placesApi";
import mapPin from "../../images/map_pin.svg";
import icPhone from "../../images/ic_phone.svg";

function MySkhera({ currentUser }) {
  const [skheras, setSkheras] = useState([]);
  useEffect(() => {
    fetchSkheras(currentUser._id).then(setSkheras);
  }, []);

  return (
    <div className="my-skheras-container">
      {skheras.map((skhera, index) => (
        <div className="my-skheras">
          <div className="my-skheras-header">
            <div className="skhera-count">Skhera #{index + 1}</div>
            {/* <div className="shared-skhera">Shared shkera</div> */}
          </div>
          <div className="status-tracker">
            <div className="textual-status">
              <div
                className={
                  "status-item " +
                  (skhera.status === "ORDER_RECEIVED"
                    ? "status-item-selected"
                    : "")
                }
              >
                Order Received
                <br />
                <span
                  className={
                    "mini-status " +
                    (skhera.status === "ORDER_RECEIVED"
                      ? "mini-status-selected"
                      : "")
                  }
                >
                  Message/Call
                </span>
                <div
                  className={
                    "dot status-dot " +
                    (skhera.status === "ORDER_RECEIVED"
                      ? "status-dot-selected"
                      : "")
                  }
                ></div>
              </div>
              <div
                className={
                  "status-item " +
                  (skhera.status === "ON_THE_WAY" ||
                  skhera.status === "ORDER_PICKED_UP"
                    ? "status-item-selected"
                    : "")
                }
              >
                On the way
                <br />
                <span
                  className={
                    "mini-status " +
                    (skhera.status === "ON_THE_WAY" ||
                    skhera.status === "ORDER_PICKED_UP"
                      ? "mini-status-selected"
                      : "")
                  }
                >
                  tracking
                </span>
                <div
                  className={
                    "dot status-dot " +
                    (skhera.status === "ORDER_PICKED_UP" ||
                    skhera.status === "ON_THE_WAY"
                      ? "status-dot-selected"
                      : "")
                  }
                ></div>
              </div>
              <div
                className={
                  "status-item " +
                  (skhera.status === "ORDER_DELIVERED"
                    ? "status-item-selected"
                    : "")
                }
              >
                Delivered
                <br />
                <span
                  className={
                    "mini-status " +
                    (skhera.status === "ORDER_DELIVERED"
                      ? "mini-status-selected"
                      : "")
                  }
                >
                  Rate
                </span>
                <div
                  className={
                    "dot status-dot " +
                    (skhera.status === "ORDER_DELIVERED"
                      ? "status-dot-selected"
                      : "")
                  }
                ></div>
              </div>
            </div>
            <div className="status-dots-connector"></div>
            <div
              className="client-map"
              style={{ height: "400px", width: "100%" }}
            >
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: "AIzaSyDd3dI_tqR6Rx-IMpS9r5mWCP5oAEibiE0"
                }}
                defaultCenter={{
                  lat: 33.589886,
                  lng: -7.603869
                }}
                defaultZoom={10}
                zoom={15}
                onGoogleApiLoaded={({ map, maps }) => {
                  const bounds = new window.google.maps.LatLngBounds();
                  const from = {
                    lat: parseFloat(skhera.fromAddress.lat),
                    lng: parseFloat(skhera.fromAddress.lng)
                  };
                  const to = {
                    lat: parseFloat(skhera.toAddress.lat),
                    lng: parseFloat(skhera.toAddress.lng)
                  };
                  bounds.extend(from);
                  bounds.extend(to);
                  map.fitBounds(bounds);

                  fetchRouteSegmentsByCoords(from, to).then(data => {
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

                    new window.google.maps.Polyline({
                      path: steps,
                      geodesic: true,
                      strokeColor: "#000000",
                      strokeOpacity: 1.0,
                      strokeWeight: 2,
                      map
                    });
                  });
                }}
              >
                <img
                  src={icPickUp}
                  alt=""
                  lat={skhera.fromAddress.lat}
                  lng={skhera.fromAddress.lng}
                />
                <img
                  src={icDropOff}
                  alt=""
                  lat={skhera.toAddress.lat}
                  lng={skhera.toAddress.lng}
                />
                <img
                  src={ScooterImg}
                  alt=""
                  lat={skhera.currentRiderLocation.lat}
                  lng={skhera.currentRiderLocation.lng}
                />
              </GoogleMapReact>
            </div>
            <div className="my-skhera-details">
              <div className="my-skhera-text-details">
                <div className="my-skhera-date carved">{skhera.date}</div>
                <div className="my-skhera-price carved">
                  Price: {skhera.price}
                </div>
                <div className="my-skhera-address carved">
                  <img src={mapPin} alt="" />
                  <div style={{ marginLeft: "8px" }}>
                    {skhera.toAddress.name}
                  </div>
                </div>
                <div className="my-skhera-description">
                  {skhera.description}
                </div>
                <ul>
                  {skhera.items.map(item => (
                    <li>{item.name}</li>
                  ))}
                </ul>
              </div>
              <div className="my-skhera-rider-details">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={skhera.riderId.image}
                    alt=""
                    className="rider-profile-img"
                  />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ fontWeight: "bold", fontSize: "16px" }}>
                      {skhera.riderId.name}
                    </div>
                    <div style={{ color: "#909090", fontSize: "16px" }}>
                      {skhera.riderId.phone}
                    </div>
                  </div>
                </div>
                <img
                  src={icPhone}
                  alt=""
                  style={{
                    minWidth: "24px",
                    minHeight: "24px",
                    marginRight: "8px"
                  }}
                />
              </div>
            </div>
            <div className="my-skhera-price-est">
              <div className="estimated-price-labels">
                <div className="estimated-price">Estimated Price</div>
                <div className="estimated-time-distance">
                  Estimated time and distance
                </div>
              </div>
              <div className="estimated-values">
                <div className="estimated-price-value">N/A</div>
                <div className="estimated-time-distance-value">
                  {skhera.timeAndDistance}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = state => {
  const { currentUser } = state;
  return {
    currentUser
  };
};

export default connect(mapStateToProps)(MySkhera);
