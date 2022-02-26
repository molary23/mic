import axios from "axios";
import {
  CLEAR_SEARCH_SUBSCRIPTIONS_ACTION,
  ACTION_LOADING,
  GET_SEARCH_SUBSCRIPTIONS,
  CLEAR_SEARCH_TRANSACTIONS_ACTION,
  CLEAR_SEARCH_USERS_ACTION,
  GET_SEARCH_TRANSACTIONS,
  GET_SEARCH_USERS,
} from "./types";

export const searchSub = (searchData) => async (dispatch) => {
  dispatch(setLoading());
  try {
    let response = await axios.post(
      "/api/adminview/subscriptions/",
      searchData
    );
    const result = await dispatch({
      type: GET_SEARCH_SUBSCRIPTIONS,
      payload: response.data,
    });
    return result;
  } catch (error) {
    dispatch({ type: GET_SEARCH_SUBSCRIPTIONS, payload: {} });
  }
};

export const searchTrans = (searchData) => async (dispatch) => {
  dispatch(setLoading());
  try {
    let response = await axios.post("/api/adminview/transactions/", searchData);
    const result = await dispatch({
      type: GET_SEARCH_TRANSACTIONS,
      payload: response.data,
    });
    return result;
  } catch (error) {
    dispatch({ type: GET_SEARCH_TRANSACTIONS, payload: [] });
  }
};
export const searchUser = (searchData) => async (dispatch) => {
  dispatch(setLoading());
  try {
    let response = await axios.post("/api/adminview/users/", searchData);
    const result = await dispatch({
      type: GET_SEARCH_USERS,
      payload: response.data,
    });
    return result;
  } catch (error) {
    console.log(error.response.data);
    dispatch({ type: GET_SEARCH_USERS, payload: [] });
  }
};
export const clearSearchActions = (actionToClear) => {
  if (actionToClear === "sub") {
    return { type: CLEAR_SEARCH_SUBSCRIPTIONS_ACTION };
  } else if (actionToClear === "trans") {
    return { type: CLEAR_SEARCH_TRANSACTIONS_ACTION };
  } else if (actionToClear === "users") {
    return { type: CLEAR_SEARCH_USERS_ACTION };
  }
};

export const setLoading = () => {
  return { type: ACTION_LOADING };
};
