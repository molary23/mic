import axios from "axios";

import {
  ACTION_LOADING,
  GET_ALL_PROVIDER_SIGNALS,
  CLEAR_PROVIDER_SIGNALS_ACTION,
} from "./types";

export const getContent = (content, paginate) => async (dispatch) => {
  dispatch(setLoading());
  let url = "/api/signals/",
    type;
  if (content === "signals") {
    type = GET_ALL_PROVIDER_SIGNALS;
    url = `${url}providers`;
  }
  try {
    let response = await axios.post(url, paginate);
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

export const setLoading = () => {
  return { type: ACTION_LOADING };
};

export const clearActions = (actionToClear) => {
  if (actionToClear === "signals") {
    return { type: CLEAR_PROVIDER_SIGNALS_ACTION };
  }
};
