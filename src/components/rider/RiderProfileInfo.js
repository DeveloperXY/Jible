import React from "react";
import ProfileInfoForm from "../profile/ProfileInfoForm";

function RiderProfileInfo({ user, handleSave, handleChange }) {
  return (
    <div className="rider-info-container">
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

export default RiderProfileInfo;
