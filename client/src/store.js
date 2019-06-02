import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";

import {
  USERLOGIN_MODAL_TOGGLE,
  USERLOGIN_MODAL_OPEN,
  USERLOGIN_MODAL_CLOSE,
  TEAMLOGIN_MODAL_TOGGLE,
  TEAMLOGIN_MODAL_OPEN,
  TEAMLOGIN_MODAL_CLOSE,
  PROFILE_MODAL_TOGGLE,
  PROFILE_MODAL_OPEN,
  PROFILE_MODAL_CLOSE,
  ADD_APPOINTMENT_MODAL_TOGGLE,
  ADD_APPOINTMENT_MODAL_OPEN,
  ADD_APPOINTMENT_MODAL_CLOSE,
  DELETE_MODAL_TOGGLE,
  DELETE_MODAL_OPEN,
  DELETE_MODAL_CLOSE,
  NAVBAR_TOGGLE,
  NAVBAR_OPEN,
  NAVBAR_CLOSE,
  DELETE_TEAM_TOGGLE,
  DELETE_TEAM_OPEN,
  DELETE_TEAM_CLOSE
} from "./actions/types";

const initialState = {};

const modalToggle = store => next => action => {
  const current = store.getState();
  if (action.type === USERLOGIN_MODAL_TOGGLE) {
    current.views.userLoginIsOpen
      ? (action.type = USERLOGIN_MODAL_CLOSE)
      : (action.type = USERLOGIN_MODAL_OPEN);
  }
  if (action.type === TEAMLOGIN_MODAL_TOGGLE) {
    current.views.teamLoginIsOpen
      ? (action.type = TEAMLOGIN_MODAL_CLOSE)
      : (action.type = TEAMLOGIN_MODAL_OPEN);
  }
  if (action.type === PROFILE_MODAL_TOGGLE) {
    current.views.profileModalIsOpen
      ? (action.type = PROFILE_MODAL_CLOSE)
      : (action.type = PROFILE_MODAL_OPEN);
  }
  if (action.type === ADD_APPOINTMENT_MODAL_TOGGLE) {
    current.views.addAppointmentModalisOpen
      ? (action.type = ADD_APPOINTMENT_MODAL_CLOSE)
      : (action.type = ADD_APPOINTMENT_MODAL_OPEN);
  }
  if (action.type === NAVBAR_TOGGLE) {
    current.views.navBarIsOpen
      ? (action.type = NAVBAR_CLOSE)
      : (action.type = NAVBAR_OPEN);
  }
  if (action.type === DELETE_MODAL_TOGGLE) {
    current.views.deleteModalIsOpen
      ? (action.type = DELETE_MODAL_CLOSE)
      : (action.type = DELETE_MODAL_OPEN);
  }
  if (action.type === DELETE_TEAM_TOGGLE) {
    current.views.deleteTeamIsOpen
      ? (action.type = DELETE_TEAM_CLOSE)
      : (action.type = DELETE_TEAM_OPEN);
  }
  next(action);
};

const middleware = [thunk, modalToggle];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(
      ...middleware
    ) /*,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() */
  )
);

export default store;
