import axios from "axios";
import {
  GET_USER_SIGNALS,
  ACTION_LOADING,
  CLEAR_USER_SIGNALS_ACTION,
  GET_USER_REFERRALS,
  CLEAR_USER_REFERRALS_ACTION,
  GET_USER_SUBSCRIPTIONS,
  CLEAR_USER_SUBSCRIPTIONS_ACTION,
  GET_USER_TRANSACTIONS,
  CLEAR_USER_TRANSACTIONS_ACTION,
  GET_USER_PAYMENTS,
  CLEAR_USER_PAYMENTS_ACTION,
} from "./types";

export const getContent = (content, paginate) => async (dispatch) => {
  dispatch(setLoading());
  let url = "/api/userview/",
    type;
  if (content === "signals") {
    type = GET_USER_SIGNALS;
  } else if (content === "referrals") {
    type = GET_USER_REFERRALS;
  } else if (content === "subscriptions") {
    type = GET_USER_SUBSCRIPTIONS;
  } else if (content === "transactions") {
    type = GET_USER_TRANSACTIONS;
  } else if (content === "payments") {
    type = GET_USER_PAYMENTS;
  }
  url += content;
  try {
    let response = await axios.post(url, paginate);
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

export const clearActions = (actionToClear) => {
  if (actionToClear === "signals") {
    return { type: CLEAR_USER_SIGNALS_ACTION };
  } else if (actionToClear === "referrals") {
    return { type: CLEAR_USER_REFERRALS_ACTION };
  } else if (actionToClear === "subscriptions") {
    return { type: CLEAR_USER_SUBSCRIPTIONS_ACTION };
  } else if (actionToClear === "transactions") {
    return { type: CLEAR_USER_TRANSACTIONS_ACTION };
  } else if (actionToClear === "payments") {
    return { type: CLEAR_USER_PAYMENTS_ACTION };
  }
};

export const setLoading = () => {
  return { type: ACTION_LOADING };
};
