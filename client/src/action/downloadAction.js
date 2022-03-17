import axios from "axios";

import {
  GET_ERRORS,
  CLEAR_ERRORS,
  ACTION_LOADING,
  PROVIDER_DOWNLOAD_SIGNALS,
  CLEAR_PROVIDER_DOWNLOAD_SIGNALS,
} from "./types";

export const download = (download) => async (dispatch) => {
  dispatch(clearErrors());
  dispatch(setLoading());
  let type,
    url = "/api/download/";
  if (download === "provider-signals") {
    dispatch(clearDownload("provider-signals"));
    type = PROVIDER_DOWNLOAD_SIGNALS;
    url = `${url}sp`;
  }

  try {
    let response = await axios.get(url);
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

export const clearDownload = (download) => {
  if (download === "provider-signals") {
    return { type: CLEAR_PROVIDER_DOWNLOAD_SIGNALS };
  }
};

export const setLoading = () => {
  return { type: ACTION_LOADING };
};

// Clear Errors
export const clearErrors = () => {
  return { type: CLEAR_ERRORS, payload: {} };
};
