import {
  GET_USER_PROFILE,
  CLEAR_CURRENT_PROFILE,
  PROFILE_LOADING,
} from "./types";
import axios from "axios";

export const getUserProfile = () => async (dispatch) => {
  dispatch(setProfileLoading());
  try {
    let response = await axios.get("/api/users/details/", {});
    const result = await dispatch({
      type: GET_USER_PROFILE,
      payload: response.data,
    });
    return result;
  } catch (error) {
    dispatch({ type: GET_USER_PROFILE, payload: {} });
  }
};

export const clearCurrentProfile = (decoded) => {
  return { type: CLEAR_CURRENT_PROFILE };
};

export const setProfileLoading = (decoded) => {
  return { type: PROFILE_LOADING };
};
