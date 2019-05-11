import axios from "axios";
import history from "../history/History";

import {
  DATA_LOADING,
  LOADING_DONE,
  GET_ALL_CLIENTAPP,
  GET_ERRORS,
  SET_APP_JUSTMADE,
  SET_USER_APPS
} from "./types";

import { getAllTeamMembers } from "./commonAppActions";

export const getAllAppointments = () => dispatch => {
  dispatch({
    type: DATA_LOADING
  });
  dispatch(getAllTeamMembers());
  axios
    .get("/appointment/all")
    .then(res => {
      dispatch({ type: GET_ALL_CLIENTAPP, payload: res.data });
      return res.data;
    })
    .then(() => {
      dispatch({
        type: LOADING_DONE
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

export const getUserApps = () => dispatch => {
  axios
    .get("/appointment/user")
    .then(res => {
      dispatch({
        type: SET_USER_APPS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

export const reqAppointment = appData => dispatch => {
  axios
    .post("/appointment/add", appData)
    .then(res => {
      dispatch({
        type: SET_APP_JUSTMADE,
        payload: res.data
      });
    })
    .then(() => {
      dispatch(getAllAppointments());
    })
    .then(() => {
      history.push("/pending");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};
