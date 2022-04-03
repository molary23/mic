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
    let response = await axios.post("/api/view/confirm", usercode),
      message = response.data;
    if (message.message) {
      localStorage.setItem("confirm", message.value);
    }
    const result = await dispatch({
      type: USER_CONFIRM_PASSWORD_ACTION,
      payload: message,
    });
    return result;
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response });
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
    let response = await axios.post("/api/view/reset/", pass);
    const result = await dispatch({
      type: USER_RESET_PASSWORD_ACTION,
      payload: response.data,
    });
    localStorage.removeItem("confirm");
    return result;
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response });
  }
};

export const clearResetAction = () => {
  return { type: CLEAR_USER_RESET_PASSWORD_ACTION, payload: {} };
};

export const setLoading = () => {
  return { type: ACTION_LOADING };
};
