import { combineReducers } from "redux";
import currentUser from "./userReducer";
import addresses from "./addressReducer";
import riderItinerary from "./riderItineraryReducer";
import notifications from "./notificationsReducer";
import clientNotifications from "./clientNotificationsReducer";

const rootReducer = combineReducers({
  currentUser,
  riderItinerary,
  addresses,
  notifications,
  clientNotifications
});

export default rootReducer;
