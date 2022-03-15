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
  GET_SEARCH_SIGNALS,
  CLEAR_SEARCH_SIGNALS_ACTION,
  CLEAR_SEARCH_ACCOUNTS_ACTION,
  GET_SEARCH_ACCOUNTS,
  CLEAR_SEARCH_ANNOUNCEMENTS_ACTION,
  GET_SEARCH_ANNOUNCEMENTS,
  CLEAR_SEARCH_USERS_ACTION,
  GET_SEARCH_WITHDRAWALS,
  CLEAR_SEARCH_WITHDRAWALS_ACTION,
  GET_SEARCH_WALLETS,
  CLEAR_SEARCH_WALLETS_ACTION,
  ADMIN_SEARCH_FORUM,
  CLEAR_ADMIN_SEARCH_FORUM,
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
  signalCount: 0,
  signals: [],
  sub: [],
  subCount: 0,
  accounts: [],
  accCount: 0,
  ann: [],
  annCount: 0,
  withcount: 0,
  withdrawals: [],
  wallets: [],
  walletcount: 0,
  forumscount: 0,
  forums: [],
};

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_LOADING: {
      return { ...state, loading: true };
    }
    case GET_SEARCH_SUBSCRIPTIONS:
      let subCount = action.payload.shift();
      return {
        ...state,
        sub: [...state.sub, ...action.payload],
        subCount,
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
    case GET_SEARCH_SIGNALS:
      let signalCount = action.payload.shift();
      return {
        ...state,
        signals: [...state.signals, ...action.payload],
        signalCount,
        loading: false,
        searching: true,
      };
    case GET_SEARCH_ACCOUNTS:
      let accCount = action.payload.shift();
      return {
        ...state,
        accounts: [...state.accounts, ...action.payload],
        accCount,
        loading: false,
        searching: true,
      };
    case GET_SEARCH_ANNOUNCEMENTS:
      return {
        ...state,
        annCount: action.payload.shift(),
        ann: [...state.ann, ...action.payload],
        loading: false,
        searching: true,
      };
    case GET_SEARCH_WITHDRAWALS:
      return {
        ...state,
        withcount: action.payload.shift(),
        withdrawals: [...state.withdrawals, ...action.payload],
        loading: false,
        searching: true,
      };
    case GET_SEARCH_WALLETS:
      return {
        ...state,
        walletcount: action.payload.shift(),
        wallets: [...state.wallets, ...action.payload],
        loading: false,
        searching: true,
      };
    case ADMIN_SEARCH_FORUM:
      return {
        ...state,
        forumscount: action.payload.shift(),
        forums: [...state.forums, ...action.payload],
        loading: false,
        searching: true,
      };
    case CLEAR_SEARCH_SUBSCRIPTIONS_ACTION:
      return {
        ...state,
        sub: [],
        subCount: 0,
        searching: false,
      };
    case CLEAR_SEARCH_TRANSACTIONS_ACTION:
      return {
        ...state,
        trans: [],
        transCount: 0,
        searching: false,
      };
    case CLEAR_SEARCH_CURRENCY_ACTION:
      return {
        ...state,
        currency: [],
        curCount: 0,
        searching: false,
      };
    case CLEAR_SEARCH_PAYMENTS_ACTION:
      return {
        ...state,
        pay: [],
        payCount: 0,
        searching: false,
      };
    case CLEAR_SEARCH_REFERRALS_ACTION:
      return {
        ...state,
        referrals: [],
        refCount: 0,
        searching: false,
      };
    case CLEAR_SEARCH_ADMINS_ACTION:
      return {
        ...state,
        admins: [],
        adCount: 0,
        searching: false,
      };
    case CLEAR_SEARCH_PROVIDERS_ACTION:
      return {
        ...state,
        providers: [],
        prCount: 0,
        searching: false,
      };
    case CLEAR_SEARCH_SIGNALS_ACTION:
      return {
        ...state,
        signals: [],
        signalCount: 0,
        searching: false,
      };
    case CLEAR_SEARCH_ACCOUNTS_ACTION:
      return {
        ...state,
        accounts: [],
        accCount: 0,
        searching: false,
      };
    case CLEAR_SEARCH_ANNOUNCEMENTS_ACTION:
      return {
        ...state,
        ann: [],
        annCount: 0,
        searching: false,
      };
    case CLEAR_SEARCH_USERS_ACTION:
      return {
        ...state,
        users: [],
        usersCount: 0,
        searching: false,
      };
    case CLEAR_SEARCH_WITHDRAWALS_ACTION:
      return {
        ...state,
        withdrawals: [],
        withcount: 0,
        searching: false,
      };
    case CLEAR_SEARCH_WALLETS_ACTION:
      return {
        ...state,
        wallets: [],
        walletcount: 0,
        searching: false,
      };
    case CLEAR_ADMIN_SEARCH_FORUM: {
      return { ...state, forums: [], forumscount: 0, searching: false };
    }
    default:
      return state;
  }
}
