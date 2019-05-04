import { combineReducers } from "redux";
//add reducers here

import authReducer from "./authReducer";
import errorsReducer from "./errorsReducer";
import viewsReducer from "./viewsReducer";
import clientAppointmentReducers from "./clientAppointmentReducer";

export default combineReducers({
  auth: authReducer,
  clientAppointment: clientAppointmentReducers,
  errors: errorsReducer,
  views: viewsReducer
});
