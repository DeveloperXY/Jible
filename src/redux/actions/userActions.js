import * as types from "./actionTypes";

export function saveUser(user) {
  console.log("DISPATCHING: " + user.name);
  return {
    type: types.SAVE_CURRENT_USER,
    user
  };
}
