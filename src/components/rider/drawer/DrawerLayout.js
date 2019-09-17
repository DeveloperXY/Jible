import React, { useState } from "react";
import "./drawerLayout.css";
import closeIcon from "../images/ic_close.svg";
import ToggleButton from "react-toggle-button";

export const DrawerLayout = props => {
  const [availability, setAvailability] = useState(false);

  return (
    <div className="drawer-container">
      <img src={closeIcon} alt="" className="close-icon" />
      <div className="drawer-header">
        <img className="drawer-profile-img" alt="" />
        <div className="drawer-username">Mohammed Aouf Zouag</div>
      </div>
      <div className="drawer-menu-items">
        <ul className="menu-items-list">
          <li className="drawer-menu-item drawer-menu-item-selected">
            Skheras TODO
          </li>
          <li className="drawer-menu-item">My Profile</li>
          <li className="drawer-menu-item">Statistics</li>
          <li className="drawer-menu-item">FAQ</li>
        </ul>
      </div>
      <div className="availability-container">
        <div className="availability-label">Availability</div>
        <ToggleButton value={availability} onToggle={value => {
            setAvailability(!value)
        }} />
      </div>
    </div>
  );
};
