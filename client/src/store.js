import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";

import {
  USER_MODAL_TOGGLE,
  USER_MODAL_OPEN,
  USER_MODAL_CLOSE
} from "./actions/types";

const initialState = {};

const userModalToggle = store => next => action => {
  const current = store.getState();
  if (action.type === USER_MODAL_TOGGLE) {
    current.views.userLoginIsOpen
      ? (action.type = USER_MODAL_CLOSE)
      : (action.type = USER_MODAL_OPEN);
  }
  next(action);
};

const middleware = [thunk, userModalToggle];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
