import { handleResponse, handleError, baseUrl } from "./apiUtils";

export function saveUser(user) {
  return fetch(`${baseUrl}/user`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(user)
  })
    .then(handleResponse)
    .catch(handleError);
}
