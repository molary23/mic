import {
  SET_CURRENT_USER,
  SET_ALL_COUNTS,
  CLEAR_ALL_ACTIONS,
} from "../action/types";
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
    case CLEAR_ALL_ACTIONS:
      return { ...state, isAuthenticated: false, user: {}, allCounts: {} };
    default:
      return state;
  }
}
