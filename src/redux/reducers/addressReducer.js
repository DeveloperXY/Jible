import * as types from "../actions/actionTypes";

export default function addressReducer(state = [], action) {
  switch (action.type) {
    case types.LOAD_ADDRESSES_SUCCESS:
      return action.addresses;
    default:
      return state;
  }
}
