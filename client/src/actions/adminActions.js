import axios from "axios";

import { GET_ALL_TEAMADMIN, GET_ERRORS } from "./types";

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
        payload: err.response
      });
    });
};
