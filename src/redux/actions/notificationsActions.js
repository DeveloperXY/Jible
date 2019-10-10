import * as types from "./actionTypes";
import * as notificationsApi from "../../api/notificationsApi";

export function loadRiderNotificationsSuccess(notifications) {
  return { type: types.LOAD_RIDER_NOTIFICATIONS_SUCCESS, notifications };
}

export function loadClientNotificationsSuccess(notifications) {
  return { type: types.LOAD_CLIENT_NOTIFICATIONS_SUCCESS, notifications };
}

export function loadRiderNotifications(riderId) {
  return function(dispatch) {
    return notificationsApi
      .fetchRiderNotifications(riderId)
      .then(notifications => {
        dispatch(loadRiderNotificationsSuccess(notifications));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function loadClientNotifications(clientId) {
  return function(dispatch) {
    return notificationsApi
      .fetchClientNotifications(clientId)
      .then(notifications => {
        dispatch(loadClientNotificationsSuccess(notifications));
      })
      .catch(error => {
        throw error;
      });
  };
}
