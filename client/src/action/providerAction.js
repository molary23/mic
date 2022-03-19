import axios from "axios";

import {
  ACTION_LOADING,
  GET_ALL_PROVIDER_SIGNALS,
  CLEAR_PROVIDER_SIGNALS_ACTION,
  GET_ALL_CURRENCY_PAIR,
  CLEAR_GET_ALL_CURRENCY_PAIR,
  ADD_NEW_SIGNAL,
  GET_ERRORS,
  CLEAR_ADD_NEW_SIGNAL,
  EDIT_NEW_SIGNAL,
  CLEAR_EDIT_NEW_SIGNAL,
  PROVIDER_UPDATE_MODE,
  CLEAR_PROVIDER_UPDATE_MODE,
  PROVIDER_UPDATE_PROFILE,
  PROVIDER_UPDATE_PASSWORD,
  CLEAR_PROVIDER_UPDATE_PROFILE,
  CLEAR_PROVIDER_UPDATE_PASSWORD,
  CLEAR_ERRORS,
  GET_PROVIDER_SETTINGS,
  CLEAR_GET_PROVIDER_SETTINGS,
} from "./types";

export const getContent = (content, paginate) => async (dispatch) => {
  dispatch(setLoading());
  let url = "/api/signals/",
    type;
  if (content === "signals") {
    type = GET_ALL_PROVIDER_SIGNALS;
    url = `${url}providers`;
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
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};

export const setLoading = () => {
  return { type: ACTION_LOADING };
};

export const clearActions = (actionToClear) => {
  if (actionToClear === "signals") {
    return { type: CLEAR_PROVIDER_SIGNALS_ACTION };
  } else if (actionToClear === "provider-settings") {
    return { type: CLEAR_GET_PROVIDER_SETTINGS };
  }
};

export const getCurrency = () => async (dispatch) => {
  dispatch(setLoading());
  let url = "/api/signals/currencies",
    type = GET_ALL_CURRENCY_PAIR;
  try {
    let response = await axios.get(url);
    localStorage.setItem("currencies", JSON.stringify(response.data));
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

export const clearCurrency = () => {
  localStorage.removeItem("currencies");
  return { type: CLEAR_GET_ALL_CURRENCY_PAIR };
};

export const addSignal = (signal) => async (dispatch) => {
  dispatch(setLoading());
  let url = "/api/signals/add",
    type = ADD_NEW_SIGNAL;
  try {
    let response = await axios.post(url, signal);
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
export const clearSignal = (info) => {
  let type;
  if (info === "new") {
    type = CLEAR_ADD_NEW_SIGNAL;
  } else if (info === "edit") {
    type = CLEAR_EDIT_NEW_SIGNAL;
  }
  return { type };
};

export const editSignal = (signal, id) => async (dispatch) => {
  dispatch(setLoading());
  let url = `/api/signals/update/:${id}`,
    type = EDIT_NEW_SIGNAL;
  try {
    let response = await axios.post(url, signal);
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

export const getProviderSettings = () => async (dispatch) => {
  dispatch(clearErrors());
  dispatch(setLoading());
  dispatch(clearActions("provider-settings"));
  try {
    let response = await axios.get("/api/admin/settings");
    const result = await dispatch({
      type: GET_PROVIDER_SETTINGS,
      payload: response.data,
    });
    return result;
  } catch (error) {
    console.log(error.response.data);
    dispatch({ type: GET_PROVIDER_SETTINGS, payload: [] });
  }
};

export const saveSettings = (settings, data) => async (dispatch) => {
  dispatch(clearErrors());
  //dispatch(setLoading());
  let type,
    url = "/api/admin/settings/";
  if (settings === "mode") {
    dispatch(clearSettings("mode"));
    type = PROVIDER_UPDATE_MODE;
    url = `${url}mode`;
  } else if (settings === "profile") {
    dispatch(clearSettings("profile"));
    type = PROVIDER_UPDATE_PROFILE;
    url = `${url}profile`;
  } else if (settings === "password") {
    dispatch(clearSettings("password"));
    type = PROVIDER_UPDATE_PASSWORD;
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
    return { type: CLEAR_PROVIDER_UPDATE_MODE };
  }
  if (settings === "profile") {
    return { type: CLEAR_PROVIDER_UPDATE_PROFILE };
  }
  if (settings === "password") {
    return { type: CLEAR_PROVIDER_UPDATE_PASSWORD };
  }
};

// Clear Errors
export const clearErrors = () => {
  return { type: CLEAR_ERRORS, payload: {} };
};
