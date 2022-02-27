import axios from "axios";
import {
  CLEAR_SEARCH_SUBSCRIPTIONS_ACTION,
  ACTION_LOADING,
  GET_SEARCH_SUBSCRIPTIONS,
  CLEAR_SEARCH_TRANSACTIONS_ACTION,
  CLEAR_SEARCH_USERS_ACTION,
  GET_SEARCH_TRANSACTIONS,
  GET_SEARCH_USERS,
  GET_SEARCH_CURRENCY,
  CLEAR_SEARCH_CURRENCY_ACTION,
  GET_SEARCH_PAYMENTS,
  CLEAR_SEARCH_PAYMENTS_ACTION,
  GET_SEARCH_REFERRALS,
  CLEAR_SEARCH_REFERRALS_ACTION,
  CLEAR_SEARCH_BONUS_ACTION,
  GET_SEARCH_BONUS,
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

export const searchContent = (content, searchData) => async (dispatch) => {
  dispatch(setLoading());
  let url = "/api/adminview/",
    type;
  if (content === "currency") {
    type = GET_SEARCH_CURRENCY;
    url = `${url}currency`;
  } else if (content === "payments") {
    url = `${url}payments`;
    type = GET_SEARCH_PAYMENTS;
  } else if (content === "referrals") {
    url = `${url}referrals`;
    type = GET_SEARCH_REFERRALS;
  } else if (content === "bonus") {
    url = `${url}bonus`;
    type = GET_SEARCH_BONUS;
  }
  try {
    let response = await axios.post(url, searchData);
    const result = await dispatch({
      type,
      payload: response.data,
    });
    return result;
  } catch (error) {
    console.log(error.response.data);
    dispatch({ type, payload: [] });
  }
};

export const clearSearchActions = (actionToClear) => {
  if (actionToClear === "sub") {
    return { type: CLEAR_SEARCH_SUBSCRIPTIONS_ACTION };
  } else if (actionToClear === "trans") {
    return { type: CLEAR_SEARCH_TRANSACTIONS_ACTION };
  } else if (actionToClear === "users") {
    return { type: CLEAR_SEARCH_USERS_ACTION };
  } else if (actionToClear === "currency") {
    return { type: CLEAR_SEARCH_CURRENCY_ACTION };
  } else if (actionToClear === "payments") {
    return { type: CLEAR_SEARCH_PAYMENTS_ACTION };
  } else if (actionToClear === "referrals") {
    return { type: CLEAR_SEARCH_REFERRALS_ACTION };
  } else if (actionToClear === "bonus") {
    return { type: CLEAR_SEARCH_BONUS_ACTION };
  }
};

export const setLoading = () => {
  return { type: ACTION_LOADING };
};
