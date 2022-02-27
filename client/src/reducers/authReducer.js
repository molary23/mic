import { SET_CURRENT_USER, SET_ALL_COUNTS } from "../action/types";
import isEmpty from "../validation/emptyChecker";
const initialState = { isAuthenticated: false, user: {}, allCounts: {} };

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_COUNTS:
      return {
        ...state,
        allCounts: action.payload,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    default:
      return state;
  }
}
