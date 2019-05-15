import { combineReducers } from "redux";
//add reducers here

import authReducer from "./authReducer";
import errorsReducer from "./errorsReducer";
import viewsReducer from "./viewsReducer";
import clientAppointmentReducers from "./clientAppointmentReducer";
import teamAppointmentReducers from "./teamAppointmentReducer";
import adminReducer from "./adminReducer";

export default combineReducers({
  auth: authReducer,
  clientAppointment: clientAppointmentReducers,
  teamAppointment: teamAppointmentReducers,
  errors: errorsReducer,
  views: viewsReducer,
  admin: adminReducer
});
