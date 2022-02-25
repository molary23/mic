import {
  GET_ALL_SUBSCRIPTIONS,
  CLEAR_SUBSCRIPTIONS_ACTION,
  ACTION_LOADING,
  GET_SUBSCRIPTION_COUNT,
} from "../action/types";

const initialState = { sub: [], subcount: null, trans: null, loading: false };

export default function adminReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_SUBSCRIPTIONS:
      return {
        ...state,
        sub: [...state.sub, ...action.payload],
        loading: false,
      };
    case GET_SUBSCRIPTION_COUNT: {
      return { ...state, subcount: action.payload };
    }
    case ACTION_LOADING: {
      return { ...state, loading: true };
    }
    case CLEAR_SUBSCRIPTIONS_ACTION: {
      return { ...state, sub: null };
    }
    default:
      return state;
  }
}
