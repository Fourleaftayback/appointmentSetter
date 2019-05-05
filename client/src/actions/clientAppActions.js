import axios from "axios";

import {
  DATA_LOADING,
  LOADING_DONE,
  GET_ALL_CLIENTAPP,
  GET_ERRORS,
  SET_TEAM_MEMBERS
} from "./types";

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

export const getAllTeamMembers = () => dispatch => {
  axios
    .get("/team/allmembers")
    .then(res => {
      dispatch({
        type: SET_TEAM_MEMBERS,
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
