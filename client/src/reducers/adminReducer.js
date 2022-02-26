import {
  GET_ALL_SUBSCRIPTIONS,
  CLEAR_SUBSCRIPTIONS_ACTION,
  ACTION_LOADING,
  GET_SUBSCRIPTION_COUNT,
  GET_ALL_TRANSACTIONS,
  CLEAR_TRANSACTIONS_ACTION,
} from "../action/types";

const initialState = {
  sub: [],
  subcount: {},
  trans: [],
  loading: false,
  fetching: false,
  transCount: 0,
};

export default function adminReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_SUBSCRIPTIONS:
      return {
        ...state,
        sub: [...state.sub, ...action.payload],
        loading: false,
        fetching: true,
      };
    case GET_ALL_TRANSACTIONS:
      let count = action.payload.shift();
      return {
        ...state,
        trans: [...state.trans, ...action.payload],
        transCount: count,
        loading: false,
        fetching: true,
      };
    case GET_SUBSCRIPTION_COUNT: {
      return { ...state, subcount: action.payload };
    }
    case ACTION_LOADING: {
      return { ...state, loading: true };
    }
    case CLEAR_SUBSCRIPTIONS_ACTION: {
      return { ...state, sub: [], fetching: false };
    }
    case CLEAR_TRANSACTIONS_ACTION: {
      return { ...state, trans: [], fetching: false };
    }
    default:
      return state;
  }
}
