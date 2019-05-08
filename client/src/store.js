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
  PROFILE_MODAL_CLOSE
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
  next(action);
};

const middleware = [thunk, modalToggle];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
