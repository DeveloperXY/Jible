import React, { useState, useEffect } from "react";
import "./notifications.css";
import * as notificationsApi from "../../../api/notificationsApi";

function Notifications({
  riderId,
  hideNotifications,
  navigateToSkherasTodo,
  acceptSkhera,
  declineSkhera,
  deleteNotification
}) {
  const pickupColor = "#419D78";
  const dropOffColor = "#4A90E2";
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    notificationsApi.fetchRiderNotifications(riderId).then(data => {
      console.log(data);
      setNotifications(data);
    });
  }, []);

  function hideNotification(notificationId) {
      setNotifications(notifications.filter(n => n._id !== notificationId))
      deleteNotification(notificationId);
  }

  return (
    <div className="notification-body">
      {notifications.length !== 0 && (
        <div className="notification-header">
          {notifications.length === 0 ? "No" : notifications.length} new
          assignments
        </div>
      )}
      {notifications.length === 0 && <div>No new assignments.</div>}
      {notifications.length !== 0 &&
        notifications.map((notification, index) => (
          <div
            key={notification._id}
            style={{ marginTop: index !== 0 ? "24px" : "unset" }}
          >
            <div className="notif-details">
              <div className="notif-addresses">
                <div className="notif-from-addr from-addr">
                  <div
                    className="location-dot"
                    style={{ backgroundColor: pickupColor }}
                  ></div>
                  <div className="address-data">
                    {notification.skhera.fromAddress.name}
                  </div>
                </div>
                <div className="notif-from-addr to-addr">
                  <div
                    className="location-dot"
                    style={{ backgroundColor: dropOffColor }}
                  ></div>
                  <div className="address-data">
                    {notification.skhera.toAddress.name}
                  </div>
                </div>
              </div>
              <div className="estimated-price-notif-wrapper">
                Estimated price:{" "}
                <div className="estimated-price-notif">
                  {notification.skhera.price}
                </div>
              </div>
            </div>
            <div className="action-buttons-wrapper">
              <input
                type="button"
                className="green-btn accept-btn accept-skhera-btn"
                value="Accept"
                onClick={() => {
                  hideNotifications();
                  navigateToSkherasTodo();
                  acceptSkhera(notification);
                  hideNotification(notification._id);
                }}
              />
              <input
                type="button"
                className="white-btn decline-btn decline-skhera-btn"
                value="Decline"
                onClick={() => {
                  hideNotifications();
                  declineSkhera(notification);
                  hideNotification(notification._id);
                }}
              />
            </div>
          </div>
        ))}
    </div>
  );
}

export default Notifications;
