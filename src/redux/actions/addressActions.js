import * as types from "./actionTypes";
import { beginApiCall, apiCallError } from "./apiStatusActions";
import * as addressApi from "../../api/addressApi";

export function loadAddressesSuccess(addresses) {
  return {
    type: types.LOAD_ADDRESSES_SUCCESS,
    addresses
  };
}

export function deleteAddressSuccess(address) {
  return {
    type: types.DELETE_ADDRESS_SUCCESS,
    address
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

export function deleteAddress(id) {
  return function(dispatch) {
    dispatch(beginApiCall());
    return addressApi
      .deleteAddressById(id)
      .then(data => dispatch(deleteAddressSuccess(data.address)))
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
