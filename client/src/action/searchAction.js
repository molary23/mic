import axios from "axios";
import {
  CLEAR_SEARCH_SUBSCRIPTIONS_ACTION,
  ACTION_LOADING,
  GET_SEARCH_SUBSCRIPTIONS,
  CLEAR_SEARCH_TRANSACTIONS_ACTION,
  CLEAR_SEARCH_USERS_ACTION,
  GET_SEARCH_TRANSACTIONS,
  GET_SEARCH_USERS,
  GET_SEARCH_CURRENCY,
  CLEAR_SEARCH_CURRENCY_ACTION,
  GET_SEARCH_PAYMENTS,
  CLEAR_SEARCH_PAYMENTS_ACTION,
  GET_SEARCH_REFERRALS,
  CLEAR_SEARCH_REFERRALS_ACTION,
  CLEAR_SEARCH_BONUS_ACTION,
  GET_SEARCH_BONUS,
  CLEAR_SEARCH_ADMINS_ACTION,
  GET_SEARCH_ADMINS,
  GET_SEARCH_PROVIDERS,
  CLEAR_SEARCH_PROVIDERS_ACTION,
  GET_SEARCH_SIGNALS,
  CLEAR_SEARCH_SIGNALS_ACTION,
  GET_SEARCH_ACCOUNTS,
  CLEAR_SEARCH_ACCOUNTS_ACTION,
  GET_SEARCH_ANNOUNCEMENTS,
  CLEAR_SEARCH_ANNOUNCEMENTS_ACTION,
  GET_SEARCH_WITHDRAWALS,
  CLEAR_SEARCH_WITHDRAWALS_ACTION,
  GET_SEARCH_WALLETS,
  CLEAR_SEARCH_WALLETS_ACTION,
  ADMIN_SEARCH_FORUM,
  CLEAR_ADMIN_SEARCH_FORUM,
  GET_ERRORS,
} from "./types";

export const searchContent = (content, searchData) => async (dispatch) => {
  dispatch(setLoading());
  let url = "/api/adminview/",
    type;
  if (content === "currency") {
    type = GET_SEARCH_CURRENCY;
    url = `${url}currency`;
  } else if (content === "payments") {
    url = `${url}payments`;
    type = GET_SEARCH_PAYMENTS;
  } else if (content === "referrals") {
    url = `${url}referrals`;
    type = GET_SEARCH_REFERRALS;
  } else if (content === "bonus") {
    url = `${url}bonus`;
    type = GET_SEARCH_BONUS;
  } else if (content === "admins") {
    url = `${url}admins`;
    type = GET_SEARCH_ADMINS;
    searchData.table = "superadmin";
  } else if (content === "providers") {
    url = `${url}admins`;
    type = GET_SEARCH_PROVIDERS;
    searchData.table = "providers";
  } else if (content === "signals") {
    url = `${url}signals`;
    type = GET_SEARCH_SIGNALS;
  } else if (content === "subscriptions") {
    url = `${url}subscriptions`;
    type = GET_SEARCH_SUBSCRIPTIONS;
  } else if (content === "transactions") {
    url = `${url}transactions`;
    type = GET_SEARCH_TRANSACTIONS;
  } else if (content === "users") {
    url = `${url}users`;
    type = GET_SEARCH_USERS;
  } else if (content === "accounts") {
    url = `${url}accounts`;
    type = GET_SEARCH_ACCOUNTS;
  } else if (content === "announcements") {
    url = `${url}announcements`;
    type = GET_SEARCH_ANNOUNCEMENTS;
  } else if (content === "withdrawals") {
    url = `${url}withdrawals`;
    type = GET_SEARCH_WITHDRAWALS;
  } else if (content === "wallets") {
    url = `${url}wallets`;
    type = GET_SEARCH_WALLETS;
  } else if (content === "forums") {
    url = `${url}forums`;
    type = ADMIN_SEARCH_FORUM;
  }

  try {
    let response = await axios.post(url, searchData);
    const result = await dispatch({
      type,
      payload: response.data,
    });
    return result;
  } catch (error) {
    let errorMessage = {
      status: error.response.status,
      data: error.response.data,
    };
    dispatch({ type: GET_ERRORS, payload: errorMessage });
  }
};

export const clearSearchActions = (actionToClear) => {
  if (actionToClear === "sub") {
    return { type: CLEAR_SEARCH_SUBSCRIPTIONS_ACTION };
  } else if (actionToClear === "trans") {
    return { type: CLEAR_SEARCH_TRANSACTIONS_ACTION };
  } else if (actionToClear === "users") {
    return { type: CLEAR_SEARCH_USERS_ACTION };
  } else if (actionToClear === "currency") {
    return { type: CLEAR_SEARCH_CURRENCY_ACTION };
  } else if (actionToClear === "payments") {
    return { type: CLEAR_SEARCH_PAYMENTS_ACTION };
  } else if (actionToClear === "referrals") {
    return { type: CLEAR_SEARCH_REFERRALS_ACTION };
  } else if (actionToClear === "bonus") {
    return { type: CLEAR_SEARCH_BONUS_ACTION };
  } else if (actionToClear === "admins") {
    return { type: CLEAR_SEARCH_ADMINS_ACTION };
  } else if (actionToClear === "providers") {
    return { type: CLEAR_SEARCH_PROVIDERS_ACTION };
  } else if (actionToClear === "signals") {
    return { type: CLEAR_SEARCH_SIGNALS_ACTION };
  } else if (actionToClear === "subscriptions") {
    return { type: CLEAR_SEARCH_SUBSCRIPTIONS_ACTION };
  } else if (actionToClear === "transactions") {
    return { type: CLEAR_SEARCH_TRANSACTIONS_ACTION };
  } else if (actionToClear === "users") {
    return { type: CLEAR_SEARCH_USERS_ACTION };
  } else if (actionToClear === "accounts") {
    return { type: CLEAR_SEARCH_ACCOUNTS_ACTION };
  } else if (actionToClear === "announcements") {
    return { type: CLEAR_SEARCH_ANNOUNCEMENTS_ACTION };
  } else if (actionToClear === "withdrawals") {
    return { type: CLEAR_SEARCH_WITHDRAWALS_ACTION };
  } else if (actionToClear === "wallets") {
    return { type: CLEAR_SEARCH_WALLETS_ACTION };
  } else if (actionToClear === "forums") {
    return { type: CLEAR_ADMIN_SEARCH_FORUM };
  }
};
export const setLoading = () => {
  return { type: ACTION_LOADING };
};
