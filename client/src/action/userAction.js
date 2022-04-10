import axios from "axios";
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
  CLEAR_ERRORS,
  GET_USER_SETTINGS,
  CLEAR_GET_USER_SETTINGS,
  USER_GET_CURRENCY,
  CLEAR_USER_GET_CURRENCY,
  USER_GET_PROVIDERS,
  CLEAR_USER_GET_PROVIDERS,
  GET_ERRORS,
  USER_SET_CURRENCY,
  CLEAR_USER_SET_CURRENCY,
  USER_SET_PROVIDERS,
  CLEAR_USER_SET_PROVIDERS,
  USER_UPDATE_CURRENCY,
  CLEAR_USER_UPDATE_CURRENCY,
  USER_UPDATE_PROVIDERS,
  CLEAR_USER_UPDATE_PROVIDERS,
  USER_UPDATE_NOTIFY,
  CLEAR_USER_UPDATE_NOTIFY,
  USER_UPDATE_MODE,
  CLEAR_USER_UPDATE_MODE,
  USER_UPDATE_PROFILE,
  CLEAR_USER_UPDATE_PROFILE,
  USER_GET_WALLET,
  CLEAR_USER_GET_WALLET,
  USER_UPDATE_ACCOUNT,
  CLEAR_USER_UPDATE_ACCOUNT,
  USER_UPDATE_PASSWORD,
  CLEAR_USER_UPDATE_PASSWORD,
  USER_GET_BALANCE,
  CLEAR_USER_GET_BALANCE,
  USER_GET_ACCOUNT,
  CLEAR_USER_GET_ACCOUNT,
  USER_REQUEST_WITHDRAWAL,
  CLEAR_USER_REQUEST_WITHDRAWAL,
  USER_GET_FORUM,
  CLEAR_USER_GET_FORUM,
  USER_ADD_FORUM,
  CLEAR_USER_ADD_FORUM,
  USER_UPDATE_FORUM,
  CLEAR_USER_UPDATE_FORUM,
  USER_GET_A_FORUM,
  CLEAR_USER_GET_A_FORUM,
  USER_REPLY,
  CLEAR_USER_REPLY,
  USER_DELETE_REPLY,
  CLEAR_USER_DELETE_REPLY,
  USER_MAKE_PAYMENT,
  CLEAR_USER_MAKE_PAYMENT,
} from "./types";

import { getAllCounts, getMode } from "./authAction";
import encrypt from "../util/encrypt";

export const getContent = (content, paginate) => async (dispatch) => {
  dispatch(setLoading());
  dispatch(clearErrors());
  let url = "/api/userview/",
    type;
  if (content === "signals") {
    type = GET_USER_SIGNALS;
  } else if (content === "referrals") {
    type = GET_USER_REFERRALS;
  } else if (content === "subscriptions") {
    type = GET_USER_SUBSCRIPTIONS;
  } else if (content === "transactions") {
    type = GET_USER_TRANSACTIONS;
  } else if (content === "payments") {
    type = GET_USER_PAYMENTS;
  } else if (content === "withdrawals") {
    type = GET_USER_WITHDRAWALS;
  } else if (content === "bonus") {
    type = GET_USER_BONUS;
  } else if (content === "forums") {
    type = USER_GET_FORUM;
  }
  url += content;
  try {
    let response = await axios.post(url, paginate);
    const result = await dispatch({
      type,
      payload: response.data,
    });
    return result;
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response });
  }
};

export const clearActions = (actionToClear) => {
  if (actionToClear === "signals") {
    return { type: CLEAR_USER_SIGNALS_ACTION };
  } else if (actionToClear === "referrals") {
    return { type: CLEAR_USER_REFERRALS_ACTION };
  } else if (actionToClear === "subscriptions") {
    return { type: CLEAR_USER_SUBSCRIPTIONS_ACTION };
  } else if (actionToClear === "transactions") {
    return { type: CLEAR_USER_TRANSACTIONS_ACTION };
  } else if (actionToClear === "payments") {
    return { type: CLEAR_USER_PAYMENTS_ACTION };
  } else if (actionToClear === "withdrawals") {
    return { type: CLEAR_USER_WITHDRAWALS_ACTION };
  } else if (actionToClear === "bonus") {
    return { type: CLEAR_USER_BONUS_ACTION };
  } else if (actionToClear === "premium") {
    return { type: CLEAR_GET_PREMIUM_STATUS };
  } else if (actionToClear === "user-details") {
    return { type: CLEAR_GET_DASHBOARD_DETAILS };
  } else if (actionToClear === "user-settings") {
    return { type: CLEAR_GET_USER_SETTINGS };
  } else if (actionToClear === "user-currency") {
    return { type: CLEAR_USER_GET_CURRENCY };
  } else if (actionToClear === "user-provider") {
    return { type: CLEAR_USER_GET_PROVIDERS };
  } else if (actionToClear === "user-wallet") {
    return { type: CLEAR_USER_GET_WALLET };
  } else if (actionToClear === "user-balance") {
    return { type: CLEAR_USER_GET_BALANCE };
  } else if (actionToClear === "user-account") {
    return { type: CLEAR_USER_GET_ACCOUNT };
  } else if (actionToClear === "user-payout") {
    return { type: CLEAR_USER_REQUEST_WITHDRAWAL };
  } else if (actionToClear === "forums") {
    return { type: CLEAR_USER_GET_FORUM };
  } else if (actionToClear === "add-forum") {
    return { type: CLEAR_USER_ADD_FORUM };
  } else if (actionToClear === "update-forum") {
    return { type: CLEAR_USER_UPDATE_FORUM };
  } else if (actionToClear === "get-forum") {
    return { type: CLEAR_USER_GET_A_FORUM };
  } else if (actionToClear === "user-reply") {
    return { type: CLEAR_USER_REPLY };
  } else if (actionToClear === "delete-reply") {
    return { type: CLEAR_USER_DELETE_REPLY };
  } else if (actionToClear === "make-payment") {
    return { type: CLEAR_USER_MAKE_PAYMENT };
  }
};

export const setLoading = () => {
  return { type: ACTION_LOADING };
};

export const getPremium = () => async (dispatch) => {
  dispatch(clearActions("premium"));
  try {
    let response = await axios.get("/api/userview/premium");
    let premium = encrypt(JSON.stringify(response.data), "local");
    localStorage.setItem("premium", premium);
    const result = await dispatch({
      type: GET_PREMIUM_STATUS,
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

export const getUserDetails = () => async (dispatch) => {
  dispatch(clearErrors());
  dispatch(setLoading());
  dispatch(clearActions("user-details"));
  try {
    let response = await axios.get("/api/userview/details");
    const result = await dispatch({
      type: GET_DASHBOARD_DETAILS,
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

// Clear Errors
export const clearErrors = () => {
  return { type: CLEAR_ERRORS, payload: {} };
};

export const getUserSettings = () => async (dispatch) => {
  dispatch(clearErrors());
  dispatch(setLoading());
  dispatch(clearActions("user-settings"));
  try {
    let response = await axios.get("/api/users/settings");
    const result = await dispatch({
      type: GET_USER_SETTINGS,
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

export const getBalance = () => async (dispatch) => {
  dispatch(clearErrors());
  dispatch(setLoading());
  dispatch(clearActions("user-balance"));
  try {
    let response = await axios.get("/api/userview/balance");
    const result = await dispatch({
      type: USER_GET_BALANCE,
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

export const getAccount = () => async (dispatch) => {
  dispatch(clearErrors());
  dispatch(setLoading());
  dispatch(clearActions("user-account"));
  try {
    let response = await axios.get("/api/userview/account");
    const result = await dispatch({
      type: USER_GET_ACCOUNT,
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

export const getForum = (id) => async (dispatch) => {
  // dispatch(clearErrors());
  dispatch(setLoading());
  dispatch(clearActions("get-forum"));
  try {
    let response = await axios.get(`/api/userview/forum/:${id}`);
    const result = await dispatch({
      type: USER_GET_A_FORUM,
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

export const requestWithdrawal = (withdata) => async (dispatch) => {
  dispatch(clearErrors());
  //  dispatch(setLoading());
  dispatch(clearActions("user-account"));
  try {
    let response = await axios.post("/api/users/withdrawals", withdata);
    const result = await dispatch({
      type: USER_REQUEST_WITHDRAWAL,
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

export const addForum = (forumData) => async (dispatch) => {
  dispatch(clearErrors());
  //  dispatch(setLoading());
  dispatch(clearActions("add-forum"));
  try {
    let response = await axios.post("/api/users/add/forum", forumData);
    const result = await dispatch({
      type: USER_ADD_FORUM,
      payload: response.data,
    });
    dispatch(getAllCounts(1));
    return result;
  } catch (error) {
    let errorMessage = {
      status: error.response.status,
      data: error.response.data,
    };
    dispatch({ type: GET_ERRORS, payload: errorMessage });
  }
};

export const replyForum = (replyData) => async (dispatch) => {
  dispatch(clearErrors());
  //  dispatch(setLoading());
  dispatch(clearActions("user-reply"));
  try {
    let response = await axios.post("/api/users/forum/reply", replyData);
    const result = await dispatch({
      type: USER_REPLY,
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

export const deleteReply = (id) => async (dispatch) => {
  dispatch(clearErrors());
  //  dispatch(setLoading());
  dispatch(clearActions("delete-reply"));
  try {
    let response = await axios.delete(`/api/users/reply/delete/:${id}`);
    const result = await dispatch({
      type: USER_DELETE_REPLY,
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

export const updateForum = (forumData) => async (dispatch) => {
  dispatch(clearErrors());
  //  dispatch(setLoading());
  dispatch(clearActions("update-forum"));
  try {
    let response = await axios.post("/api/users/update/forum/", forumData);
    const result = await dispatch({
      type: USER_UPDATE_FORUM,
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

export const getList = (list) => async (dispatch) => {
  dispatch(clearErrors());
  dispatch(setLoading());
  let type;
  if (list === "currency") {
    dispatch(clearActions("user-currency"));
    type = USER_GET_CURRENCY;
  } else if (list === "provider") {
    dispatch(clearActions("user-provider"));
    type = USER_GET_PROVIDERS;
  } else if (list === "wallet") {
    dispatch(clearActions("user-wallet"));
    type = USER_GET_WALLET;
  }

  try {
    let response = await axios.get(`/api/userview/list/:${list}`);
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

export const saveSettings = (settings, data) => async (dispatch) => {
  dispatch(clearErrors());
  //dispatch(setLoading());
  let type,
    url = "/api/users/settings/";
  if (settings === "currency") {
    dispatch(clearSettings("currency"));
    type = USER_SET_CURRENCY;
    url = `${url}currency`;
  } else if (settings === "provider") {
    dispatch(clearSettings("provider"));
    type = USER_SET_PROVIDERS;
    url = `${url}provider`;
  } else if (settings === "reset-provider") {
    dispatch(clearSettings("reset-provider"));
    type = USER_UPDATE_PROVIDERS;
    url = `${url}reset/provider`;
  } else if (settings === "reset-currency") {
    dispatch(clearSettings("reset-currency"));
    type = USER_UPDATE_CURRENCY;
    url = `${url}reset/currency`;
  } else if (settings === "notify") {
    dispatch(clearSettings("notify"));
    type = USER_UPDATE_NOTIFY;
    url = `${url}notify`;
  } else if (settings === "mode") {
    dispatch(clearSettings("mode"));
    type = USER_UPDATE_MODE;
    url = `${url}mode`;
  } else if (settings === "profile") {
    dispatch(clearSettings("profile"));
    type = USER_UPDATE_PROFILE;
    url = `${url}profile`;
  } else if (settings === "account") {
    dispatch(clearSettings("account"));
    type = USER_UPDATE_ACCOUNT;
    url = `${url}account`;
  } else if (settings === "password") {
    dispatch(clearSettings("password"));
    type = USER_UPDATE_PASSWORD;
    url = `${url}pass`;
  }
  try {
    let response = await axios.post(url, data);
    const result = await dispatch({
      type,
      payload: response.data,
    });
    if (settings === "mode") {
      dispatch(getMode(1));
    }
    return result;
  } catch (error) {
    let errorMessage = {
      status: error.response.status,
      data: error.response.data,
    };
    dispatch({ type: GET_ERRORS, payload: errorMessage });
  }
};

export const clearSettings = (settings) => {
  if (settings === "currency") {
    return { type: CLEAR_USER_SET_CURRENCY };
  }
  if (settings === "provider") {
    return { type: CLEAR_USER_SET_PROVIDERS };
  }
  if (settings === "reset-provider") {
    return { type: CLEAR_USER_UPDATE_PROVIDERS };
  }
  if (settings === "reset-currency") {
    return { type: CLEAR_USER_UPDATE_CURRENCY };
  }
  if (settings === "notify") {
    return { type: CLEAR_USER_UPDATE_NOTIFY };
  }
  if (settings === "mode") {
    return { type: CLEAR_USER_UPDATE_MODE };
  }
  if (settings === "profile") {
    return { type: CLEAR_USER_UPDATE_PROFILE };
  }
  if (settings === "wallet") {
    return { type: CLEAR_USER_GET_WALLET };
  }
  if (settings === "account") {
    return { type: CLEAR_USER_UPDATE_ACCOUNT };
  }
  if (settings === "password") {
    return { type: CLEAR_USER_UPDATE_PASSWORD };
  }
};

export const makePayment = (payData) => async (dispatch) => {
  dispatch(clearErrors());
  dispatch(clearActions("make-payment"));
  let url = "/api/payments/";
  if (payData[0] === "p") {
    url += "make";
  } else if (payData[0] === "b") {
    url += "bonus";
  }
  try {
    let response = await axios.post(url, payData[1]);
    const result = await dispatch({
      type: USER_MAKE_PAYMENT,
      payload: response.data,
    });
    dispatch(getPremium());
    return result;
  } catch (error) {
    let errorMessage = {
      status: error.response.status,
      data: error.response.data,
    };
    dispatch({ type: GET_ERRORS, payload: errorMessage });
  }
};
