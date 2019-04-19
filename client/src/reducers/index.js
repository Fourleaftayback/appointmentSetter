import { combineReducers } from "redux";
//add reducers here

import authReducer from "./authReducer";

export default combineReducers({
  auth: authReducer
});
