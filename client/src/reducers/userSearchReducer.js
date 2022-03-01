import {
  GET_USER_SEARCH_SIGNALS,
  ACTION_LOADING,
  CLEAR_USERS_SIGNALS_SEARCH,
} from "../action/types";

const initialState = {
  signals: [],
  loading: false,
  searching: false,
  signalcount: 0,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_SEARCH_SIGNALS:
      return {
        ...state,
        signalcount: action.payload.shift(),
        signals: [...state.signals, ...action.payload],
        loading: false,
        searching: true,
      };
    case ACTION_LOADING: {
      return { ...state, loading: true };
    }
    case CLEAR_USERS_SIGNALS_SEARCH: {
      return { ...state, signals: [], searching: false };
    }
    default:
      return state;
  }
}
