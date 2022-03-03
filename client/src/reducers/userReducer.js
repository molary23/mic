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
    default:
      return state;
  }
}
