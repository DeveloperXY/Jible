import React from "react";
import { NotificationContainer } from "./style";
import TimeAgo from "react-timeago";
import RatingDialog from "../../../Rating";

const ClientNotification = ({ notification }) => {
  return (
    <NotificationContainer>
      <TimeAgo className="notification-date" date={notification.date} />
      <div>Your skhera was delivered.</div>
      <RatingDialog
        skheraId={notification.skheraId}
        rider={notification.rider}
      />
    </NotificationContainer>
  );
};

export default ClientNotification;
