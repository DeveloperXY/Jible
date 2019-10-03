import * as types from "../actions/actionTypes";

export default function notificationsReducer(state = [], action) {
  switch (action.type) {
    case types.LOAD_NOTIFICATIONS_SUCCESS:
      return action.notifications;
    default:
      return state;
  }
}
