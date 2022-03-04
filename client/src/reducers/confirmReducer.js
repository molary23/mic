import {
  USER_CONFIRM_PASSWORD_ACTION,
  CLEAR_USER_CONFIRM_PASSWORD_ACTION,
  ACTION_LOADING,
  USER_RESET_PASSWORD_ACTION,
  CLEAR_USER_RESET_PASSWORD_ACTION,
} from "../action/types";
import isEmpty from "../validation/emptyChecker";

const initialState = {
  isConfirmed: false,
  UserId: {},
  loading: false,
  reset: false,
  resetDetails: {},
};

export default function confirmReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_LOADING: {
      return { ...state, loading: true };
    }
    case USER_CONFIRM_PASSWORD_ACTION:
      return {
        ...state,
        isConfirmed: !isEmpty(action.payload),
        UserId: action.payload,
        loading: false,
      };
    case USER_RESET_PASSWORD_ACTION:
      return {
        ...state,
        resetDetails: action.payload,
        reset: true,
      };
    case CLEAR_USER_CONFIRM_PASSWORD_ACTION:
      return {
        ...state,
        UserId: {},
        isConfirmed: false,
      };
    case CLEAR_USER_RESET_PASSWORD_ACTION:
      return {
        ...state,
        resetDetails: {},
        reset: false,
      };
    default:
      return state;
  }
}
