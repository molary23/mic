import {
  ACTION_LOADING,
  GET_ALL_PROVIDER_SIGNALS,
  CLEAR_PROVIDER_SIGNALS_ACTION,
} from "../action/types";

const initialState = {
  loading: false,
  fetching: false,
  signals: [],
  signalcount: 0,
};

export default function providerReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PROVIDER_SIGNALS:
      return {
        ...state,
        signalcount: action.payload.shift(),
        signals: [...state.signals, ...action.payload],
        loading: false,
        fetching: true,
      };
    case CLEAR_PROVIDER_SIGNALS_ACTION: {
      return { ...state, signals: [], signalcount: 0, fetching: false };
    }
    case ACTION_LOADING: {
      return { ...state, loading: true };
    }
    default:
      return state;
  }
}
