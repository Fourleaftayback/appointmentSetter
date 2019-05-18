import axios from "axios";

import { GET_ERRORS, MESSAGE } from "./types";

import { getAllTeamApp } from "./teamAppActions";

export const setDaysOff = (url, data) => dispatch => {
  axios
    .post(url, data)
    .then(res =>
      dispatch({
        type: MESSAGE,
        payload: res.data
      })
    )
    .then(() => dispatch(getAllTeamApp()))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
