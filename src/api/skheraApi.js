import { handleResponse, handleError, baseUrl } from "./apiUtils";

export function orderSkhera(skhera) {
  return fetch(`${baseUrl}/skhera`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(skhera)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function fetchSkherasItinerary(riderId) {
  return fetch(`${baseUrl}/itinerary?riderId=${riderId}`, {
    method: "GET",
    headers: { "content-type": "application/json" }
  })
    .then(handleResponse)
    .catch(handleError);
}

export function loadSkhera(skheraId) {
  return fetch(`${baseUrl}/skhera?skheraId=${skheraId}`, {
    method: "GET",
    headers: { "content-type": "application/json" }
  })
    .then(handleResponse)
    .catch(handleError);
}

export function updateSkheraRating(skheraId, rating) {
  return fetch(`${baseUrl}/rating`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      skheraId,
      rating
    })
  })
    .then(handleResponse)
    .catch(handleError);
}
