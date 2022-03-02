import axios from "axios";
import {
  GET_USER_SEARCH_SIGNALS,
  ACTION_LOADING,
  CLEAR_USERS_SIGNALS_SEARCH,
  GET_USER_SEARCH_REFERRALS,
  CLEAR_USERS_REFERRALS_SEARCH,
  GET_USER_SEARCH_SUBSCRIPTIONS,
  CLEAR_USERS_SUBSCRIPTIONS_SEARCH,
  GET_USER_SEARCH_TRANSACTIONS,
  CLEAR_USERS_TRANSACTIONS_SEARCH,
  GET_USER_SEARCH_PAYMENTS,
  CLEAR_USERS_PAYMENTS_SEARCH,
} from "./types";

export const searchContent = (content, paginate) => async (dispatch) => {
  dispatch(setLoading());
  let url = "/api/userview/",
    type;
  if (content === "signals") {
    type = GET_USER_SEARCH_SIGNALS;
  } else if (content === "referrals") {
    type = GET_USER_SEARCH_REFERRALS;
  } else if (content === "subscriptions") {
    type = GET_USER_SEARCH_SUBSCRIPTIONS;
  } else if (content === "transactions") {
    type = GET_USER_SEARCH_TRANSACTIONS;
  } else if (content === "payments") {
    type = GET_USER_SEARCH_PAYMENTS;
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
    console.log(error.response);
    dispatch({ type, payload: [] });
  }
};

export const clearSearchActions = (actionToClear) => {
  if (actionToClear === "signals") {
    return { type: CLEAR_USERS_SIGNALS_SEARCH };
  } else if (actionToClear === "referrals") {
    return { type: CLEAR_USERS_REFERRALS_SEARCH };
  } else if (actionToClear === "subscriptions") {
    return { type: CLEAR_USERS_SUBSCRIPTIONS_SEARCH };
  } else if (actionToClear === "transactions") {
    return { type: CLEAR_USERS_TRANSACTIONS_SEARCH };
  } else if (actionToClear === "payments") {
    return { type: CLEAR_USERS_PAYMENTS_SEARCH };
  }
};

export const setLoading = () => {
  return { type: ACTION_LOADING };
};
