import React from "react";
import "./requestSkheraDetails.css";
import icPlus from "../../../images/ic_plus.svg";

function RequestSkheraDetails(props) {
  return (
    <div className="request-details">
      <label className="form-label" htmlFor="description">
        Describe your skhera
      </label>
      <textarea
        id="description"
        name="description"
        rows="2"
        placeholder="Text here"
      />
      <label className="form-label" htmlFor="item">
        Describe your skhera
      </label>
      <div className="input-with-icon">
        <input
          id="item"
          name="item"
          className="itemInput"
          type="text"
          placeholder="Item"
        />
        <img className="icPlus" src={icPlus} alt="" />
      </div>
      <ul className="skhera-ul"></ul>
      <div className="time-layout">
        <div className="asap-layout">
          <label className="form-label">Describe your skhera</label>
          <div className="input-two-icons">
            <div>ASAP</div>
          </div>
        </div>
        <div className="schedule-layout">
          <label className="form-label">Describe your skhera</label>
          <div className="input-two-icons">
            <div>Schedule</div>
          </div>
        </div>
      </div>

      <label className="form-label" htmlFor="price">
        Describe your skhera
      </label>
      <input
        id="price"
        name="price"
        className="itemInput"
        type="text"
        placeholder="Price"
      />

      <input type="button" className="order-btn" value="Order Now" />
    </div>
  );
}

export default RequestSkheraDetails;
