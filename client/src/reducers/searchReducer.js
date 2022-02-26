import {
  ACTION_LOADING,
  GET_SEARCH_SUBSCRIPTIONS,
  CLEAR_SEARCH_SUBSCRIPTIONS_ACTION,
  GET_SEARCH_TRANSACTIONS,
  CLEAR_SEARCH_TRANSACTIONS_ACTION,
} from "../action/types";

const initialState = {
  trans: [],
  searching: false,
  loading: false,
  transCount: 0,
};

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_LOADING: {
      return { ...state, loading: true };
    }
    case GET_SEARCH_SUBSCRIPTIONS:
      return {
        ...state,
        sub: [...state.sub, ...action.payload],
        loading: false,
        searching: true,
      };
    case GET_SEARCH_TRANSACTIONS:
      let count = action.payload.shift();
      return {
        ...state,
        trans: [...state.trans, ...action.payload],
        transCount: count,
        loading: false,
        searching: true,
      };
    case CLEAR_SEARCH_SUBSCRIPTIONS_ACTION:
      return {
        ...state,
        sub: [],
        searching: false,
      };
    case CLEAR_SEARCH_TRANSACTIONS_ACTION:
      return {
        ...state,
        trans: [],
        searching: false,
      };
    default:
      return state;
  }
}
