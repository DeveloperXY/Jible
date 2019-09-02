import * as types from "../actions/actionTypes";

export default function userReducer(state = {}, action) {
  console.log("YO");
  switch (action.type) {
    case types.SAVE_CURRENT_USER:
      console.log("HOLA: " + action.user.name);
      return { ...action.user };
    default:
      return state;
  }
}
