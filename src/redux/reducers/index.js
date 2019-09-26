import { combineReducers } from "redux";
import currentUser from "./userReducer";
import addresses from "./addressReducer";
import riderItinerary from "./riderItineraryReducer";

const rootReducer = combineReducers({
  currentUser,
  riderItinerary,
  addresses
});

export default rootReducer;
