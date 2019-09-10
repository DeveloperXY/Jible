import React, { useState } from "react";
import "./requestSkheraDetails.css";
import icPlus from "../../../images/ic_plus.svg";

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
      <textarea
        id="description"
        name="description"
        onChange={handleDescriptionChange}
        value={description}
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
        onChange={handlePriceChange}
        value={price}
        placeholder="Price"
      />

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
