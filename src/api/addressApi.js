import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "http://localhost:9000/address";

export function saveAddress(address) {
  return fetch(baseUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(address)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function fetchAddressesByUserId(userId) {
  return fetch(`${baseUrl}?userId=${userId}`, {
    method: "GET"
  })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteAddressById(id) {
  return fetch(baseUrl, {
    method: "DELETE",
    body: {
      _id: id
    }
  })
    .then(handleResponse)
    .catch(handleError);
}
