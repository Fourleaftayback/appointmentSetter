import axios from "axios";

import {
  DATA_LOADING,
  LOADING_DONE,
  GET_ALL_CLIENTAPP,
  GET_ERRORS
} from "./types";

export const getAllAppointments = () => dispatch => {
  dispatch({
    type: DATA_LOADING
  });
  axios
    .get("/appointment/all")
    .then(res => {
      dispatch({ type: GET_ALL_CLIENTAPP, payload: res.data });
    })
    .then(() => {
      dispatch({
        type: LOADING_DONE
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
