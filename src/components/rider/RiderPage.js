import React, { useState, useEffect, useRef } from "react";
import menuIcon from "./images/ic_menu.svg";
import notificationIcon from "./images/ic_notifications.svg";
import { saveUserRemotely } from "../../redux/actions/userActions";
import "./riderPage.css";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Route, Switch } from "react-router-dom";
import RiderProfileInfo from "./RiderProfileInfo";
import DrawerLayout from "./drawer/DrawerLayout";
import FaqComponent from "../faq/FaqComponent";

function RiderPage({ currentUser, saveUserRemotely, history, socket }) {
  const [user, setUser] = useState({ ...currentUser });
  const [isNotificationVisible, setNotificationVisibility] = useState(false);
  const [isDrawerOpen, setDrawerOpenState] = useState(false);
  const [availability, setAvailability] = useState(false);
  const isFirstSocketCheck = useRef(true);
  const isFirstAvailabilityCheck = useRef(true);

  useEffect(() => {
    if (isFirstSocketCheck.current && socket !== undefined) {
      isFirstSocketCheck.current = false;
      socket.on("toggleAvailabilitySuccess", () => {
        toast.success("Availability updated.");
      });

      socket.on("toggleAvailabilityError", () => {
        toast.success("Availability update error.");
      });
    }
  }, [socket]);

  useEffect(() => {
    if (isFirstAvailabilityCheck.current)
      isFirstAvailabilityCheck.current = false;
    else {
      if (socket !== undefined)
        socket.emit("toggleAvailability", { availability });
    }
  }, [availability]);

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

  function navigateToSkherasTodo() {
    history.push("/skheras/todo");
  }

  function navigateToMyProfile() {
    history.push("/profile/details");
  }

  function navigateToStatistics() {
    history.push("/statistics");
  }

  function navigateToFaq() {
    history.push("/profile/faq");
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
        <Switch>
          <Route path="/profile/faq" component={FaqComponent} />
          <Route
            render={props => (
              <RiderProfileInfo
                {...props}
                user={currentUser}
                handleChange={handleChange}
                handleSave={handleSave}
              />
            )}
          />
        </Switch>
      </div>

      <DrawerLayout
        isOpen={isDrawerOpen}
        closeDrawer={closeDrawer}
        navigateToFaq={navigateToFaq}
        navigateToStatistics={navigateToStatistics}
        navigateToMyProfile={navigateToMyProfile}
        navigateToSkherasTodo={navigateToSkherasTodo}
        availability={availability}
        setAvailability={setAvailability}
      />
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
