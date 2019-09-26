import React from "react";
import "./skheraDetails.css";
import callIcon from "../images/ic_call.svg";

function SkheraDetails({
  match: {
    params: { skheraId }
  }
}) {
  return (
    <div className="skhera-details-container">
      <div className="skhera-details-header">
        <div className="skhera-counter">Skhera 1</div>
        <div className="skhera-info">
          02 Mar 2019, 10:30am
          <br />
          Price: 100dh-200dh
        </div>
      </div>
      <div className="client-contact-details">
        <div className="client-personal-info">
          <img
            className="client-profile-img"
            alt=""
            src="https://cdn.arstechnica.net/wp-content/uploads/2016/02/5718897981_10faa45ac3_b-640x624.jpg"
          />
          <div className="client-textual-info">
            <div className="client-name">Mohammed Aouf Zouag</div>
            <div className="client-phone-number">+212694363053</div>
          </div>
        </div>
        <img src={callIcon} alt="" />
      </div>
      <div className="skhera-description">
        I need you to go to the supermarket and get this quickly
      </div>
      <div className="skhera-items-checklist">
        <div className="skhera-items-checklist-item">
          <div className="list-item-name">1L Milk</div>
          <input type="checkbox" />
        </div>
        <div className="skhera-items-checklist-item">
          <div className="list-item-name">1L Milk</div>
          <input type="checkbox" />
        </div>
      </div>
      <div className="price-container">
        <div className="skhera-price-label">Price</div>
        <div className="skhera-price-value">120dh</div>
      </div>
      <div className="skhera-time-distance">
        <div className="skhera-time-distance-label">Time and Distance</div>
        <div className="skhera-time-distance-value">~25min / 5km</div>
      </div>
      <input
        type="button"
        className="green-btn picked-up-btn"
        value="Picked up"
      />
      <input
        type="button"
        className="green-btn delivered-btn"
        value="Delivered"
      />
    </div>
  );
}

export default SkheraDetails;
