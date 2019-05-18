import axios from "axios";

import { GET_ERRORS, MESSAGE, GET_DAYS_OFF_TEAM } from "./types";

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
    .then(() => dispatch(getAllDaysOff()))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getAllDaysOff = () => dispatch => {
  axios
    .get("/daysoff/all")
    .then(res =>
      dispatch({
        type: GET_DAYS_OFF_TEAM,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
