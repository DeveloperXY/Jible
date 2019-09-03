import React from "react";
import PropTypes from "prop-types";

const ProfileInfoForm = ({ user, onSave, onChange }) => {
  return (
    <form className="profile-info-form" onSubmit={onSave}>
      <label className="form-label" htmlFor="fullname">
        Full name
      </label>
      <input type="text" id="fullname" value={user.name} onChange={onChange} />
      <label className="form-label email-label" htmlFor="email">
        Email
      </label>
      <input type="text" id="email" value={user.email} onChange={onChange} />
      <label className="form-label phone-label" htmlFor="phone">
        Phone
      </label>
      <input type="text" id="phone" value={user.phone} onChange={onChange} />
      <input type="button" className="update-btn" value="Update" />
    </form>
  );
};

export default ProfileInfoForm;
