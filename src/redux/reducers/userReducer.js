import * as types from "../actions/actionTypes";

export default function userReducer(state = {}, action) {
  switch (action.type) {
    case types.SAVE_CURRENT_USER:
    case types.SAVE_USER_SUCCESS:
      return { ...action.user };
    default:
      return state;
  }
}
