import {
  GET_ERRORS,
  SET_CURRENT_USER,
  CLEAR_ERRORS,
  SET_ALL_COUNTS,
  CLEAR_ALL_ACTIONS,
  SET_PROVIDER_COUNTS,
  SET_USER_COUNTS,
  USER_GET_MODE,
} from "./types";
import { getPremium, clearActions } from "./userAction";

import axios from "axios";
import jwtDecode from "jwt-decode";
import setAuthToken from "../util/setAuthToken";
import encrypt from "../util/encrypt";

export const loginuser = (userData) => async (dispatch) => {
  dispatch(clearErrors());
  try {
    let response = await axios({
      method: "post",
      url: "/api/view/login/",
      data: userData,
      timeout: 60000, // only wait for 60s
    });
    const { token } = response.data;
    localStorage.setItem("userToken", encrypt(token, "local"));
    // Set Token to Auth Header
    setAuthToken(token);
    //Decode Token
    const decoded = jwtDecode(token);
    const result = await dispatch(setCurrentUser(decoded));
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

// Set Login User
export const setCurrentUser = (decoded) => {
  return { type: SET_CURRENT_USER, payload: decoded };
};

// Clear Errors
export const clearErrors = () => {
  return { type: CLEAR_ERRORS, payload: {} };
};

// Get All Counts
export const getAllCounts = (level) => async (dispatch) => {
  let url = "/api/count/",
    lsName,
    type;
  if (level === 3) {
    url = `${url}admin/all/`;
    lsName = "counts";
    type = SET_ALL_COUNTS;
  } else if (level === 2) {
    url = `${url}provider/all/`;
    lsName = "providerCounts";
    type = SET_PROVIDER_COUNTS;
  } else if (level === 1) {
    dispatch(getPremium());
    url = `${url}user/all/`;
    lsName = "userCounts";
    type = SET_USER_COUNTS;
  }
  try {
    const response = await axios.get(url, {});
    localStorage.setItem(lsName, JSON.stringify(response.data));
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

// Get Mode
export const getMode = (user) => async (dispatch) => {
  let url = "/api/",
    mode = "mode",
    type = USER_GET_MODE;
  if (user === 1) {
    url = `${url}users/theme`;
  } else if (user === 2 || user === 3) {
    url = `${url}admin/theme`;
  }
  try {
    const response = await axios.get(url, {});
    let display = response.data;
    if (display === "n") {
      document.body.classList.add("dark-content");
    }
    if (display === "d") {
      document.body.classList.remove("dark-content");
    }
    if (display === "i") {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.body.classList.add("dark-content");
      }
    } else if (display === "a") {
      let hour = new Date().getHours();
      if (hour > 7 && hour < 20) {
        document.body.classList.add("dark-content");
      }
    }
    localStorage.setItem(mode, response.data);
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

export const logoutUser = () => (dispatch) => {
  //Remove Token from Storage
  localStorage.removeItem("userToken");
  localStorage.removeItem("counts");
  localStorage.removeItem("providerCounts");
  localStorage.removeItem("providerCount");
  localStorage.removeItem("currencies");
  localStorage.removeItem("currency");
  localStorage.removeItem("userCounts");
  localStorage.removeItem("userdetails");
  localStorage.removeItem("details");
  localStorage.removeItem("premium");
  localStorage.removeItem("mode");
  localStorage.removeItem("confirm");

  //Remove Auth Header  for future requests
  setAuthToken(false);
  // Set current user to {}  which will set isAuthenticated to false
  dispatch(clearActions("premium"));
  dispatch(clearErrors());
  dispatch(setCurrentUser({}));
  dispatch({
    type: CLEAR_ALL_ACTIONS,
    payload: {},
  });
  document.body.classList.remove("dark-content");
};
