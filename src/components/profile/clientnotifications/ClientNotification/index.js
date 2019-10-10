import React from "react";
import { NotificationContainer } from "./style";
import TimeAgo from "react-timeago";

const ClientNotification = ({ notification }) => {
  return (
    <NotificationContainer>
      <TimeAgo className="notification-date" date={notification.date} />
      <div>Your skhera was delivered.</div>
      <div className="rate-text">Rate the rider</div>
    </NotificationContainer>
  );
};

export default ClientNotification;
