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
  GET_ALL_ACCOUNTS,
  CLEAR_ACCOUNTS_ACTION,
  GET_ALL_ANNOUNCEMENTS,
  CLEAR_ANNOUNCEMENTS_ACTION,
  GET_ALL_WITHDRAWALS,
  CLEAR_WITHDRAWALS_ACTION,
  ADD_NEW_CURRENCY,
  CLEAR_ADD_NEW_CURRENCY,
  UPDATE_CURRENCY,
  CLEAR_UPDATE_CURRENCY,
  GET_ERRORS,
  CLEAR_ERRORS,
  ADD_NEW_ADMIN,
  CLEAR_ADD_NEW_ADMIN,
  ADD_NEW_PROVIDER,
  CLEAR_ADD_NEW_PROVIDER,
  UPDATE_ADMIN,
  CLEAR_UPDATE_ADMIN,
  UPDATE_BONUS,
  CLEAR_UPDATE_BONUS,
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
} from "./types";

export const getContent = (content, paginate) => async (dispatch) => {
  dispatch(setLoading());
  dispatch(clearErrors());
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
  } else if (content === "accounts") {
    url = `${url}accounts`;
    type = GET_ALL_ACCOUNTS;
  } else if (content === "announcements") {
    url = `${url}announcements`;
    type = GET_ALL_ANNOUNCEMENTS;
  } else if (content === "withdrawals") {
    url = `${url}withdrawals`;
    type = GET_ALL_WITHDRAWALS;
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
  } else if (actionToClear === "accounts") {
    return { type: CLEAR_ACCOUNTS_ACTION };
  } else if (actionToClear === "announcements") {
    return { type: CLEAR_ANNOUNCEMENTS_ACTION };
  } else if (actionToClear === "withdrawals") {
    return { type: CLEAR_WITHDRAWALS_ACTION };
  } else if (actionToClear === "admin-settings") {
    return { type: CLEAR_GET_ADMIN_SETTINGS };
  }
};

export const setLoading = () => {
  return { type: ACTION_LOADING };
};

export const updateCurrency = (action, id) => async (dispatch) => {
  let url = `/api/signals/currency/update/:${action}/:${id}`;
  dispatch(setLoading());
  dispatch(clearErrors());
  try {
    let response = await axios.post(url);
    const result = await dispatch({
      type: UPDATE_CURRENCY,
      payload: response.data,
    });
    return result;
  } catch (error) {
    console.log(error.response);
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};

export const addCurrency = (currency) => async (dispatch) => {
  let url = "/api/signals/currency/add/";
  dispatch(setLoading());
  dispatch(clearErrors());
  try {
    let response = await axios.post(url, currency);
    const result = await dispatch({
      type: ADD_NEW_CURRENCY,
      payload: response.data,
    });
    return result;
  } catch (error) {
    console.log(error.response);
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};

// Clear Errors
export const clearErrors = () => {
  return { type: CLEAR_ERRORS, payload: {} };
};

export const clearAdminAction = (info) => {
  if (info === "delete-currency") return { type: CLEAR_UPDATE_CURRENCY };
  if (info === "add-currency") return { type: CLEAR_ADD_NEW_CURRENCY };
  if (info === "add-admin") return { type: CLEAR_ADD_NEW_ADMIN };
  if (info === "add-provider") return { type: CLEAR_ADD_NEW_PROVIDER };
  if (info === "update-admin") return { type: CLEAR_UPDATE_ADMIN };
  if (info === "update-bonus") return { type: CLEAR_UPDATE_BONUS };
  if (info === "delete-ann") return { type: CLEAR_DELETE_ANNOUNCEMENT };
  if (info === "add-ann") return { type: CLEAR_ADD_ANNOUNCEMENT };
  if (info === "edit-ann") return { type: CLEAR_EDIT_ANNOUNCEMENT };
};

export const addNewAdmin = (level, data) => async (dispatch) => {
  dispatch(setLoading());
  dispatch(clearErrors());
  let url = "/api/admin/add",
    type;
  if (level === "super") {
    type = ADD_NEW_ADMIN;
    data.level = 3;
  } else if (level === "provider") {
    type = ADD_NEW_PROVIDER;
    data.level = 2;
  }

  try {
    let response = await axios.post(url, data);
    const result = await dispatch({
      type,
      payload: response.data,
    });
    return result;
  } catch (error) {
    console.log(error.response);
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};

export const updateAdmin = (value) => async (dispatch) => {
  dispatch(setLoading());
  dispatch(clearErrors());
  try {
    let response = await axios.post("/api/admin/update/", value);
    const result = await dispatch({
      type: UPDATE_ADMIN,
      payload: response.data,
    });
    return result;
  } catch (error) {
    console.log(error.response);
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};

export const updateBonus = (value) => async (dispatch) => {
  dispatch(setLoading());
  dispatch(clearErrors());
  try {
    let response = await axios.post("/api/admin/approve/bonus", value);
    const result = await dispatch({
      type: UPDATE_BONUS,
      payload: response.data,
    });
    return result;
  } catch (error) {
    console.log(error.response);
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};

export const deleteAnn = (value) => async (dispatch) => {
  dispatch(setLoading());
  dispatch(clearErrors());
  try {
    let response = await axios.delete(
      `/api/admin/delete/announcement/:${value}`
    );
    const result = await dispatch({
      type: DELETE_ANNOUNCEMENT,
      payload: response.data,
    });
    return result;
  } catch (error) {
    console.log(error.response);
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};

export const addAnn = (value) => async (dispatch) => {
  dispatch(setLoading());
  dispatch(clearErrors());
  try {
    let response = await axios.post("/api/admin/add/announcement", value);
    const result = await dispatch({
      type: ADD_ANNOUNCEMENT,
      payload: response.data,
    });
    return result;
  } catch (error) {
    console.log(error.response);
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};

export const editAnn = (value) => async (dispatch) => {
  dispatch(setLoading());
  dispatch(clearErrors());
  try {
    let response = await axios.post(
      `/api/admin/edit/announcement/:${value[1]}`,
      value[0]
    );
    const result = await dispatch({
      type: EDIT_ANNOUNCEMENT,
      payload: response.data,
    });
    return result;
  } catch (error) {
    console.log(error.response);
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};

export const getAdminSettings = () => async (dispatch) => {
  dispatch(clearErrors());
  dispatch(setLoading());
  dispatch(clearActions("admin-settings"));
  try {
    let response = await axios.get("/api/admin/settings");
    const result = await dispatch({
      type: GET_ADMIN_SETTINGS,
      payload: response.data,
    });
    return result;
  } catch (error) {
    console.log(error.response.data);
    dispatch({ type: GET_ADMIN_SETTINGS, payload: [] });
  }
};

export const saveSettings = (settings, data) => async (dispatch) => {
  dispatch(clearErrors());
  //dispatch(setLoading());
  let type,
    url = "/api/admin/settings/";
  if (settings === "mode") {
    dispatch(clearSettings("mode"));
    type = ADMIN_UPDATE_MODE;
    url = `${url}mode`;
  } else if (settings === "profile") {
    dispatch(clearSettings("profile"));
    type = ADMIN_UPDATE_PROFILE;
    url = `${url}profile`;
  } else if (settings === "password") {
    dispatch(clearSettings("password"));
    type = ADMIN_UPDATE_PASSWORD;
    url = `${url}pass`;
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
  if (settings === "mode") {
    return { type: CLEAR_ADMIN_UPDATE_MODE };
  }
  if (settings === "profile") {
    return { type: CLEAR_ADMIN_UPDATE_PROFILE };
  }
  if (settings === "password") {
    return { type: CLEAR_ADMIN_UPDATE_PASSWORD };
  }
};
