import React, { useState } from "react";
import "./requestSkheraDetails.css";
import icPlus from "../../../images/ic_plus.svg";
import icArchive from "../../../images/ic_archive.svg";
import icClock from "../../../images/ic_clock.svg";
import icCheck from "../../../images/ic_check.svg";
import icSchedule from "../../../images/ic_calendar.svg";
import icDollar from "../../../images/ic_dollar.svg";
import fileTextIcon from "../../../images/ic_file_text.svg";

function RequestSkheraDetails({ onOrderNow }) {
  const [skheraItems, setSkheraItems] = useState([]);
  const [skheraItem, setSkheraItem] = useState("");
  const [description, setDescription] = useState(undefined);
  const [price, setPrice] = useState(undefined);

  const handleChange = event => {
    setSkheraItem(event.target.value);
  };

  const handleDescriptionChange = event => {
    setDescription(event.target.value);
  };

  const handlePriceChange = event => {
    setPrice(event.target.value);
  };

  const addSkheraItem = () => {
    if (skheraItem !== "") {
      setSkheraItems([...skheraItems, skheraItem]);
      setSkheraItem("");
    }
  };

  const onAddSkheraItem = () => {
    addSkheraItem();
  };

  const onRemoveItem = index => {
    skheraItems.splice(index, 1);
    setSkheraItems([...skheraItems]);
  };

  const handleKeyUp = e => {
    if (e.key === "Enter") addSkheraItem();
  };

  const orderSkhera = () => {
    onOrderNow(description, skheraItems, price);
  };

  return (
    <div className="request-details">
      <label className="form-label" htmlFor="description">
        Describe your skhera
      </label>
      <div className="input-wrapper description-wrapper">
        <img
          src={fileTextIcon}
          alt=""
          className="field-icon textarea-field-icon"
        />
        <textarea
          id="description"
          name="description"
          rows="5"
          onChange={handleDescriptionChange}
          value={description}
          placeholder="Text here"
        />
      </div>
      <label className="form-label" htmlFor="item">
        What items do you want
      </label>
      <div className="input-wrapper">
        <img className="icArchive field-icon" src={icArchive} alt="" />
        <input
          id="item"
          name="item"
          className="itemInput"
          type="text"
          placeholder="New item"
          value={skheraItem}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
        />
        <img className="icPlus" src={icPlus} alt="" onClick={onAddSkheraItem} />
      </div>
      <ul className="skhera-ul">
        {skheraItems.map((item, index) => (
          <li
            className="skhera-item"
            key={index}
            onClick={() => onRemoveItem(index)}
          >
            {item}
          </li>
        ))}
      </ul>
      <div className="time-layout">
        <div className="asap-layout">
          <label className="form-label">In a hurry ?</label>
          <div className="input-wrapper time-schedule-wrapper">
            <img className="icClock field-icon" src={icClock} alt="" />
            <div className="asap-text">ASAP</div>
            <img className="icCheck field-icon" src={icCheck} alt="" />
          </div>
        </div>
        <div className="schedule-layout">
          <label className="form-label">Get it later</label>
          <div className="input-wrapper time-schedule-wrapper">
            <img className="icSchedule field-icon" src={icSchedule} alt="" />
            <div className="asap-text">Schedule</div>
            {/* <img className="icCheck field-icon" src={icCheck} alt="" /> */}
          </div>
        </div>
      </div>

      <label className="form-label price-estimation" htmlFor="price">
        Enter the estimated price of this skhera
      </label>
      <div className="input-wrapper">
        <img className="icDollar field-icon" src={icDollar} alt="" />
        <input
          id="price"
          name="price"
          className="itemInput"
          type="text"
          onChange={handlePriceChange}
          value={price}
          placeholder="Price goes here"
        />
      </div>

      <input
        type="button"
        className="order-btn"
        value="Order Now"
        onClick={orderSkhera}
      />
    </div>
  );
}

export default RequestSkheraDetails;
