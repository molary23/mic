import {
  GET_USER_SIGNALS,
  ACTION_LOADING,
  CLEAR_USER_SIGNALS_ACTION,
} from "../action/types";

const initialState = {
  signals: [],
  loading: false,
  fetching: false,
  signalcount: 0,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_SIGNALS:
      return {
        ...state,
        signalcount: action.payload.shift(),
        signals: [...state.signals, ...action.payload],
        loading: false,
        fetching: true,
      };
    case ACTION_LOADING: {
      return { ...state, loading: true };
    }
    case CLEAR_USER_SIGNALS_ACTION: {
      return { ...state, signals: [], fetching: false };
    }
    default:
      return state;
  }
}
