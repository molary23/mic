import axios from "axios";
import {
  GET_ERRORS,
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
  GET_USER_SEARCH_WITHDRAWALS,
  CLEAR_USERS_WITHDRAWALS_SEARCH,
  GET_USER_SEARCH_BONUS,
  CLEAR_USERS_BONUS_SEARCH,
  USER_SEARCH_FORUM,
  CLEAR_USER_SEARCH_FORUM,
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
  } else if (content === "withdrawals") {
    type = GET_USER_SEARCH_WITHDRAWALS;
  } else if (content === "bonus") {
    type = GET_USER_SEARCH_BONUS;
  } else if (content === "forums") {
    type = USER_SEARCH_FORUM;
  }
  url += content;
  try {
    let response = await axios({
      method: "post",
      url,
      data: paginate,
      timeout: 60000, // only wait for 60s
    });
    const result = await dispatch({
      type,
      payload: response.data,
    });
    return result;
  } catch (error) {
    let errorMessage = {
      status: error.response.status,
      data: error.response.data,
    };
    dispatch({ type: GET_ERRORS, payload: errorMessage });
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
  } else if (actionToClear === "withdrawals") {
    return { type: CLEAR_USERS_WITHDRAWALS_SEARCH };
  } else if (actionToClear === "bonus") {
    return { type: CLEAR_USERS_BONUS_SEARCH };
  } else if (actionToClear === "forums") {
    return { type: CLEAR_USER_SEARCH_FORUM };
  }
};

export const setLoading = () => {
  return { type: ACTION_LOADING };
};
