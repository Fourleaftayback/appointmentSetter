import axios from "axios";

import { GET_ALL_TEAMADMIN, GET_ERRORS, MESSAGE } from "./types";

export const getAllTeamAdmin = () => dispatch => {
  axios
    .get("/team/allteam")
    .then(res => {
      dispatch({
        type: GET_ALL_TEAMADMIN,
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

//team/create

export const createNewTeamMate = newUser => dispatch => {
  axios
    .post("/team/create", newUser)
    .then(res => {
      dispatch({
        type: MESSAGE,
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
