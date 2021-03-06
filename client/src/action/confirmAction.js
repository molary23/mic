import {
  USER_CONFIRM_PASSWORD_ACTION,
  CLEAR_USER_CONFIRM_PASSWORD_ACTION,
  GET_ERRORS,
  CLEAR_ERRORS,
  ACTION_LOADING,
  USER_RESET_PASSWORD_ACTION,
  CLEAR_USER_RESET_PASSWORD_ACTION,
} from "./types";

import axios from "axios";

// Confirm Reset Code

export const confirmCode = (usercode) => async (dispatch) => {
  dispatch(clearErrors());
  dispatch(clearConfirmAction());

  try {
    let response = await axios({
      method: "post",
      url: "/api/view/confirm",
      data: usercode,
      timeout: 60000, // only wait for 60s
    });
    let message = response.data;
    if (message.message) {
      localStorage.setItem("confirm", message.value);
    }
    const result = await dispatch({
      type: USER_CONFIRM_PASSWORD_ACTION,
      payload: message,
    });
    return result;
  } catch (error) {
    let errorMessage = {};
    if (error.code === "ECONNABORTED") {
      errorMessage.status = 404;
    } else {
      errorMessage = {
        status: error.response.status,
        data: error.response.data,
      };
    }
    dispatch({ type: GET_ERRORS, payload: errorMessage });
  }
};

export const clearErrors = () => {
  return { type: CLEAR_ERRORS, payload: {} };
};

export const clearConfirmAction = () => {
  return { type: CLEAR_USER_CONFIRM_PASSWORD_ACTION, payload: {} };
};

export const resetPass = (pass) => async (dispatch) => {
  dispatch(clearErrors());
  dispatch(clearResetAction());
  try {
    let response = await axios({
      method: "post",
      url: "/api/view/reset/",
      data: pass,
      timeout: 60000, // only wait for 60s
    });
    const result = await dispatch({
      type: USER_RESET_PASSWORD_ACTION,
      payload: response.data,
    });
    localStorage.removeItem("confirm");
    return result;
  } catch (error) {
    let errorMessage = {};
    if (error.code === "ECONNABORTED") {
      errorMessage.status = 404;
    } else {
      errorMessage = {
        status: error.response.status,
        data: error.response.data,
      };
    }
    dispatch({ type: GET_ERRORS, payload: errorMessage });
  }
};

export const clearResetAction = () => {
  return { type: CLEAR_USER_RESET_PASSWORD_ACTION, payload: {} };
};

export const setLoading = () => {
  return { type: ACTION_LOADING };
};
