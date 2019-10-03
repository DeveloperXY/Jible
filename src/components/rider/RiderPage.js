import React, { useState, useEffect, useRef } from "react";
import menuIcon from "./images/ic_menu.svg";
import notificationIcon from "./images/ic_notifications.svg";
import { saveUserRemotely } from "../../redux/actions/userActions";
import { loadRiderItinerary } from "../../redux/actions/skheraActions";
import { loadRiderNotifications } from "../../redux/actions/notificationsActions";
import * as notificationsApi from "../../api/notificationsApi";
import "./riderPage.css";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Route, Switch } from "react-router-dom";
import RiderProfileInfo from "./RiderProfileInfo";
import DrawerLayout from "./drawer/DrawerLayout";
import FaqComponent from "../faq/FaqComponent";
import RiderSkheras from "./skheras/RiderSkheras";
import * as placesApi from "../../api/placesApi";
import ToggleButton from "react-toggle-button";
import SkheraDetails from "./skheraDetails/SkheraDetails";
import JibleLogo from "../../images/Logo";
import Notifications from "./notifications/Notifications";

function RiderPage({
  currentUser,
  saveUserRemotely,
  loadRiderItinerary,
  loadNotifications,
  notifications,
  history,
  socket,
  location
}) {
  const [user, setUser] = useState({ ...currentUser });
  const [isDrawerOpen, setDrawerOpenState] = useState(false);
  const [availability, setAvailability] = useState(user.isAvailable);
  const [currentLocation, setRiderLocation] = useState(undefined);
  const [lastEmittedLocation, setEmittedLocation] = useState(currentLocation);
  const isFirstSocketCheck = useRef(true);
  const isFirstAvailabilityCheck = useRef(true);
  const [currentPage, setCurrentPage] = useState("details");

  useEffect(() => {
    loadRiderItinerary(currentUser._id);
    loadNotifications(currentUser._id);
  }, []);

  useEffect(() => {
    if (isFirstSocketCheck.current && socket !== undefined) {
      isFirstSocketCheck.current = false;

      setInterval(() => {
        placesApi
          .fetchCurrentLocation(window.navigator)
          .then(location => {
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

      socket.on("newNotification", () => {
        loadNotifications(currentUser._id);
      });

      socket.on("acceptSkheraResponse", data => {
        const status = data.status;
        if (status === "ok") {
          loadRiderItinerary(currentUser._id);
        } else {
          toast.success("Too late");
        }
      });

      socket.on("skheraItemReadyResponse", data => {
        console.log(data);
      });

      socket.on("skheraDeliveredSuccess", () => {
        navigateToSkherasTodo();
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

  function hideNotifications() {}

  function showPage(page) {
    console.log(location);
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

  function showNotifications() {
    setCurrentPage("notifications");
    history.push("/profile/notifications");
  }

  function unselectCurrent() {
    setCurrentPage("none");
  }

  function acceptSkhera(notification) {
    socket.emit("acceptNewAssignment", {
      skheraId: notification.skhera._id,
      riderId: currentUser._id
    });
  }

  function emitSkheraItemReady(itemId, skheraId, isReady) {
    socket.emit("skheraItemReady", {
      itemId,
      skheraId,
      isReady
    });
  }

  function emitSkheraPickedUp(skheraId) {
    socket.emit("skheraPickedUp", {
      skheraId
    });
  }

  function emitSkheraDelivered(skheraId, riderId) {
    socket.emit("skheraDelivered", {
      skheraId,
      riderId
    });
  }

  function declineSkhera(notification) {
    // TODO: possible optimization here - emit next new assignment event to the next rider immediately
    socket.emit("declineNewAssignment", {
      skheraId: notification.skhera._id,
      riderId: currentUser._id
    });
  }

  function deleteNotification(notificationId) {
    notificationsApi.deleteNotification(notificationId).then(data => {
      if (data.status === "ok") loadNotifications(currentUser._id);
    });
  }

  return (
    <div className="profile-wrapper">
      <div className="app-header">
        <JibleLogo textColor="#000000" boxColor="#419D78" arcColor="#ffffff" />
        <div className="header-icons">
          <div className="notification-wrapper" onClick={showNotifications}>
            <img src={notificationIcon} alt="" className="notification-icon" />
            <div
              className="dot"
              style={{ display: notifications.length !== 0 ? "unset" : "none" }}
            ></div>
          </div>
          <img src={menuIcon} alt="" onClick={toggleDrawerOpenState} />
        </div>
      </div>

      <div className="main-fragment">
        <Switch>
          <Route
            path="/profile/skhera/:skheraId"
            render={props => (
              <SkheraDetails
                {...props}
                emitSkheraItemReady={emitSkheraItemReady}
                emitSkheraPickedUp={emitSkheraPickedUp}
                emitSkheraDelivered={emitSkheraDelivered}
                navigateToSkherasTodo={navigateToSkherasTodo}
              />
            )}
          />
          <Route path="/profile/faq" component={FaqComponent} />
          <Route
            path="/profile/notifications"
            render={props => (
              <Notifications
                {...props}
                riderId={currentUser._id}
                hideNotifications={hideNotifications}
                navigateToSkherasTodo={navigateToSkherasTodo}
                acceptSkhera={acceptSkhera}
                declineSkhera={declineSkhera}
                deleteNotification={deleteNotification}
              />
            )}
          />
          <Route
            path="/profile/todo"
            render={() => (
              <RiderSkheras
                history={history}
                location={currentLocation}
                unselectCurrent={unselectCurrent}
              />
            )}
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
            value: "none"
          },
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
        unselectCurrent={unselectCurrent}
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

const mapStateToProps = ({ notifications }) => ({ notifications });

const mapDispatchToProps = {
  saveUserRemotely,
  loadRiderItinerary,
  loadNotifications: loadRiderNotifications
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RiderPage);
