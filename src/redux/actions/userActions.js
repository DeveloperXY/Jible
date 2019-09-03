import * as types from "./actionTypes";

export function saveUserLocally(user) {
  return {
    type: types.SAVE_CURRENT_USER,
    user
  };
}
