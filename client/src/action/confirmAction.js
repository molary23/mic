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
import { decrypt } from "../util/decrypt";

// Confirm Reset Code

export const confirmCode = (usercode) => async (dispatch) => {
  dispatch(clearErrors());
  dispatch(clearConfirmAction());
  try {
    let response = await axios.post("/api/public/confirm/", usercode),
      code = response.data;
    localStorage.setItem("confirm", code);
    const result = await dispatch({
      type: USER_CONFIRM_PASSWORD_ACTION,
      payload: code,
    });
    return result;
  } catch (error) {
    //console.log(error.response.data);
    dispatch({ type: GET_ERRORS, payload: error.response.data });
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
    let response = await axios.post("/api/public/reset/", pass);
    localStorage.removeItem("confirm");
    const result = await dispatch({
      type: USER_RESET_PASSWORD_ACTION,
      payload: response.data,
    });
    return result;
  } catch (error) {
    console.log(error.response.data);
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};

export const clearResetAction = () => {
  return { type: CLEAR_USER_RESET_PASSWORD_ACTION, payload: {} };
};

export const setLoading = () => {
  return { type: ACTION_LOADING };
};
