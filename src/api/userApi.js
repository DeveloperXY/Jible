import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "http://localhost:9000/user";

export function saveUser(user) {
  return fetch(baseUrl, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(user)
  })
    .then(handleResponse)
    .catch(handleError);
}
