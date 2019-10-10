import React from "react";
import { connect } from "react-redux";
import { NotificationsContainer } from "./style";
import ClientNotification from "./ClientNotification";

const ClientNotifications = ({ notifications }) => {
  return (
    <NotificationsContainer>
      {notifications.map(n => (
        <ClientNotification notification={n} />
      ))}
    </NotificationsContainer>
  );
};

const mapStateToProps = state => {
  const { clientNotifications } = state;
  return {
    notifications: clientNotifications
  };
};

export default connect(mapStateToProps)(ClientNotifications);
