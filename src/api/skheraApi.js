import { handleResponse, handleError } from "./apiUtils";
const baseUrl = "http://localhost:9000/skhera";

export function orderSkhera(skhera) {
  console.log("ID: " + JSON.stringify(skhera));
  return fetch(baseUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(skhera)
  })
    .then(handleResponse)
    .catch(handleError);
}
