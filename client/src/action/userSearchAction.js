import axios from "axios";
import {
  GET_USER_SEARCH_SIGNALS,
  ACTION_LOADING,
  CLEAR_USERS_SIGNALS_SEARCH,
} from "./types";

export const searchContent = (content, paginate) => async (dispatch) => {
  dispatch(setLoading());
  let url = "/api/userview/",
    type;
  if (content === "signals") {
    type = GET_USER_SEARCH_SIGNALS;
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

export const clearSearchActions = (actionToClear) => {
  if (actionToClear === "signals") {
    return { type: CLEAR_USERS_SIGNALS_SEARCH };
  }
};

export const setLoading = () => {
  return { type: ACTION_LOADING };
};
