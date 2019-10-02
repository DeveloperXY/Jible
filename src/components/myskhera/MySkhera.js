import React, { useEffect, useState } from "react";
import "./mySkhera.css";
import SimpleMap from "../request/map/SimpleMap";
import { fetchSkheras } from "../../api/skheraApi";
import { connect } from "react-redux";

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
            <div className="shared-skhera">Shared shkera</div>
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
              </div>
            </div>
            <div className="drawn-status"></div>
            <SimpleMap className="skhera-tracker-map" zoom={15} />
            <div className="my-skhera-details">
              <div className="my-skhera-text-details">
                <div className="my-skhera-date carved">{skhera.date}</div>
                <div className="my-skhera-price carved">
                  Price: {skhera.price}
                </div>
                <div className="my-skhera-address carved">
                  {skhera.toAddress.name}
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
              <div className="my-skhera-rider-details"></div>
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
