import axios from "axios";

import {
  GET_ERRORS,
  GET_ALL_TEAMAPP,
  GET_ALL_CLIENTS,
  GET_APPBY_TEAMID,
  GET_APPBY_DATE_ID
} from "./types";

import { getAllTeamMembers } from "./commonAppActions";
import { addAppointmentModalToggle } from "./viewsActions";

import { roundToDay } from "../controller/dataConverter";

export const getAllTeamApp = () => dispatch => {
  dispatch(getAllTeamMembers());
  axios
    .get("/team/appointment/all")
    .then(res => {
      dispatch({ type: GET_ALL_TEAMAPP, payload: res.data });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

export const getAllClients = () => dispatch => {
  axios
    .get("/team/appointment/allclients")
    .then(res => {
      dispatch({
        type: GET_ALL_CLIENTS,
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

export const addTeamAppoinment = appData => dispatch => {
  axios
    .post("/team/appointment/add", appData)
    .then(res => {
      dispatch(addAppointmentModalToggle());
    })
    .then(() => {
      dispatch(getAllTeamApp());
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

export const confirmAppointment = id => dispatch => {
  axios
    .put(`/confirm/team/appointment/${id}`)
    .then(res => {
      dispatch(getAllTeamApp());
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};

export const getAppByTeamId = (id, allAppointments) => dispatch => {
  const appointments = allAppointments.filter(
    item => item.team_member_id === id
  );
  dispatch({
    type: GET_APPBY_TEAMID,
    payload: appointments
  });
};

export const filterByDateAndId = (id, date, allAppointments) => dispatch => {
  const appointments = allAppointments.filter(
    item =>
      item.team_member_id === id &&
      roundToDay(item.appointment_start).getTime() === date.getTime()
  );
  dispatch({
    type: GET_APPBY_DATE_ID,
    payload: appointments
  });
};
