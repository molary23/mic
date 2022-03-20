import axios from "axios";
import {
  ACTION_LOADING,
  CLEAR_PROVIDERS_SIGNALS_SEARCH,
  GET_SEARCH_PROVIDER_SIGNALS,
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
    let response = await axios.post(url, searchData);
    const result = await dispatch({
      type,
      payload: response.data,
    });
    return result;
  } catch (error) {
    console.log(error.response);
    dispatch({ type, payload: [] });
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
