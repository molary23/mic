import { TEXT_DISPATCH, GET_ERRORS, SET_CURRENT_USER } from "./types";
import axios from "axios";
import jwtDecode from "jwt-decode";
import setAuthToken from "../util/setAuthToken";

export const registeruser = (userData, history) => (dispatch) => {
  dispatch({
    type: TEXT_DISPATCH,
    payload: userData,
  });
};

export const loginuser = (userData, history) => async (dispatch) => {
  try {
    let response = await axios.post("/api/public/login/", userData, {});
    const { token } = response.data;
    localStorage.setItem("jwtToken", token);
    // Set Token to Auth Header
    setAuthToken(token);
    //Decode Token
    const decoded = jwtDecode(token);
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

export const logoutUser = () => (dispatch) => {
  //Remove Token from Storage
  localStorage.removeItem("jwtToken");
  //Remove Auth Header  for future requests
  setAuthToken(false);
  // Set current user to {}  which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
