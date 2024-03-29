import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, CLEAR_ERRORS, SET_TEAM_MEMBERS, MESSAGE } from "./types";

import { getUserApps } from "./clientAppActions";

import { setCurrentUser } from "./authActions";

import { getAllTeamApp } from "./teamAppActions";

import { deleteModalToggle, profileModalToggle } from "./viewsActions";

export const deleteAppointment = (url, id) => dispatch => {
  axios
    .delete(url + id)
    .then(res => {
      dispatch(deleteModalToggle());
    })
    .then(() => {
      if (url === "/team/appointment/delete/") {
        dispatch(getAllTeamApp());
      } else {
        dispatch(getUserApps());
      }
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const modifyUser = (url, userData) => dispatch => {
  axios
    .put(url, userData)
    .then(res => {
      localStorage.removeItem("jwtToken");
      setAuthToken(false);
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .then(() => {
      dispatch({
        type: CLEAR_ERRORS
      });
    })
    .then(() => {
      dispatch(profileModalToggle());
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
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
        payload: err.response.data
      });
    });
};

export const sendResetRequest = (url, email) => dispatch => {
  axios
    .post(url, email)
    .then(res =>
      dispatch({
        type: MESSAGE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
