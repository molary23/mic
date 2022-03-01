import {
  ACTION_LOADING,
  CLEAR_PROVIDERS_SIGNALS_SEARCH,
  GET_SEARCH_PROVIDER_SIGNALS,
} from "../action/types";

const initialState = {
  loading: false,
  searching: false,
  signals: [],
  signalcount: 0,
};

export default function providerReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SEARCH_PROVIDER_SIGNALS:
      return {
        ...state,
        signalcount: action.payload.shift(),
        signals: [...state.signals, ...action.payload],
        loading: false,
        searching: true,
      };
    case CLEAR_PROVIDERS_SIGNALS_SEARCH: {
      return { ...state, signals: [], signalcount: 0, searching: false };
    }
    case ACTION_LOADING: {
      return { ...state, loading: true };
    }
    default:
      return state;
  }
}
