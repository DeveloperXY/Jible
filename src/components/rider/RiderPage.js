import React, { useState } from "react";
import menuIcon from "./images/ic_menu.svg";
import notificationIcon from "./images/ic_notifications.svg";
import { saveUserRemotely } from "../../redux/actions/userActions";
import "./riderPage.css";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import RiderProfileInfo from "./RiderProfileInfo";
import DrawerLayout from "./drawer/DrawerLayout";

function RiderPage({ currentUser, saveUserRemotely }) {
  const [user, setUser] = useState({ ...currentUser });
  const [isNotificationVisible, setNotificationVisibility] = useState(false);
  const [isDrawerOpen, setDrawerOpenState] = useState(false);

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

  function toggleNotificationsVisibility() {
    setNotificationVisibility(!isNotificationVisible);
  }

  function toggleDrawerOpenState() {
    setDrawerOpenState(!isDrawerOpen);
  }

  function closeDrawer() {
    setDrawerOpenState(false);
  }

  return (
    <div className="profile-wrapper">
      <div className="app-header">
        <div className="app-header-text">Jible</div>
        <div className="header-icons">
          <img
            src={notificationIcon}
            alt=""
            className="notification-icon"
            onClick={toggleNotificationsVisibility}
          />
          <img src={menuIcon} alt="" onClick={toggleDrawerOpenState} />
        </div>
      </div>
      <div
        className="notification-body"
        style={{ display: isNotificationVisible ? "flex" : "none" }}
      >
        <div className="notification-header">
          <div>New assignment</div>
          <div>2:45 min</div>
        </div>
        <input type="button" className="green-btn accept-btn" value="Accept" />
        <input type="button" className="green-btn grey-btn" value="Decline" />
      </div>
      <div className="main-fragment">
        <RiderProfileInfo
          user={currentUser}
          handleChange={handleChange}
          handleSave={handleSave}
        />
      </div>

      <DrawerLayout isOpen={isDrawerOpen} closeDrawer={closeDrawer} />
    </div>
  );
}

const mapDispatchToProps = {
  saveUserRemotely
};

export default connect(
  null,
  mapDispatchToProps
)(RiderPage);
