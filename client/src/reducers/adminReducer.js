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
  ADD_NEW_CURRENCY,
  CLEAR_ADD_NEW_CURRENCY,
  UPDATE_CURRENCY,
  CLEAR_UPDATE_CURRENCY,
  ADD_NEW_ADMIN,
  CLEAR_ADD_NEW_ADMIN,
  ADD_NEW_PROVIDER,
  CLEAR_ADD_NEW_PROVIDER,
  UPDATE_ADMIN,
  CLEAR_UPDATE_ADMIN,
  CLEAR_UPDATE_BONUS,
  UPDATE_BONUS,
  DELETE_ANNOUNCEMENT,
  CLEAR_DELETE_ANNOUNCEMENT,
  ADD_ANNOUNCEMENT,
  CLEAR_ADD_ANNOUNCEMENT,
  EDIT_ANNOUNCEMENT,
  CLEAR_EDIT_ANNOUNCEMENT,
  GET_ADMIN_SETTINGS,
  CLEAR_GET_ADMIN_SETTINGS,
  ADMIN_UPDATE_MODE,
  CLEAR_ADMIN_UPDATE_MODE,
  ADMIN_UPDATE_PROFILE,
  CLEAR_ADMIN_UPDATE_PROFILE,
  ADMIN_UPDATE_PASSWORD,
  CLEAR_ADMIN_UPDATE_PASSWORD,
  GET_ALL_WALLETS,
  CLEAR_WALLETS_ACTION,
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
  wallets: [],
  walletcount: 0,
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
  updatecurrency: false,
  addcurrency: false,
  addadmin: false,
  addprovider: false,
  updateadmin: false,
  updatebonus: false,
  deleteann: false,
  editann: false,
  addann: false,
  adminsettings: null,
  setmode: false,
  setprofile: false,
  setpass: false,
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
    case GET_ALL_WALLETS:
      return {
        ...state,
        walletcount: action.payload.shift(),
        wallets: [...state.wallets, ...action.payload],
        loading: false,
        fetching: true,
      };
    case ADD_NEW_CURRENCY:
      return {
        ...state,
        addcurrency: action.payload,
        loading: false,
      };
    case UPDATE_CURRENCY:
      return {
        ...state,
        updatecurrency: action.payload,
        loading: false,
      };
    case ADD_NEW_ADMIN:
      return {
        ...state,
        addadmin: action.payload,
        loading: false,
      };
    case ADD_NEW_PROVIDER:
      return {
        ...state,
        addprovider: action.payload,
        loading: false,
      };
    case UPDATE_ADMIN:
      return {
        ...state,
        updateadmin: action.payload,
        loading: false,
      };
    case UPDATE_BONUS:
      return {
        ...state,
        updatebonus: action.payload,
        loading: false,
      };
    case DELETE_ANNOUNCEMENT:
      return {
        ...state,
        deleteann: action.payload,
        loading: false,
      };
    case ADD_ANNOUNCEMENT:
      return {
        ...state,
        addann: action.payload,
        loading: false,
      };
    case EDIT_ANNOUNCEMENT:
      return {
        ...state,
        editann: action.payload,
        loading: false,
      };
    case GET_ADMIN_SETTINGS:
      return {
        ...state,
        adminsettings: action.payload,
        loading: false,
      };
    case ADMIN_UPDATE_MODE:
      return {
        ...state,
        setmode: action.payload,
        loading: false,
      };
    case ADMIN_UPDATE_PROFILE:
      return {
        ...state,
        setprofile: action.payload,
        loading: false,
      };

    case ADMIN_UPDATE_PASSWORD:
      return {
        ...state,
        setpass: action.payload,
        loading: false,
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
      return { ...state, admins: [], adCount: 0, fetching: false };
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
    case CLEAR_UPDATE_CURRENCY: {
      return { ...state, updatecurrency: false };
    }
    case CLEAR_ADD_NEW_CURRENCY: {
      return { ...state, addcurrency: false };
    }
    case CLEAR_ADD_NEW_ADMIN: {
      return { ...state, addadmin: false };
    }
    case CLEAR_ADD_NEW_PROVIDER: {
      return { ...state, addprovider: false };
    }
    case CLEAR_UPDATE_ADMIN: {
      return { ...state, updateadmin: false };
    }
    case CLEAR_UPDATE_BONUS: {
      return { ...state, updatebonus: false };
    }
    case CLEAR_DELETE_ANNOUNCEMENT: {
      return { ...state, deleteann: false };
    }
    case CLEAR_ADD_ANNOUNCEMENT: {
      return { ...state, addann: false };
    }
    case CLEAR_EDIT_ANNOUNCEMENT: {
      return { ...state, editann: false };
    }
    case CLEAR_GET_ADMIN_SETTINGS: {
      return { ...state, adminsettings: null };
    }
    case CLEAR_ADMIN_UPDATE_MODE: {
      return { ...state, setmode: false };
    }
    case CLEAR_ADMIN_UPDATE_PROFILE: {
      return { ...state, setprofile: false };
    }
    case CLEAR_ADMIN_UPDATE_PASSWORD: {
      return { ...state, setpass: false };
    }
    default:
      return state;
  }
}
