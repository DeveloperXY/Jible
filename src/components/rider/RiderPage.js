import React, { useState, useEffect, useRef } from "react";
import menuIcon from "./images/ic_menu.svg";
import notificationIcon from "./images/ic_notifications.svg";
import { saveUserRemotely } from "../../redux/actions/userActions";
import { loadRiderItinerary } from "../../redux/actions/skheraActions";
import "./riderPage.css";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Route, Switch } from "react-router-dom";
import RiderProfileInfo from "./RiderProfileInfo";
import DrawerLayout from "./drawer/DrawerLayout";
import FaqComponent from "../faq/FaqComponent";
import RiderSkheras from "./skheras/RiderSkheras";
import * as placesApi from "../../api/placesApi";
import * as skheraApi from "../../api/skheraApi";
import ToggleButton from "react-toggle-button";

function RiderPage({
  currentUser,
  saveUserRemotely,
  loadRiderItinerary,
  history,
  socket
}) {
  const [user, setUser] = useState({ ...currentUser });
  const [notificationData, setNotificationData] = useState(undefined);
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
  const [currentPage, setCurrentPage] = useState("details");

  useEffect(() => {
    if (notificationData !== undefined) setNotificationData(undefined);
    loadRiderItinerary(currentUser._id);
  }, []);

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
            console.log("Riderpage update");
            setRiderLocation(location);
          })
          .catch(error => {
            console.log(error);
            console.log("got error");
          });
      }, 5000);

      socket.on("toggleAvailabilitySuccess", () => {
        console.log("Availability updated.");
      });

      socket.on("toggleAvailabilityError", () => {
        console.log("Availability update error.");
      });

      socket.on("newAssignment", data => {
        setNotificationDotVisibility(true);
        console.log(data);
        setNotificationData(data);
      });

      socket.on("acceptSkheraResponse", data => {
        const status = data.status;
        if (status === "ok") {
          toast.success("You got the job.");
        } else {
          toast.success("Too late");
        }
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
    if (isNotificationVisible) setNotificationData(undefined);
    setNotificationVisibility(!isNotificationVisible);
  }

  function toggleDrawerOpenState() {
    setDrawerOpenState(!isDrawerOpen);
  }

  function closeDrawer() {
    setDrawerOpenState(false);
  }

  function navigateToSkherasTodo() {
    setCurrentPage("todo");
    history.push("/profile/todo");
  }

  function navigateToMyProfile() {
    setCurrentPage("details");
    history.push("/profile/details");
  }

  function navigateToStatistics() {
    setCurrentPage("statistics");
    history.push("/statistics");
  }

  function navigateToFaq() {
    setCurrentPage("faq");
    history.push("/profile/faq");
  }

  function acceptSkhera() {
    socket.emit("acceptNewAssignment", {
      skheraId: notificationData.skheraId,
      riderId: currentUser._id
    });
  }

  function declineSkhera() {
    // TODO: possible optimization here - emit next new assignment event to the next rider immediately
    socket.emit("declineNewAssignment", {
      skheraId: notificationData.skheraId,
      riderId: currentUser._id
    });
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
        {notificationData === undefined && <div>No new assignments.</div>}
        {notificationData !== undefined &&
          notificationData.type === "NEW_ASSIGNMENT" && (
            <>
              <div className="notification-header">
                <div>New assignment from {notificationData.fromUserName}</div>
              </div>
              <input
                type="button"
                className="green-btn accept-btn"
                value="Accept"
                onClick={() => {
                  setNotificationVisibility(false);
                  navigateToSkherasTodo();
                  acceptSkhera();
                }}
              />
              <input
                type="button"
                className="white-btn decline-btn"
                value="Decline"
                onClick={() => {
                  setNotificationVisibility(false);
                  declineSkhera();
                }}
              />
            </>
          )}
        {notificationData !== undefined &&
          notificationData.type === "ADDITIONAL_ASSIGNMENT" && (
            <>
              <div className="notification-header">
                <div>New assignment</div>
                <div>2:45 min</div>
              </div>
              <input
                type="button"
                className="green-btn accept-btn"
                value="Accept"
              />
              <input
                type="button"
                className="green-btn grey-btn"
                value="Decline"
              />
            </>
          )}
      </div>
      <div className="main-fragment">
        <Switch>
          <Route path="/profile/faq" component={FaqComponent} />
          <Route
            path="/profile/todo"
            render={() => <RiderSkheras location={currentLocation} />}
          />
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
        currentPage={currentPage}
        isOpen={isDrawerOpen}
        routes={[
          {
            value: "todo",
            name: "Skheras TODO",
            action: navigateToSkherasTodo
          },
          {
            value: "details",
            name: "My profile",
            action: navigateToMyProfile
          },
          {
            value: "statistics",
            name: "Statistics",
            action: navigateToStatistics
          },
          { value: "faq", name: "FAQ", action: navigateToFaq }
        ]}
        closeDrawer={closeDrawer}
        navigateToFaq={navigateToFaq}
        navigateToStatistics={navigateToStatistics}
        navigateToMyProfile={navigateToMyProfile}
        navigateToSkherasTodo={navigateToSkherasTodo}
        availability={availability}
        setAvailability={setAvailability}
      >
        <div className="availability-container">
          <div className="availability-label">Availability</div>
          <ToggleButton
            value={availability}
            onToggle={value => {
              setAvailability(!value);
            }}
          />
        </div>
      </DrawerLayout>
    </div>
  );
}

const mapDispatchToProps = {
  saveUserRemotely,
  loadRiderItinerary
};

export default connect(
  null,
  mapDispatchToProps
)(RiderPage);
