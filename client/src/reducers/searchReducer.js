import {
  ACTION_LOADING,
  GET_SEARCH_SUBSCRIPTIONS,
  CLEAR_SEARCH_SUBSCRIPTIONS_ACTION,
  GET_SEARCH_TRANSACTIONS,
  CLEAR_SEARCH_TRANSACTIONS_ACTION,
  GET_SEARCH_USERS,
  GET_SEARCH_CURRENCY,
  CLEAR_SEARCH_CURRENCY_ACTION,
  CLEAR_SEARCH_PAYMENTS_ACTION,
  GET_SEARCH_PAYMENTS,
  GET_SEARCH_REFERRALS,
  CLEAR_SEARCH_REFERRALS_ACTION,
  GET_SEARCH_BONUS,
  CLEAR_SEARCH_ADMINS_ACTION,
  CLEAR_SEARCH_PROVIDERS_ACTION,
  GET_SEARCH_ADMINS,
  GET_SEARCH_PROVIDERS,
} from "../action/types";

const initialState = {
  trans: [],
  searching: false,
  loading: false,
  transCount: 0,
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
  admins: [],
  adCounts: 0,
  providers: [],
  prCount: 0,
};

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_LOADING: {
      return { ...state, loading: true };
    }
    case GET_SEARCH_SUBSCRIPTIONS:
      return {
        ...state,
        sub: [...state.sub, ...action.payload],
        loading: false,
        searching: true,
      };
    case GET_SEARCH_TRANSACTIONS:
      let countTrans = action.payload.shift();
      return {
        ...state,
        trans: [...state.trans, ...action.payload],
        transCount: countTrans,
        loading: false,
        searching: true,
      };
    case GET_SEARCH_USERS:
      let countUser = action.payload.shift();
      return {
        ...state,
        users: [...state.users, ...action.payload],
        transCount: countUser,
        loading: false,
        searching: true,
      };
    case GET_SEARCH_CURRENCY:
      let curCount = action.payload.shift();
      return {
        ...state,
        currency: [...state.currency, ...action.payload],
        curCount,
        loading: false,
        searching: true,
      };
    case GET_SEARCH_PAYMENTS:
      let payCount = action.payload.shift();
      return {
        ...state,
        pay: [...state.pay, ...action.payload],
        payCount,
        loading: false,
        searching: true,
      };
    case GET_SEARCH_REFERRALS:
      let refCount = action.payload.shift();
      return {
        ...state,
        referrals: [...state.referrals, ...action.payload],
        refCount,
        loading: false,
        searching: true,
      };
    case GET_SEARCH_BONUS:
      let bonusCount = action.payload.shift();
      return {
        ...state,
        bonus: [...state.bonus, ...action.payload],
        bonusCount,
        loading: false,
        searching: true,
      };
    case GET_SEARCH_ADMINS:
      let adCount = action.payload.shift();
      return {
        ...state,
        admins: [...state.admins, ...action.payload],
        adCount,
        loading: false,
        searching: true,
      };
    case GET_SEARCH_PROVIDERS:
      let prCount = action.payload.shift();
      return {
        ...state,
        providers: [...state.providers, ...action.payload],
        prCount,
        loading: false,
        searching: true,
      };
    case CLEAR_SEARCH_SUBSCRIPTIONS_ACTION:
      return {
        ...state,
        sub: [],
        searching: false,
      };
    case CLEAR_SEARCH_TRANSACTIONS_ACTION:
      return {
        ...state,
        trans: [],
        searching: false,
      };
    case CLEAR_SEARCH_CURRENCY_ACTION:
      return {
        ...state,
        currency: [],
        searching: false,
      };
    case CLEAR_SEARCH_PAYMENTS_ACTION:
      return {
        ...state,
        pay: [],
        searching: false,
      };
    case CLEAR_SEARCH_REFERRALS_ACTION:
      return {
        ...state,
        referrals: [],
        searching: false,
      };
    case CLEAR_SEARCH_ADMINS_ACTION:
      return {
        ...state,
        admins: [],
        searching: false,
      };
    case CLEAR_SEARCH_PROVIDERS_ACTION:
      return {
        ...state,
        providers: [],
        searching: false,
      };
    default:
      return state;
  }
}
