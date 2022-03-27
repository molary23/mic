import {
  GET_USER_PROFILE,
  CLEAR_CURRENT_PROFILE,
  PROFILE_LOADING,
} from "../action/types";

const initialProfileState = { profile: null, loading: true };

export default function profileReducer(state = initialProfileState, action) {
  switch (action.type) {
    case GET_USER_PROFILE: {
      return { ...state, profile: action.payload, loading: false };
    }
    case PROFILE_LOADING: {
      return { ...state, loading: true };
    }
    case CLEAR_CURRENT_PROFILE: {
      return { ...state, profile: null };
    }
    default:
      return state;
  }
}
