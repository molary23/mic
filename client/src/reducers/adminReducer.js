import {
  GET_ALL_SUBSCRIPTIONS,
  CLEAR_SUBSCRIPTIONS_ACTION,
  ACTION_LOADING,
  GET_SUBSCRIPTION_COUNT,
  GET_ALL_TRANSACTIONS,
  CLEAR_TRANSACTIONS_ACTION,
  GET_ALL_USERS,
  CLEAR_USERS_ACTION,
  GET_ALL_CURRENCY,
  CLEAR_CURRENCY_ACTION,
  GET_ALL_PAYMENTS,
  GET_ALL_REFERRALS,
  CLEAR_REFERRALS_ACTION,
  CLEAR_BONUS_ACTION,
  GET_ALL_BONUS,
} from "../action/types";

const initialState = {
  sub: [],
  subcount: {},
  trans: [],
  loading: false,
  fetching: false,
  transCount: 0,
  subCount: 0,
  users: [],
  usersCount: 0,
  curCount: 0,
  currency: [],
  pay: [],
  payCount: 0,
  referrals: [],
  refCount: 0,
  bonus: [],
  bonusCount: 0,
};

export default function adminReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_SUBSCRIPTIONS:
      return {
        ...state,
        sub: [...state.sub, ...action.payload],
        loading: false,
        fetching: true,
      };
    case GET_ALL_TRANSACTIONS:
      let countTrans = action.payload.shift();
      return {
        ...state,
        trans: [...state.trans, ...action.payload],
        transCount: countTrans,
        loading: false,
        fetching: true,
      };
    case GET_ALL_PAYMENTS:
      let payCount = action.payload.shift();
      return {
        ...state,
        pay: [...state.pay, ...action.payload],
        payCount,
        loading: false,
        fetching: true,
      };
    case GET_ALL_USERS:
      let countUser = action.payload.shift();
      return {
        ...state,
        users: [...state.users, ...action.payload],
        usersCount: countUser,
        loading: false,
        fetching: true,
      };
    case GET_ALL_CURRENCY:
      let curCount = action.payload.shift();
      return {
        ...state,
        currency: [...state.currency, ...action.payload],
        curCount,
        loading: false,
        fetching: true,
      };
    case GET_ALL_REFERRALS:
      let refCount = action.payload.shift();
      return {
        ...state,
        referrals: [...state.referrals, ...action.payload],
        refCount,
        loading: false,
        fetching: true,
      };
    case GET_ALL_BONUS:
      let bonusCount = action.payload.shift();
      return {
        ...state,
        bonus: [...state.bonus, ...action.payload],
        bonusCount,
        loading: false,
        fetching: true,
      };
    case GET_SUBSCRIPTION_COUNT: {
      return { ...state, subcount: action.payload };
    }
    case ACTION_LOADING: {
      return { ...state, loading: true };
    }
    case CLEAR_SUBSCRIPTIONS_ACTION: {
      return { ...state, sub: [], fetching: false };
    }
    case CLEAR_TRANSACTIONS_ACTION: {
      return { ...state, trans: [], fetching: false };
    }
    case CLEAR_USERS_ACTION: {
      return { ...state, users: [], fetching: false };
    }
    case CLEAR_CURRENCY_ACTION: {
      return { ...state, currency: [], fetching: false };
    }
    case CLEAR_REFERRALS_ACTION: {
      return { ...state, referrals: [], fetching: false };
    }
    case CLEAR_BONUS_ACTION: {
      return { ...state, bonus: [], fetching: false };
    }
    default:
      return state;
  }
}
