import { handleResponse, handleError, baseUrl } from "./apiUtils";

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

export function verifyJwtToken(token) {
  return fetch(`${baseUrl}/verify`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "auth-token": token
    }
  })
    .then(handleResponse)
    .catch(handleError);
}
