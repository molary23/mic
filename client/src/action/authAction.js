import {
  GET_ERRORS,
  SET_CURRENT_USER,
  CLEAR_ERRORS,
  SET_ALL_COUNTS,
  CLEAR_ALL_ACTIONS,
} from "./types";
import axios from "axios";
import jwtDecode from "jwt-decode";
import setAuthToken from "../util/setAuthToken";

export const loginuser = (userData) => async (dispatch) => {
  try {
    let response = await axios.post("/api/public/login/", userData, {});
    const { token } = response.data;
    localStorage.setItem("jwtToken", token);
    // Set Token to Auth Header
    setAuthToken(token);
    //Decode Token
    const decoded = jwtDecode(token);

    dispatch(clearErrors());
    const result = await dispatch(setCurrentUser(decoded));
    return result;
  } catch (error) {
    dispatch({ type: GET_ERRORS, payload: error.response.data });
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
  let url = "/api/count/";
  if (level === 3) {
    url = `${url}admin/all/`;
  }
  try {
    const response = await axios.get(url, {});
    localStorage.setItem("counts", JSON.stringify(response.data));
    const result = await dispatch({
      type: SET_ALL_COUNTS,
      payload: await response.data,
    });
    return result;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const logoutUser = () => (dispatch) => {
  //Remove Token from Storage
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("counts");

  //Remove Auth Header  for future requests
  setAuthToken(false);
  // Set current user to {}  which will set isAuthenticated to false

  dispatch(setCurrentUser({}));
  dispatch({
    type: CLEAR_ALL_ACTIONS,
    payload: {},
  });
};
