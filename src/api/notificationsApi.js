import { handleResponse, handleError, baseUrl } from "./apiUtils";

export function fetchRiderNotifications(riderId) {
  return fetch(`${baseUrl}/riderNotifications?riderId=${riderId}`, {
    method: "GET",
    headers: { "content-type": "application/json" }
  })
    .then(handleResponse)
    .catch(handleError);
}
