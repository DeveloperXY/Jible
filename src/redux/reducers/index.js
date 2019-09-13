import { combineReducers } from "redux";
import currentUser from "./userReducer";
import addresses from "./addressReducer";

const rootReducer = combineReducers({
  currentUser,
  addresses
});

export default rootReducer;
