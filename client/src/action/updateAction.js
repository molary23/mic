/*import axios from "axios";

import {
  GET_ERRORS,
  CLEAR_ERRORS,
  ACTION_LOADING,
  USER_SET_CURRENCY,
  CLEAR_USER_SET_CURRENCY,
  USER_SET_PROVIDERS,
  CLEAR_USER_SET_PROVIDERS,
} from "./types";

export const saveSettings = (settings, data) => async (dispatch) => {
  dispatch(clearErrors());
  dispatch(setLoading());
  let type,
    url = "/api/users/settings/";
  if (settings === "currency") {
    dispatch(clearSettings("user-currency"));
    type = USER_SET_CURRENCY;
    url = `${url}currency`;
  } else if (settings === "provider") {
    dispatch(clearSettings("user-provider"));
    type = USER_SET_PROVIDERS;
    url = `${url}provider`;
  }

  try {
    let response = await axios.get(url, data);
    const result = await dispatch({
      type,
      payload: response.data,
    });
    return result;
  } catch (error) {
    console.log(error.response.data);
    dispatch({ GET_ERRORS, payload: error.response.data });
  }
};

export const clearSettings = (settings) => {
  if (settings === "currency") {
    return { type: CLEAR_USER_SET_CURRENCY };
  }
  if (settings === "provider") {
    return { type: CLEAR_USER_SET_PROVIDERS };
  }
};

export const setLoading = () => {
  return { type: ACTION_LOADING };
};

// Clear Errors
export const clearErrors = () => {
  return { type: CLEAR_ERRORS, payload: {} };
};
*/
