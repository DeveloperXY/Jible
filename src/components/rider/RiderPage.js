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
import RiderSkheras from "./skheras/RiderSkheras";
import * as placesApi from "../../api/placesApi";

function RiderPage({ currentUser, saveUserRemotely, history, socket }) {
  const [user, setUser] = useState({ ...currentUser });
  const [isNotificationVisible, setNotificationVisibility] = useState(false);
  const [isNotificationDotVisible, setNotificationDotVisibility] = useState(
    false
  );
  const [isDrawerOpen, setDrawerOpenState] = useState(false);
  const [availability, setAvailability] = useState(user.isAvailable);
  const [currentLocation, setRiderLocation] = useState(undefined);
  const [lastEmittedLocation, setEmittedLocation] = useState(currentLocation);
  const isFirstSocketCheck = useRef(true);
  const isFirstAvailabilityCheck = useRef(true);

  useEffect(() => {
    if (isNotificationVisible) setNotificationDotVisibility(false);
  }, [isNotificationVisible]);

  useEffect(() => {
    if (isFirstSocketCheck.current && socket !== undefined) {
      isFirstSocketCheck.current = false;

      setInterval(() => {
        placesApi
          .fetchCurrentLocation(window.navigator)
          .then(location => {
            setRiderLocation(location);
          })
          .catch(error => console.log(error));
      }, 5000);

      socket.on("toggleAvailabilitySuccess", () => {
        console.log("Availability updated.");
      });

      socket.on("toggleAvailabilityError", () => {
        console.log("Availability update error.");
      });

      socket.on("incomingRequest", data => {
        setNotificationDotVisibility(true);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (currentLocation !== undefined) {
      if (
        lastEmittedLocation === undefined ||
        (currentLocation.lat !== lastEmittedLocation.lat &&
          currentLocation.lng !== lastEmittedLocation.lng)
      ) {
        setEmittedLocation(currentLocation);
        socket.emit("currentLocationUpdate", currentLocation);
      }
    }
  }, [currentLocation]);

  useEffect(() => {
    if (isFirstAvailabilityCheck.current)
      isFirstAvailabilityCheck.current = false;
    else {
      setUser({ ...user, isAvailable: availability });
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
    history.push("/profile/todo");
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
          <div className="notification-wrapper">
            <img
              src={notificationIcon}
              alt=""
              className="notification-icon"
              onClick={toggleNotificationsVisibility}
            />
            <div
              className="dot"
              style={{ display: isNotificationDotVisible ? "unset" : "none" }}
            ></div>
          </div>
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
          <Route path="/profile/todo" component={RiderSkheras} />
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
