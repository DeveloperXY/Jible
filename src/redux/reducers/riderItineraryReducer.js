import * as types from "../actions/actionTypes";

export default function riderItineraryReducer(state = [], action) {
  switch (action.type) {
    case types.LOAD_RIDER_ITINERARY:
      return action.itinerary;
    default:
      return state;
  }
}
