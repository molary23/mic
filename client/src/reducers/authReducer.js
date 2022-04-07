import {
  SET_CURRENT_USER,
  SET_ALL_COUNTS,
  CLEAR_ALL_ACTIONS,
  SET_PROVIDER_COUNTS,
  SET_USER_COUNTS,
  USER_GET_MODE,
} from "../action/types";
import isEmpty from "../validation/emptyChecker";
const initialState = {
  isAuthenticated: false,
  user: {},
  allCounts: {},
  providerCounts: {},
  userCounts: {},
  mode: null,
  counted: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALL_COUNTS:
      return {
        ...state,
        allCounts: action.payload,
        counted: true,
      };
    case SET_PROVIDER_COUNTS:
      return {
        ...state,
        providerCounts: action.payload,
        counted: true,
      };
    case SET_USER_COUNTS:
      return {
        ...state,
        userCounts: action.payload,
        counted: true,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case USER_GET_MODE:
      return {
        ...state,
        mode: action.payload,
      };
    case CLEAR_ALL_ACTIONS:
      return {
        ...state,
        isAuthenticated: false,
        user: {},
        allCounts: {},
        providerCounts: {},
        userCounts: {},
        counted: false,
      };
    default:
      return state;
  }
}
