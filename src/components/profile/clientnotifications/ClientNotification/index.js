import React from "react";
import { NotificationContainer } from "./style";

const ClientNotification = ({ notification }) => {
  return (
    <NotificationContainer>
      <div>Your skhera was delivered.</div>
      <div>Rate the rider</div>
    </NotificationContainer>
  );
};

export default ClientNotification;
