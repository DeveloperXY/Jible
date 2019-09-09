import React from "react";
import ProfileInfoForm from "../ProfileInfoForm";
import icEdit from "../../../images/ic_edit.svg";
import { Link } from "react-router-dom";

function EditProfileComponent({
  currentUser,
  handleChange,
  handleSave,
  history
}) {
  function onRequestSkhera() {
    history.push("/profile/request");
  }

  return (
    <>
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
      <div className="request-skhera page-section" onClick={onRequestSkhera}>
        <img className="edit-icon" alt="" src={icEdit} />
        <Link to="/profile/request" className="request-shera-text">
          Request Skhera
        </Link>
      </div>
    </>
  );
}

export default EditProfileComponent;
