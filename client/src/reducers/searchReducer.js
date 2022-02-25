import {
  ACTION_LOADING,
  GET_SEARCH_SUBSCRIPTIONS,
  CLEAR_SUBSCRIPTIONS_ACTION,
} from "../action/types";

const initialState = {
  sub: [],
  searching: false,
  loading: false,
};

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_LOADING: {
      return { ...state, loading: true };
    }
    case GET_SEARCH_SUBSCRIPTIONS:
      return {
        ...state,
        sub: [...action.payload],
        loading: false,
        searching: true,
      };
    case CLEAR_SUBSCRIPTIONS_ACTION:
      return {
        ...state,
        sub: [],
      };
    default:
      return state;
  }
}
