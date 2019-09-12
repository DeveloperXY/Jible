import React from "react";
import ProfileInfoForm from "../ProfileInfoForm";
import RequestSkheraButton from "../../RequestSkheraButton";

function EditProfileComponent({
  currentUser,
  handleChange,
  handleSave,
  history
}) {
  return (
    <div className="profile-container">
      <div className="profile-info page-section">
        <div className="profile-info-header">
          <img className="profile-img" alt="" src={currentUser.image} />
          <div className="profile-info-sub-header">
            <div className="current-username">{currentUser.name}</div>
            <div className="phone-number">{currentUser.phone}</div>
          </div>
        </div>
        <ProfileInfoForm
          user={currentUser}
          onSave={handleSave}
          onChange={handleChange}
        />
      </div>
      <RequestSkheraButton history={history} />
    </div>
  );
}

export default EditProfileComponent;
