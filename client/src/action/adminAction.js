import axios from "axios";
import {
  GET_ALL_SUBSCRIPTIONS,
  CLEAR_SUBSCRIPTIONS_ACTION,
  ACTION_LOADING,
  GET_ALL_TRANSACTIONS,
  GET_ALL_USERS,
  CLEAR_TRANSACTIONS_ACTION,
  CLEAR_USERS_ACTION,
  GET_ALL_CURRENCY,
  CLEAR_CURRENCY_ACTION,
  CLEAR_PAYMENTS_ACTION,
  GET_ALL_PAYMENTS,
  CLEAR_REFERRALS_ACTION,
  GET_ALL_REFERRALS,
  GET_ALL_BONUS,
  CLEAR_BONUS_ACTION,
  GET_ALL_ADMINS,
  CLEAR_ADMINS_ACTION,
  GET_ALL_PROVIDERS,
  CLEAR_PROVIDERS_ACTION,
  CLEAR_SIGNALS_ACTION,
  GET_ALL_SIGNALS,
} from "./types";

export const getTrans = (paginate) => async (dispatch) => {
  dispatch(setLoading());
  try {
    let response = await axios.post("/api/adminview/transactions/", paginate);
    const result = await dispatch({
      type: GET_ALL_TRANSACTIONS,
      payload: response.data,
    });
    return result;
  } catch (error) {
    dispatch({ type: GET_ALL_TRANSACTIONS, payload: [] });
  }
};

export const getUser = (paginate) => async (dispatch) => {
  dispatch(setLoading());
  try {
    let response = await axios.post("/api/adminview/users/", paginate);
    const result = await dispatch({
      type: GET_ALL_USERS,
      payload: response.data,
    });
    return result;
  } catch (error) {
    dispatch({ type: GET_ALL_USERS, payload: [] });
  }
};

export const getContent = (content, paginate) => async (dispatch) => {
  dispatch(setLoading());
  let url = "/api/adminview/",
    type;
  if (content === "currency") {
    url = `${url}currency`;
    type = GET_ALL_CURRENCY;
  } else if (content === "payments") {
    url = `${url}payments`;
    type = GET_ALL_PAYMENTS;
  } else if (content === "referrals") {
    url = `${url}referrals`;
    type = GET_ALL_REFERRALS;
  } else if (content === "bonus") {
    url = `${url}bonus`;
    type = GET_ALL_BONUS;
  } else if (content === "admins") {
    url = `${url}admins`;
    type = GET_ALL_ADMINS;
    paginate.table = "superadmin";
  } else if (content === "providers") {
    url = `${url}admins`;
    type = GET_ALL_PROVIDERS;
    paginate.table = "providers";
  } else if (content === "signals") {
    url = `${url}signals`;
    type = GET_ALL_SIGNALS;
  } else if (content === "subscriptions") {
    url = `${url}subscriptions`;
    type = GET_ALL_SUBSCRIPTIONS;
  } else if (content === "transactions") {
    url = `${url}transactions`;
    type = GET_ALL_TRANSACTIONS;
  } else if (content === "users") {
    url = `${url}users`;
    type = GET_ALL_USERS;
  }
  try {
    let response = await axios.post(url, paginate);
    const result = await dispatch({
      type,
      payload: response.data,
    });
    return result;
  } catch (error) {
    console.log(error.response);
    dispatch({ type, payload: [] });
  }
};

export const clearActions = (actionToClear) => {
  if (actionToClear === "sub") {
    return { type: CLEAR_SUBSCRIPTIONS_ACTION };
  } else if (actionToClear === "trans") {
    return { type: CLEAR_TRANSACTIONS_ACTION };
  } else if (actionToClear === "users") {
    return { type: CLEAR_USERS_ACTION };
  } else if (actionToClear === "currency") {
    return { type: CLEAR_CURRENCY_ACTION };
  } else if (actionToClear === "payments") {
    return { type: CLEAR_PAYMENTS_ACTION };
  } else if (actionToClear === "referrals") {
    return { type: CLEAR_REFERRALS_ACTION };
  } else if (actionToClear === "bonus") {
    return { type: CLEAR_BONUS_ACTION };
  } else if (actionToClear === "admins") {
    return { type: CLEAR_ADMINS_ACTION };
  } else if (actionToClear === "providers") {
    return { type: CLEAR_PROVIDERS_ACTION };
  } else if (actionToClear === "signals") {
    return { type: CLEAR_SIGNALS_ACTION };
  } else if (actionToClear === "subscriptions") {
    return { type: CLEAR_SUBSCRIPTIONS_ACTION };
  } else if (actionToClear === "transactions") {
    return { type: CLEAR_TRANSACTIONS_ACTION };
  } else if (actionToClear === "users") {
    return { type: CLEAR_USERS_ACTION };
  }
};

export const setLoading = () => {
  return { type: ACTION_LOADING };
};
