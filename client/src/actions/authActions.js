import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import history from "../history/History";

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  CLEAR_ERRORS,
  USER_MODAL_TOGGLE
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
      dispatch({
        type: CLEAR_ERRORS
      });
      dispatch({
        type: USER_MODAL_TOGGLE
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
        type: USER_MODAL_TOGGLE
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
};
