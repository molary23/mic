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
} from "./types";

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
    console.log(error.response.data);
    dispatch({ type, payload: [] });
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
  }
};

export const setLoading = () => {
  return { type: ACTION_LOADING };
};

export const getPremium = () => async (dispatch) => {
  dispatch(clearActions("premium"));
  try {
    let response = await axios.get("/api/userview/premium");
    localStorage.setItem("premium", JSON.stringify(response.data));
    const result = await dispatch({
      type: GET_PREMIUM_STATUS,
      payload: response.data,
    });
    return result;
  } catch (error) {
    console.log(error.response.data);
    dispatch({ type: GET_PREMIUM_STATUS, payload: [] });
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
    console.log(error.response.data);
    dispatch({ type: GET_DASHBOARD_DETAILS, payload: [] });
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
    console.log(error.response.data);
    dispatch({ type: GET_USER_SETTINGS, payload: [] });
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
  }

  try {
    let response = await axios.get(`/api/userview/list/:${list}`);
    const result = await dispatch({
      type,
      payload: response.data,
    });
    return result;
  } catch (error) {
    console.log(error.response.data);
    dispatch({ type, payload: [] });
  }
};

export const saveSettings = (settings, data) => async (dispatch) => {
  dispatch(clearErrors());
  dispatch(setLoading());
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
  }

  try {
    let response = await axios.post(url, data);
    const result = await dispatch({
      type,
      payload: response.data,
    });
    return result;
  } catch (error) {
    console.log(error.response.data);
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};

export const clearSettings = (settings) => {
  if (settings === "currency") {
    return { type: CLEAR_USER_SET_CURRENCY };
  }
  if (settings === "provider") {
    return { type: CLEAR_USER_SET_PROVIDERS };
  }
};
