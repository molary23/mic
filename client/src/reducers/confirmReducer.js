import {
  USER_CONFIRM_PASSWORD_ACTION,
  CLEAR_USER_CONFIRM_PASSWORD_ACTION,
  ACTION_LOADING,
} from "../action/types";
import isEmpty from "../validation/emptyChecker";

const initialState = { isConfirmed: false, UserId: {}, loading: false };

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
    case CLEAR_USER_CONFIRM_PASSWORD_ACTION:
      return {
        ...state,
        UserId: {},
        searching: false,
      };
    default:
      return state;
  }
}
