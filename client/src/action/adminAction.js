import axios from "axios";
import {
  GET_ALL_SUBSCRIPTIONS,
  CLEAR_SUBSCRIPTIONS_ACTION,
  ACTION_LOADING,
  GET_SUBSCRIPTION_COUNT,
  GET_ALL_TRANSACTIONS,
  GET_ALL_USERS,
  CLEAR_TRANSACTIONS_ACTION,
  CLEAR_USERS_ACTION,
  GET_ALL_CURRENCY,
  CLEAR_CURRENCY_ACTION,
  CLEAR_PAYMENTS_ACTION,
  GET_ALL_PAYMENTS,
  CLEAR_REFERRALS_ACTION,
  GET_ALL_REFERRALS,
  GET_ALL_BONUS,
  CLEAR_BONUS_ACTION,
} from "./types";

export const getSub = (paginate) => async (dispatch) => {
  dispatch(setLoading());
  try {
    let response = await axios.post("/api/adminview/subscriptions/", paginate);
    const result = await dispatch({
      type: GET_ALL_SUBSCRIPTIONS,
      payload: response.data,
    });
    return result;
  } catch (error) {
    dispatch({ type: GET_ALL_SUBSCRIPTIONS, payload: [] });
  }
};

export const getTrans = (paginate) => async (dispatch) => {
  dispatch(setLoading());
  try {
    let response = await axios.post("/api/adminview/transactions/", paginate);
    const result = await dispatch({
      type: GET_ALL_TRANSACTIONS,
      payload: response.data,
    });
    return result;
  } catch (error) {
    dispatch({ type: GET_ALL_TRANSACTIONS, payload: [] });
  }
};

export const getUser = (paginate) => async (dispatch) => {
  dispatch(setLoading());
  try {
    let response = await axios.post("/api/adminview/users/", paginate);
    const result = await dispatch({
      type: GET_ALL_USERS,
      payload: response.data,
    });
    return result;
  } catch (error) {
    dispatch({ type: GET_ALL_USERS, payload: [] });
  }
};

export const getContent = (content, paginate) => async (dispatch) => {
  dispatch(setLoading());
  let url = "/api/adminview/",
    type;
  if (content === "currency") {
    url = `${url}currency`;
    type = GET_ALL_CURRENCY;
  } else if (content === "payments") {
    url = `${url}payments`;
    type = GET_ALL_PAYMENTS;
  } else if (content === "referrals") {
    url = `${url}referrals`;
    type = GET_ALL_REFERRALS;
  } else if (content === "bonus") {
    url = `${url}bonus`;
    type = GET_ALL_BONUS;
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

export const getTableCount = (tablename) => async (dispatch) => {
  let action_type, tabCount;
  if (tablename === "subscriptions") {
    action_type = GET_SUBSCRIPTION_COUNT;
    tabCount = "subcount";
  }
  let params = JSON.stringify(tablename);
  try {
    let response = await axios.get(`/api/count/table/${params}`);
    const tablecount = response.data;

    sessionStorage.setItem(tabCount, JSON.stringify(tablecount));
    const result = await dispatch({
      type: action_type,
      payload: tablecount,
    });
    return result;
  } catch (error) {
    dispatch({ type: GET_SUBSCRIPTION_COUNT, payload: {} });
  }
};

export const clearActions = (actionToClear) => {
  if (actionToClear === "sub") {
    return { type: CLEAR_SUBSCRIPTIONS_ACTION };
  } else if (actionToClear === "trans") {
    return { type: CLEAR_TRANSACTIONS_ACTION };
  } else if (actionToClear === "users") {
    return { type: CLEAR_USERS_ACTION };
  } else if (actionToClear === "currency") {
    return { type: CLEAR_CURRENCY_ACTION };
  } else if (actionToClear === "payment") {
    return { type: CLEAR_PAYMENTS_ACTION };
  } else if (actionToClear === "referrals") {
    return { type: CLEAR_REFERRALS_ACTION };
  } else if (actionToClear === "bonus") {
    return { type: CLEAR_BONUS_ACTION };
  }
};

export const setLoading = () => {
  return { type: ACTION_LOADING };
};
