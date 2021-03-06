export const apiKey = "AIzaSyDd3dI_tqR6Rx-IMpS9r5mWCP5oAEibiE0";
export const baseUrl = "https://peragro.serveo.net";
export const frontBaseUrl = "https://34b0920b.ngrok.io";

export async function handleResponse(response) {
  if (response.ok) return response.json();
  if (response.status === 400) {
    // So, a server-side validation error occurred.
    // Server side validation returns a string error message, so parse as text instead of json.
    const error = await response.text();
    throw new Error(error);
  }
  throw new Error("Network response was not ok.");
}

// In a real app, would likely call an error logging service.
export function handleError(error) {
  // eslint-disable-next-line no-console
  console.error("API call failed. " + error);
  throw error;
}
