import * as types from "./actionTypes";
import * as skheraApi from "../../api/skheraApi";

export function loadRiderItinerarySuccess(itinerary) {
  return { type: types.LOAD_RIDER_ITINERARY, itinerary };
}

export function loadRiderItinerary(riderId) {
  return function(dispatch) {
    return skheraApi
      .fetchSkherasItinerary(riderId)
      .then(itinerary => {
        dispatch(loadRiderItinerarySuccess(itinerary));
      })
      .catch(error => {
        throw error;
      });
  };
}
