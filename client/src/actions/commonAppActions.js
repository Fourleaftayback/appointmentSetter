import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, CLEAR_ERRORS, SET_TEAM_MEMBERS } from "./types";

import { getUserApps } from "./clientAppActions";

import { setCurrentUser } from "./authActions";

import { profileModalToggle } from "./viewsActions";

export const deleteAppointment = (url, id) => dispatch => {
  axios
    .delete(`${url}/${id}`)
    .then(res => {
      dispatch(getUserApps());
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
        payload: err.response
      });
    });
};
