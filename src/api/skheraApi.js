import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "http://localhost:9000/skhera";

export function orderSkhera(skhera) {
  return fetch(baseUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(skhera)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function fetchSkheras(clientId) {
  return fetch(`${baseUrl}?clientId=${clientId}`, {
    method: "GET",
    headers: { "content-type": "application/json" }
  })
    .then(handleResponse)
    .catch(handleError);
}
