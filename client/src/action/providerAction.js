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
    dispatch({ type, payload: [] });
  }
};

export const setLoading = () => {
  return { type: ACTION_LOADING };
};

export const clearActions = (actionToClear) => {
  if (actionToClear === "signals") {
    return { type: CLEAR_PROVIDER_SIGNALS_ACTION };
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
    dispatch({ type, payload: [] });
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
