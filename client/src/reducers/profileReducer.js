import { GET_USER_PROFILE } from "../action/types";

const initialProfileState = { profile: null };

export default function profileReducer(state = initialProfileState, action) {
  switch (action.type) {
    case GET_USER_PROFILE: {
      return { ...state, profile: action.payload };
    }
    default:
      return state;
  }
}
