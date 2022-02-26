import { GET_ERRORS, SET_CURRENT_USER } from "./types";
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

    if (decoded.level === 3) {
      getAllCounts();
    }
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

// Get All Counts
export const getAllCounts = async () => {
  try {
    let response = await axios.get("/api/count/admin/all/", {});
    const allCounts = response.data;
    sessionStorage.setItem("tableCounts", JSON.stringify(allCounts));
  } catch (error) {
    console.log(error.response.data);
  }
};

export const logoutUser = () => (dispatch) => {
  //Remove Token from Storage
  localStorage.removeItem("jwtToken");
  //Remove Auth Header  for future requests
  setAuthToken(false);
  // Set current user to {}  which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
