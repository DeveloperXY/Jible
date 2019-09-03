import * as types from "./actionTypes";
import * as userApi from "../../api/userApi";

export function saveUserSuccess(course) {
  return { type: types.SAVE_USER_SUCCESS, course };
}

export function saveUserLocally(user) {
  return {
    type: types.SAVE_CURRENT_USER,
    user
  };
}

export function saveUserRemotely(user) {
  return function(dispatch) {
    return userApi
      .saveUser(user)
      .then(savedUser => {
        dispatch(saveUserSuccess(user));
      })
      .catch(error => {
        throw error;
      });
  };
}
