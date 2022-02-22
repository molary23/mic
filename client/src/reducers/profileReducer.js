import { GET_USER_PROFILE, CLEAR_CURRENT_PROFILE } from "../action/types";

const initialProfileState = { profile: null };

export default function profileReducer(state = initialProfileState, action) {
  switch (action.type) {
    case GET_USER_PROFILE: {
      return { ...state, profile: action.payload };
    }
    case CLEAR_CURRENT_PROFILE: {
      return { ...state, profile: null };
    }
    default:
      return state;
  }
}
