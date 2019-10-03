import React, { useState, useEffect } from "react";
import "./notifications.css";
import * as notificationsApi from "../../../api/notificationsApi";

function Notifications({
  riderId,
  hideNotifications,
  navigateToSkherasTodo,
  acceptSkhera,
  declineSkhera
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

  return (
    <div className="notification-body">
      {notifications.length === 0 && <div>No new assignments.</div>}
      {notifications.length !== 0 &&
        notifications.map(notification => (
          <div key={notification._id}>
            <div className="notification-header">New assignment</div>
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
                }}
              />
              <input
                type="button"
                className="white-btn decline-btn decline-skhera-btn"
                value="Decline"
                onClick={() => {
                  hideNotifications();
                  declineSkhera(notification);
                }}
              />
            </div>
          </div>
        ))}
    </div>
  );
}

export default Notifications;
