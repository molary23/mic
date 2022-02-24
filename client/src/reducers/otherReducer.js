import { SET_CURRENT_USER } from "../action/types";

const initialState = { sub: {} };

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        sub: action.payload,
      };
    default:
      return state;
  }
}
