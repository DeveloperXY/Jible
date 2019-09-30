import React from "react";
import userIcon from "../../images/ic_user.svg";
import mailIcon from "../../images/ic_mail.svg";
import phoneIcon from "../../images/ic_phone.svg";
import "./profileInfoForm.css";

const ProfileInfoForm = ({ user, onSave, onChange }) => {
  return (
    <form className="profile-info-form" onSubmit={onSave}>
      <label className="form-label" htmlFor="fullname">
        Full name
      </label>
      <div className="input-wrapper">
        <img src={userIcon} alt="" className="field-icon" />
        <input
          type="text"
          name="fullname"
          value={user.name}
          onChange={onChange}
        />
      </div>
      <label className="form-label email-label" htmlFor="email">
        Email
      </label>
      <div className="input-wrapper">
        <img src={mailIcon} alt="" className="field-icon" />
        <input
          type="text"
          name="email"
          value={user.email}
          onChange={onChange}
        />
      </div>
      <label className="form-label phone-label" htmlFor="phone">
        Phone
      </label>
      <div className="input-wrapper">
        <img src={phoneIcon} alt="" className="field-icon" />
        <input
          type="text"
          name="phone"
          value={user.phone}
          onChange={onChange}
        />
      </div>
      <input type="submit" className="update-btn" value="Update" />
    </form>
  );
};

export default ProfileInfoForm;
