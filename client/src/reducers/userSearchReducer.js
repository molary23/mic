import {
  GET_USER_SEARCH_SIGNALS,
  ACTION_LOADING,
  CLEAR_USERS_SIGNALS_SEARCH,
  GET_USER_SEARCH_REFERRALS,
  CLEAR_USERS_REFERRALS_SEARCH,
  GET_USER_SEARCH_SUBSCRIPTIONS,
  CLEAR_USERS_SUBSCRIPTIONS_SEARCH,
  GET_USER_SEARCH_TRANSACTIONS,
  CLEAR_USERS_TRANSACTIONS_SEARCH,
  GET_USER_SEARCH_PAYMENTS,
  CLEAR_USERS_PAYMENTS_SEARCH,
  GET_USER_SEARCH_WITHDRAWALS,
  CLEAR_USERS_WITHDRAWALS_SEARCH,
  GET_USER_SEARCH_BONUS,
  CLEAR_USERS_BONUS_SEARCH,
} from "../action/types";

const initialState = {
  signals: [],
  loading: false,
  searching: false,
  signalcount: 0,
  referrals: [],
  referralcount: 0,
  sub: [],
  subcount: 0,
  transactions: [],
  transcount: 0,
  pay: [],
  paycount: 0,
  withcount: 0,
  withdrawals: [],
  bonus: [],
  bonuscount: 0,
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
    case GET_USER_SEARCH_REFERRALS:
      return {
        ...state,
        referralcount: action.payload.shift(),
        referrals: [...state.referrals, ...action.payload],
        loading: false,
        searching: true,
      };
    case GET_USER_SEARCH_SUBSCRIPTIONS:
      return {
        ...state,
        subcount: action.payload.shift(),
        sub: [...state.sub, ...action.payload],
        loading: false,
        searching: true,
      };
    case GET_USER_SEARCH_TRANSACTIONS:
      return {
        ...state,
        transcount: action.payload.shift(),
        transactions: [...state.transactions, ...action.payload],
        loading: false,
        searching: true,
      };
    case GET_USER_SEARCH_PAYMENTS:
      return {
        ...state,
        paycount: action.payload.shift(),
        pay: [...state.pay, ...action.payload],
        loading: false,
        searching: true,
      };
    case GET_USER_SEARCH_WITHDRAWALS:
      return {
        ...state,
        withcount: action.payload.shift(),
        withdrawals: [...state.withdrawals, ...action.payload],
        loading: false,
        searching: true,
      };
    case GET_USER_SEARCH_BONUS:
      return {
        ...state,
        bonuscount: action.payload.shift(),
        bonus: [...state.bonus, ...action.payload],
        loading: false,
        searching: true,
      };
    case ACTION_LOADING: {
      return { ...state, loading: true };
    }
    case CLEAR_USERS_SIGNALS_SEARCH: {
      return { ...state, signals: [], signalcount: 0, searching: false };
    }
    case CLEAR_USERS_REFERRALS_SEARCH: {
      return { ...state, referrals: [], referralcount: 0, searching: false };
    }
    case CLEAR_USERS_SUBSCRIPTIONS_SEARCH: {
      return { ...state, sub: [], subcount: 0, searching: false };
    }
    case CLEAR_USERS_TRANSACTIONS_SEARCH: {
      return { ...state, transactions: [], transcount: 0, searching: false };
    }
    case CLEAR_USERS_PAYMENTS_SEARCH: {
      return { ...state, pay: [], paycount: 0, searching: false };
    }
    case CLEAR_USERS_WITHDRAWALS_SEARCH: {
      return { ...state, withdrawals: [], withcount: 0, searching: false };
    }
    case CLEAR_USERS_BONUS_SEARCH: {
      return { ...state, bonus: [], bonuscount: 0, searching: false };
    }
    default:
      return state;
  }
}
