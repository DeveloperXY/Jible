import * as types from "../actions/actionTypes";

export default function addressReducer(state = [], action) {
  switch (action.type) {
    case types.LOAD_ADDRESSES_SUCCESS:
      return action.addresses;
    case types.DELETE_ADDRESS_SUCCESS:
      console.log(state);
      console.log("Action id: " + action.address._id);
      return state.filter(a => a._id !== action.address._id);
    default:
      return state;
  }
}
