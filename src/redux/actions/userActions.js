import * as types from "./actionTypes";

export function saveUser(user) {
  console.log("DISPATCHING");
  return {
    type: types.SAVE_CURRENT_USER,
    user
  };
}
