import axios from "axios";
import {
  GET_USER_SIGNALS,
  ACTION_LOADING,
  CLEAR_USER_SIGNALS_ACTION,
} from "./types";

export const getContent = (content, paginate) => async (dispatch) => {
  dispatch(setLoading());
  let url = "/api/userview/",
    type;
  if (content === "signals") {
    type = GET_USER_SIGNALS;
    url = `${url}signals`;
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

export const clearActions = (actionToClear) => {
  if (actionToClear === "signals") {
    return { type: CLEAR_USER_SIGNALS_ACTION };
  }
};

export const setLoading = () => {
  return { type: ACTION_LOADING };
};
