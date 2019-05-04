import axios from "axios";

import {
  DATA_LOADING,
  LOADING_DONE,
  GET_ALL_CLIENTAPP,
  GET_ERRORS,
  SET_TEAM_MEMBERS
} from "./types";

import { removeDuplicateObj } from "../controller/dataConverter";

export const getAllAppointments = () => dispatch => {
  dispatch({
    type: DATA_LOADING
  });
  axios
    .get("/appointment/all")
    .then(res => {
      dispatch({ type: GET_ALL_CLIENTAPP, payload: res.data });
      return res.data;
    })
    .then(data => {
      let arr = data.map(item => {
        return {
          id: item.team_member_id,
          name: item.team_member_info.first_name
        };
      });
      let filteredArr = removeDuplicateObj(arr, "id");
      dispatch({
        type: SET_TEAM_MEMBERS,
        payload: filteredArr
      });
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
