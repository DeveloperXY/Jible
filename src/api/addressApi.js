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
