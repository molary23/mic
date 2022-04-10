import axios from "axios";
import {
  ACTION_LOADING,
  CLEAR_PROVIDERS_SIGNALS_SEARCH,
  GET_SEARCH_PROVIDER_SIGNALS,
  GET_ERRORS,
} from "./types";

export const searchContent = (content, searchData) => async (dispatch) => {
  dispatch(setLoading());
  let url = "/api/signals/",
    type;
  if (content === "signals") {
    type = GET_SEARCH_PROVIDER_SIGNALS;
    url = `${url}providers`;
  }

  try {
    let response = await axios({
      method: "post",
      url,
      data: searchData,
      timeout: 60000, // only wait for 60s
    });
    const result = await dispatch({
      type,
      payload: response.data,
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

export const clearSearchActions = (actionToClear) => {
  if (actionToClear === "signals") {
    return { type: CLEAR_PROVIDERS_SIGNALS_SEARCH };
  }
};
export const setLoading = () => {
  return { type: ACTION_LOADING };
};
