import React from "react";
import PropTypes from "prop-types";
import "./profilePage.css";
import icEdit from "../../images/ic_edit.svg";

function HomePage(props) {
  return (
    <>
      <div className="main-content">
        <div className="header-content">
          <span className="jible-header">Jible</span>
          <div className="profile-header-section">
            <img
              className="profile-img"
              alt=""
              src="https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=3169461236427372&height=50&width=50&ext=1570012181&hash=AeQE3rSapk4Hcq5K"
            />
            <div className="current-username">Mohammed Aouf Zouag</div>
          </div>
        </div>
        <div className="body-content">
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
              <img
                className="profile-img"
                alt=""
                src="https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=3169461236427372&height=50&width=50&ext=1570012181&hash=AeQE3rSapk4Hcq5K"
              />
              <div className="profile-info-sub-header">
                <div className="current-username">Mohammed Aouf Zouag</div>
                <div className="phone-number">+212694363053</div>
              </div>
            </div>
            <form className="profile-info-form">
              <label className="form-label" for="fullname">
                Full name
              </label>
              <input type="text" id="fullname" value="Mohammed Aouf Zouag" />
              <label className="form-label email-label" for="email">
                Email
              </label>
              <input type="text" id="email" value="m.a.zouag@gmail.com" />
              <label className="form-label phone-label" for="phone">
                Phone
              </label>
              <input type="text" id="phone" value="+212694363053" />
              <input type="button" className="update-btn" value="Update" />
            </form>
          </div>
          <div className="request-skhera page-section">
            <img className="edit-icon" alt="" src={icEdit} />
            <div className="request-shera-text">Request Skhera</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
