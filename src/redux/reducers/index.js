import { combineReducers } from "redux";
import currentUser from "./userReducer";
import addresses from "./addressReducer";
import riderItinerary from "./riderItineraryReducer";
import notifications from "./notificationsReducer";

const rootReducer = combineReducers({
  currentUser,
  riderItinerary,
  addresses,
  notifications
});

export default rootReducer;
