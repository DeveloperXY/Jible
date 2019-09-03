import React, { useState } from "react";
import PropTypes from "prop-types";
import "./profilePage.css";
import icEdit from "../../images/ic_edit.svg";
import { connect } from "react-redux";
import ProfileInfoForm from "./ProfileInfoForm";
import { saveUserRemotely } from "../../redux/actions/userActions";
import { toast } from "react-toastify";
import RequestSkhera from "../request/RequestSkhera";

function HomePage({ currentUser, saveUserRemotely }) {
  const [user, setUser] = useState({ ...currentUser });
  const [isRequestSkheraSelected, setIsRequestSkheraSelected] = useState(false);

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

  function onRequestSkhera() {
    setIsRequestSkheraSelected(true);
  }

  return (
    <>
      <div className="main-content">
        <div className="header-content">
          <span className="jible-header">Jible</span>
          <div className="profile-header-section">
            <img className="profile-img" alt="" src={currentUser.image} />
            <div className="current-username">{currentUser.name}</div>
          </div>
        </div>
        <div className="body-content">
          {isRequestSkheraSelected ? (
            <RequestSkhera />
          ) : (
            <>
              <div className="options-menu page-section">
                <div className="options-menu-item">My Skhera</div>
                <div className="options-menu-item options-menu-item-selected">
                  My Profile
                </div>
                <div className="options-menu-item">My Address</div>
                <div className="options-menu-item">FAQ</div>
              </div>
              <div className="profile-info page-section">
                <div className="profile-info-header">
                  <img className="profile-img" alt="" src={currentUser.image} />
                  <div className="profile-info-sub-header">
                    <div className="current-username">{currentUser.name}</div>
                    <div className="phone-number"></div>
                  </div>
                </div>
                <ProfileInfoForm
                  user={currentUser}
                  onSave={handleSave}
                  onChange={handleChange}
                />
              </div>
              <div
                className="request-skhera page-section"
                onClick={onRequestSkhera}
              >
                <img className="edit-icon" alt="" src={icEdit} />
                <div className="request-shera-text">Request Skhera</div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

const mapStateToProps = state => {
  const { currentUser } = state;
  return {
    currentUser
  };
};

const mapDispatchToProps = {
  saveUserRemotely
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
