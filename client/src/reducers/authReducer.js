import { SET_CURRENT_USER } from "../action/types";
import isEmpty from "../validation/emptyChecker";
const initialState = { isAuthenticated: false, user: {} };

export default function authReducer(state = initialState, action) {
  switch (action.type) {
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
