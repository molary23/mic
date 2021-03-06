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
  PROVIDER_UPDATE_MODE,
  CLEAR_PROVIDER_UPDATE_MODE,
  PROVIDER_UPDATE_PROFILE,
  PROVIDER_UPDATE_PASSWORD,
  CLEAR_PROVIDER_UPDATE_PROFILE,
  CLEAR_PROVIDER_UPDATE_PASSWORD,
  GET_PROVIDER_SETTINGS,
  CLEAR_GET_PROVIDER_SETTINGS,
  PROVIDER_GET_FOLLOWERS,
  CLEAR_PROVIDER_GET_FOLLOWERS,
} from "../action/types";

const initialState = {
  loading: false,
  fetching: false,
  signals: [],
  signalcount: 0,
  currencies: [],
  signaladded: false,
  signaledited: false,
  providersettings: null,
  setmode: false,
  setprofile: false,
  setpass: false,
  getfollowers: 0,
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
    case GET_PROVIDER_SETTINGS:
      return {
        ...state,
        providersettings: action.payload,
        loading: false,
      };
    case PROVIDER_UPDATE_MODE:
      return {
        ...state,
        setmode: action.payload,
        loading: false,
      };
    case PROVIDER_UPDATE_PROFILE:
      return {
        ...state,
        setprofile: action.payload,
        loading: false,
      };

    case PROVIDER_UPDATE_PASSWORD:
      return {
        ...state,
        setpass: action.payload,
        loading: false,
      };
    case PROVIDER_GET_FOLLOWERS:
      return {
        ...state,
        getfollowers: action.payload,
        loading: false,
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
    case CLEAR_GET_PROVIDER_SETTINGS: {
      return { ...state, providersettings: null };
    }
    case CLEAR_PROVIDER_UPDATE_MODE: {
      return { ...state, setmode: false };
    }
    case CLEAR_PROVIDER_UPDATE_PROFILE: {
      return { ...state, setprofile: false };
    }
    case CLEAR_PROVIDER_UPDATE_PASSWORD: {
      return { ...state, setpass: false };
    }
    case CLEAR_PROVIDER_GET_FOLLOWERS: {
      return { ...state, getfollowers: false };
    }
    default:
      return state;
  }
}
