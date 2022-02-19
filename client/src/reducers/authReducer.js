import { TEXT_DISPATCH } from "../action/types";
const initialState = { isAuthenticated: false, user: {} };

export default function (state = initialState, action) {
  switch (action.type) {
    case TEXT_DISPATCH: {
      return { ...state, isAuthenticated: true, user: action.payload };
    }
    default:
      return state;
  }
}
