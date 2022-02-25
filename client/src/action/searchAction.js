import axios from "axios";
import {
  CLEAR_SUBSCRIPTIONS_ACTION,
  ACTION_LOADING,
  GET_SEARCH_SUBSCRIPTIONS,
} from "./types";

export const searchSub = (searchData) => async (dispatch) => {
  dispatch(setLoading());
  clearActions("sub");
  try {
    let response = await axios.post(
      "/api/adminview/subscriptions/",
      searchData
    );
    const result = await dispatch({
      type: GET_SEARCH_SUBSCRIPTIONS,
      payload: response.data,
    });
    console.log(response.data);
    return result;
  } catch (error) {
    dispatch({ type: GET_SEARCH_SUBSCRIPTIONS, payload: {} });
  }
};

export const clearActions = (actionToClear) => {
  if (actionToClear === "sub") {
    return { type: CLEAR_SUBSCRIPTIONS_ACTION };
  }
};

export const setLoading = () => {
  return { type: ACTION_LOADING };
};
