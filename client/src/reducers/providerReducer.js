import {
  ACTION_LOADING,
  GET_ALL_PROVIDER_SIGNALS,
  CLEAR_PROVIDER_SIGNALS_ACTION,
  GET_ALL_CURRENCY_PAIR,
  CLEAR_GET_ALL_CURRENCY_PAIR,
  ADD_NEW_SIGNAL,
  CLEAR_ADD_NEW_SIGNAL,
  EDIT_NEW_SIGNAL,
  CLEAR_EDIT_NEW_SIGNAL,
} from "../action/types";

const initialState = {
  loading: false,
  fetching: false,
  signals: [],
  signalcount: 0,
  currencies: [],
  signaladded: false,
  signaledited: false,
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
    case GET_ALL_CURRENCY_PAIR:
      return {
        ...state,
        currencies: action.payload,
      };
    case ADD_NEW_SIGNAL:
      return {
        ...state,
        signaladded: action.payload,
      };
    case EDIT_NEW_SIGNAL:
      return {
        ...state,
        signaledited: action.payload,
      };
    case CLEAR_ADD_NEW_SIGNAL:
      return {
        ...state,
        signaladded: false,
      };
    case CLEAR_EDIT_NEW_SIGNAL:
      return {
        ...state,
        signaledited: false,
      };
    case CLEAR_PROVIDER_SIGNALS_ACTION: {
      return { ...state, signals: [], signalcount: 0, fetching: false };
    }
    case CLEAR_GET_ALL_CURRENCY_PAIR: {
      return { ...state, currencies: [] };
    }
    case ACTION_LOADING: {
      return { ...state, loading: true };
    }
    default:
      return state;
  }
}
