import { TEXT_DISPATCH, GET_ERRORS } from "./types";
import axios from "axios";
import errorReducer from "../reducers/errorReducer";

export const registeruser = (userData, history) => (dispatch) => {
  dispatch({
    type: TEXT_DISPATCH,
    payload: userData,
  });
};

export const loginuser = (userData, history) => (dispatch) => {
  axios
    .post("/api/public/login/", userData, {})
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set Token to Auth Header
      /* setAuthToken(token);
    //Decode Token
    const decode = jwt_decode(token);
    dispatch(setCurrentUser(decoded))*/
    })
    .catch((error) =>
      dispatch({ type: GET_ERRORS, payload: error.response.data })
    );
};
