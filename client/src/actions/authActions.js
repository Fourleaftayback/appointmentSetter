import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import history from "../history/History";

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  CLEAR_ERRORS,
  USERLOGIN_MODAL_TOGGLE,
  TEAMLOGIN_MODAL_TOGGLE
} from "./types";

// Register User
export const registerUser = userData => dispatch => {
  axios
    .post("/user/register", userData)
    .then(res => history.push("/"))
    .then(() => {
      dispatch({
        type: CLEAR_ERRORS
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - Get User Token
export const loginUser = userData => dispatch => {
  axios
    .post("/user/login", userData)
    .then(res => {
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
      dispatch({
        type: USERLOGIN_MODAL_TOGGLE
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Login - Get Team Token
export const loginTeam = userData => dispatch => {
  axios
    .post("/team/login", userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);

      dispatch(setCurrentUser(decoded));
      dispatch({
        type: CLEAR_ERRORS
      });
      dispatch({
        type: TEAMLOGIN_MODAL_TOGGLE
      });
    })
    .then(() => {
      history.push("/team");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
//Team - complete team registration //get token from url to hold the token in the body

export const completeTeamRegistration = teamData => dispatch => {
  axios
    .post("/team/register", teamData)
    .then(res => {
      dispatch({
        type: CLEAR_ERRORS
      });
      history.push("/");
    })
    .then(() => {
      setTimeout(() => {
        dispatch({
          type: TEAMLOGIN_MODAL_TOGGLE
        });
      }, 400);
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// log user out
export const logOutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  dispatch({ type: CLEAR_ERRORS });
  history.push("/");
};
