import React from "react";
import "./mySkhera.css";
import SimpleMap from "../request/map/SimpleMap";

function MySkhera() {
  return (
    <div className="my-skheras">
      <div className="my-skheras-header">
        <div className="skhera-count">Skhera #</div>
        <div className="shared-skhera">Shared shkera</div>
      </div>
      <div className="status-tracker">
        <div className="textual-status">
          <div className="status-item status-item-selected">
            Order Received
            <br />
            <span className="mini-status mini-status-selected">
              Message/Call
            </span>
          </div>
          <div className="status-item">
            On the way
            <br />
            <span className="mini-status">tracking</span>
          </div>
          <div className="status-item">
            Delivered
            <br />
            <span className="mini-status">Rate</span>
          </div>
        </div>
        <div className="drawn-status"></div>
        <SimpleMap className="skhera-tracker-map" zoom={15} />
        <div className="my-skhera-details">
          <div className="my-skhera-text-details">
            <div className="my-skhera-date carved">02 Mar 2019, 10:30am</div>
            <div className="my-skhera-price carved">Price: 100dh - 200dh</div>
            <div className="my-skhera-address carved">
              3416 Tenmile Road, Waltham, Massachusetts, 3rd floor
            </div>
            <div className="my-skhera-description">
              I need you to go to the super market and bring me this stuff
              quickly:
            </div>
            <ul>
              <li>2Kg potatoes</li>
              <li>1L Milk</li>
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
            <div className="estimated-price-value">120dh</div>
            <div className="estimated-time-distance-value">~25min / 5km</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MySkhera;
