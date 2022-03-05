/*import axios from "axios";

import {
  ADD_NEW_SIGNAL,
  GET_ERRORS,
  CLEAR_ADD_NEW_SIGNAL,
  ACTION_LOADING,
} from "./types";

export const addSignal = (signal) => async (dispatch) => {
  dispatch(setLoading());
  let url = "/api/signals/add",
    type = ADD_NEW_SIGNAL;
  try {
    let response = await axios.post(url, signal);
    const result = await dispatch({
      type,
      payload: response.data,
    });
    return result;
  } catch (error) {
    console.log(error.response);
    dispatch({ type: GET_ERRORS, payload: error.response.data });
  }
};
export const clearNewSignal = () => {
  return { type: CLEAR_ADD_NEW_SIGNAL };
};

export const setLoading = () => {
  return { type: ACTION_LOADING };
};
*/
