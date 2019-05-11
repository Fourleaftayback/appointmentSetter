import axios from "axios";

import {
  DATA_LOADING,
  LOADING_DONE,
  GET_ERRORS,
  GET_ALL_TEAMAPP
} from "./types";

import { getAllTeamMembers } from "./commonAppActions";

export const getAllTeamApp = () => dispatch => {
  dispatch({
    type: DATA_LOADING
  });
  dispatch(getAllTeamMembers());
  axios
    .get("/team/appointment/all")
    .then(res => {
      dispatch({ type: GET_ALL_TEAMAPP, payload: res.data });
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
