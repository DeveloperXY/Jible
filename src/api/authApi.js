import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "https://jible-server.localtunnel.me";

export function login(data) {
  return fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(handleResponse)
    .catch(handleError);
}

export function signUp(data) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(handleResponse)
    .catch(handleError);
}
