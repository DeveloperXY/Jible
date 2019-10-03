import * as types from "./actionTypes";
import * as notificationsApi from "../../api/notificationsApi";

export function loadNotificationsSuccess(notifications) {
  return { type: types.LOAD_NOTIFICATIONS_SUCCESS, notifications };
}

export function loadRiderNotifications(riderId) {
  return function(dispatch) {
    return notificationsApi
      .fetchRiderNotifications(riderId)
      .then(notifications => {
        dispatch(loadNotificationsSuccess(notifications));
      })
      .catch(error => {
        throw error;
      });
  };
}
