import {
  GET_ALL_SUBSCRIPTIONS,
  CLEAR_SUBSCRIPTIONS_ACTION,
  ACTION_LOADING,
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
  GET_ALL_ADMINS,
  CLEAR_ADMINS_ACTION,
  GET_ALL_PROVIDERS,
  CLEAR_PROVIDERS_ACTION,
  GET_ALL_SIGNALS,
  CLEAR_SIGNALS_ACTION,
  CLEAR_ACCOUNTS_ACTION,
  GET_ALL_ACCOUNTS,
  CLEAR_ANNOUNCEMENTS_ACTION,
  GET_ALL_ANNOUNCEMENTS,
  GET_ALL_WITHDRAWALS,
  CLEAR_WITHDRAWALS_ACTION,
} from "../action/types";

const initialState = {
  sub: [],
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
  admins: [],
  adCount: 0,
  providers: [],
  prCount: 0,
  signals: [],
  signalCount: 0,
  accounts: [],
  accCounts: 0,
  ann: [],
  annCount: 0,
  withcount: 0,
  withdrawals: [],
};

export default function adminReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_SUBSCRIPTIONS:
      let subCount = action.payload.shift();
      return {
        ...state,
        sub: [...state.sub, ...action.payload],
        subCount,
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
    case GET_ALL_ADMINS:
      let adCount = action.payload.shift();
      return {
        ...state,
        admins: [...state.admins, ...action.payload],
        adCount,
        loading: false,
        fetching: true,
      };
    case GET_ALL_PROVIDERS:
      let prCount = action.payload.shift();
      return {
        ...state,
        providers: [...state.providers, ...action.payload],
        prCount,
        loading: false,
        fetching: true,
      };
    case GET_ALL_SIGNALS:
      let signalCount = action.payload.shift();
      return {
        ...state,
        signals: [...state.signals, ...action.payload],
        signalCount,
        loading: false,
        fetching: true,
      };
    case GET_ALL_ACCOUNTS:
      let accCount = action.payload.shift();
      return {
        ...state,
        accounts: [...state.accounts, ...action.payload],
        accCount,
        loading: false,
        fetching: true,
      };
    case GET_ALL_ANNOUNCEMENTS:
      return {
        ...state,
        annCount: action.payload.shift(),
        ann: [...state.ann, ...action.payload],
        loading: false,
        fetching: true,
      };
    case GET_ALL_WITHDRAWALS:
      return {
        ...state,
        withcount: action.payload.shift(),
        withdrawals: [...state.withdrawals, ...action.payload],
        loading: false,
        fetching: true,
      };
    case ACTION_LOADING: {
      return { ...state, loading: true };
    }
    case CLEAR_SUBSCRIPTIONS_ACTION: {
      return { ...state, sub: [], subCount: 0, fetching: false };
    }
    case CLEAR_TRANSACTIONS_ACTION: {
      return { ...state, trans: [], transCount: 0, fetching: false };
    }
    case CLEAR_USERS_ACTION: {
      return { ...state, users: [], usersCount: 0, fetching: false };
    }
    case CLEAR_CURRENCY_ACTION: {
      return { ...state, currency: [], curCount: 0, fetching: false };
    }
    case CLEAR_REFERRALS_ACTION: {
      return { ...state, referrals: [], refCount: 0, fetching: false };
    }
    case CLEAR_BONUS_ACTION: {
      return { ...state, bonus: [], bonusCount: 0, fetching: false };
    }
    case CLEAR_ADMINS_ACTION: {
      return { ...state, admin: [], adCount: 0, fetching: false };
    }
    case CLEAR_PROVIDERS_ACTION: {
      return { ...state, providers: [], prCount: 0, fetching: false };
    }
    case CLEAR_SIGNALS_ACTION: {
      return { ...state, signals: [], signalCount: 0, fetching: false };
    }
    case CLEAR_ACCOUNTS_ACTION: {
      return { ...state, accounts: [], accCount: 0, fetching: false };
    }
    case CLEAR_ANNOUNCEMENTS_ACTION: {
      return { ...state, ann: [], annCount: 0, fetching: false };
    }
    case CLEAR_WITHDRAWALS_ACTION: {
      return { ...state, withdrawals: [], withcount: 0, fetching: false };
    }
    default:
      return state;
  }
}
