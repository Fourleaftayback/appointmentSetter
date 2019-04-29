import { combineReducers } from "redux";
//add reducers here

import authReducer from "./authReducer";
import errorsReducer from "./errorsReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorsReducer
});
