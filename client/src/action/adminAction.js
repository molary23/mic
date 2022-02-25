import axios from "axios";
import {
  GET_ALL_SUBSCRIPTIONS,
  CLEAR_SUBSCRIPTIONS_ACTION,
  ACTION_LOADING,
  GET_SUBSCRIPTION_COUNT,
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
    dispatch({ type: GET_ALL_SUBSCRIPTIONS, payload: {} });
  }
};

export const getTableCount = (tablename) => async (dispatch) => {
  let action_type, tabCount;
  if (tablename === "subscriptions") {
    action_type = GET_SUBSCRIPTION_COUNT;
    tabCount = "subcount";
  }
  let params = JSON.stringify(tablename);
  dispatch(setLoading());
  try {
    let response = await axios.get(`/api/count/table/${params}`);
    const tablecount = response.data;
    sessionStorage.setItem(tabCount, tablecount);
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
  }
};

export const setLoading = () => {
  return { type: ACTION_LOADING };
};
