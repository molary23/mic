import {
  GET_USER_SIGNALS,
  ACTION_LOADING,
  CLEAR_USER_SIGNALS_ACTION,
  GET_USER_REFERRALS,
  CLEAR_USER_REFERRALS_ACTION,
  GET_USER_SUBSCRIPTIONS,
  CLEAR_USER_SUBSCRIPTIONS_ACTION,
  GET_USER_TRANSACTIONS,
  CLEAR_USER_TRANSACTIONS_ACTION,
  GET_USER_PAYMENTS,
  CLEAR_USER_PAYMENTS_ACTION,
  GET_USER_WITHDRAWALS,
  CLEAR_USER_WITHDRAWALS_ACTION,
  GET_USER_BONUS,
  CLEAR_USER_BONUS_ACTION,
  GET_PREMIUM_STATUS,
  CLEAR_GET_PREMIUM_STATUS,
  GET_DASHBOARD_DETAILS,
  CLEAR_GET_DASHBOARD_DETAILS,
  GET_USER_SETTINGS,
  CLEAR_GET_USER_SETTINGS,
  USER_GET_CURRENCY,
  CLEAR_USER_GET_CURRENCY,
  USER_GET_PROVIDERS,
  CLEAR_USER_GET_PROVIDERS,
  USER_SET_CURRENCY,
  CLEAR_USER_SET_CURRENCY,
  USER_SET_PROVIDERS,
  CLEAR_USER_SET_PROVIDERS,
} from "../action/types";

const initialState = {
  signals: [],
  loading: false,
  fetching: false,
  signalcount: 0,
  referrals: [],
  referralcount: 0,
  sub: [],
  subcount: 0,
  transcount: 0,
  transactions: [],
  pay: [],
  paycount: 0,
  withcount: 0,
  withdrawals: [],
  bonus: [],
  bonuscount: 0,
  premium: null,
  userdetails: null,
  usersettings: null,
  usercurrencies: [],
  userproviders: [],
  setcurrency: false,
  setprovider: false,
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
    case GET_USER_REFERRALS:
      return {
        ...state,
        referralcount: action.payload.shift(),
        referrals: [...state.referrals, ...action.payload],
        loading: false,
        fetching: true,
      };
    case GET_USER_SUBSCRIPTIONS:
      return {
        ...state,
        subcount: action.payload.shift(),
        sub: [...state.sub, ...action.payload],
        loading: false,
        fetching: true,
      };
    case GET_USER_TRANSACTIONS:
      return {
        ...state,
        transcount: action.payload.shift(),
        transactions: [...state.transactions, ...action.payload],
        loading: false,
        fetching: true,
      };
    case GET_USER_PAYMENTS:
      return {
        ...state,
        paycount: action.payload.shift(),
        pay: [...state.pay, ...action.payload],
        loading: false,
        fetching: true,
      };
    case GET_USER_WITHDRAWALS:
      return {
        ...state,
        withcount: action.payload.shift(),
        withdrawals: [...state.withdrawals, ...action.payload],
        loading: false,
        fetching: true,
      };
    case GET_USER_BONUS:
      return {
        ...state,
        bonuscount: action.payload.shift(),
        bonus: [...state.bonus, ...action.payload],
        loading: false,
        fetching: true,
      };
    case GET_PREMIUM_STATUS:
      return {
        ...state,
        premium: action.payload,
      };
    case GET_DASHBOARD_DETAILS:
      return {
        ...state,
        userdetails: action.payload,
        loading: false,
      };
    case GET_USER_SETTINGS:
      return {
        ...state,
        usersettings: action.payload,
        loading: false,
      };
    case USER_GET_CURRENCY:
      return {
        ...state,
        usercurrencies: action.payload,
        loading: false,
      };
    case USER_GET_PROVIDERS:
      return {
        ...state,
        userproviders: action.payload,
        loading: false,
      };
    case USER_SET_PROVIDERS:
      return {
        ...state,
        setprovider: action.payload,
        loading: false,
      };
    case USER_SET_CURRENCY:
      return {
        ...state,
        setcurrency: action.payload,
        loading: false,
      };
    case ACTION_LOADING: {
      return { ...state, loading: true };
    }
    case CLEAR_USER_SIGNALS_ACTION: {
      return { ...state, signals: [], signalcount: 0, fetching: false };
    }
    case CLEAR_USER_REFERRALS_ACTION: {
      return { ...state, referrals: [], referralcount: 0, fetching: false };
    }
    case CLEAR_USER_SUBSCRIPTIONS_ACTION: {
      return { ...state, sub: [], subcount: 0, fetching: false };
    }
    case CLEAR_USER_TRANSACTIONS_ACTION: {
      return { ...state, transactions: [], transcount: 0, fetching: false };
    }
    case CLEAR_USER_PAYMENTS_ACTION: {
      return { ...state, pay: [], paycount: 0, fetching: false };
    }
    case CLEAR_USER_WITHDRAWALS_ACTION: {
      return { ...state, withdrawals: [], withcount: 0, fetching: false };
    }
    case CLEAR_USER_BONUS_ACTION: {
      return { ...state, bonus: [], bonuscount: 0, fetching: false };
    }
    case CLEAR_GET_PREMIUM_STATUS: {
      return { ...state, premium: [] };
    }
    case CLEAR_GET_DASHBOARD_DETAILS: {
      return { ...state, userdetails: null };
    }
    case CLEAR_GET_USER_SETTINGS: {
      return { ...state, usersettings: null };
    }
    case CLEAR_USER_GET_CURRENCY: {
      return { ...state, usercurrencies: null };
    }
    case CLEAR_USER_GET_PROVIDERS: {
      return { ...state, userproviders: null };
    }
    case CLEAR_USER_SET_PROVIDERS: {
      return { ...state, setprovider: false };
    }
    case CLEAR_USER_SET_CURRENCY: {
      return { ...state, setcurrency: false };
    }
    default:
      return state;
  }
}
