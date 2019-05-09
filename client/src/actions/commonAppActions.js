import axios from "axios";
//import history from "../history/History";

import { GET_ERRORS } from "./types";

import { getUserApps } from "./clientAppActions";

export const deleteAppointment = (url, id) => dispatch => {
  axios
    .delete(`${url}/${id}`)
    .then(res => {
      dispatch(getUserApps());
    })
    .catch(err => {
      dispatchEvent({
        type: GET_ERRORS,
        payload: err.response
      });
    });
};
