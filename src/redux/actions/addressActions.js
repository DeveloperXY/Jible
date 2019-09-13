import * as types from "./actionTypes";
import { beginApiCall, apiCallError } from "./apiStatusActions";
import * as addressApi from "../../api/addressApi";

export function loadAddressesSuccess(addresses) {
  return {
    type: types.LOAD_ADDRESSES_SUCCESS,
    addresses
  };
}

export function loadAddressesByUserId(userId) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return addressApi
      .fetchAddressesByUserId(userId)
      .then(addresses => dispatch(loadAddressesSuccess(addresses)))
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
