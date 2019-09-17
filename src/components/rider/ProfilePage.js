import React, { useState } from "react";
import menuIcon from "./images/ic_menu.svg";
import notificationIcon from "./images/ic_notifications.svg";
import { saveUserRemotely } from "../../redux/actions/userActions";
import "./profilePage.css";
import { connect } from "react-redux";
import ProfileInfoForm from "../profile/ProfileInfoForm";
import { toast } from "react-toastify";

function RiderProfilePage({ currentUser, saveUserRemotely }) {
  const [user, setUser] = useState({ ...currentUser });

  function handleChange(event) {
    const { name, value } = event.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  }

  function handleSave(event) {
    event.preventDefault();
    saveUserRemotely(user).then(() => {
      toast.success("Profile info updated.");
    });
  }

  return (
    <div className="profile-wrapper">
      <div className="app-header">
        <div className="app-header-text">Jible</div>
        <div className="header-icons">
          <img src={notificationIcon} alt="" className="notification-icon" />
          <img src={menuIcon} alt="" />
        </div>
      </div>
      <div className="notification-body">
        <div className="notification-header">
          <div>New assignment</div>
          <div>2:45 min</div>
        </div>
        <input type="button" className="green-btn accept-btn" value="Accept" />
        <input type="button" className="green-btn grey-btn" value="Decline" />
      </div>
      <div className="rider-profile-info">
        <img className="rider-profile-img" alt="" src={user.image} />
        <div className="rider-profile-info-sub-header">
          <div className="current-rider-username">{user.name}</div>
          <div className="phone-number">{user.phone}</div>
        </div>
      </div>
      <div className="profile-info-form-wrapper">
        <ProfileInfoForm
          user={user}
          onSave={handleSave}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  saveUserRemotely
};

export default connect(
  null,
  mapDispatchToProps
)(RiderProfilePage);
