import { handleResponse, handleError, baseUrl } from "./apiUtils";

export function fetchRiderNotifications(riderId) {
  return fetch(`${baseUrl}/riderNotifications?riderId=${riderId}`, {
    method: "GET",
    headers: { "content-type": "application/json" }
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteNotification(notificationId) {
  return fetch(`${baseUrl}/notifications/`, {
    method: "DELETE",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ notificationId })
  })
    .then(handleResponse)
    .catch(handleError);
}
