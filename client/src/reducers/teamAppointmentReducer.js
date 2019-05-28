import {
  GET_ALL_TEAMAPP,
  GET_ALL_CLIENTS,
  GET_APPBY_TEAMID,
  GET_APPBY_DATE_ID,
  GET_DAYS_OFF_TEAM,
  GET_CONFIRM_DATA
} from "../actions/types";

const initialState = {
  schedules: [],
  listOfClient: [],
  appByCurrentTeamId: [],
  appByDateAndId: [],
  daysOff: [],
  confirmAppointment: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_TEAMAPP:
      return Object.assign({}, state, {
        schedules: action.payload
      });
    case GET_ALL_CLIENTS:
      return Object.assign({}, state, {
        listOfClient: action.payload
      });
    case GET_APPBY_TEAMID:
      return Object.assign({}, state, {
        appByCurrentTeamId: action.payload
      });
    case GET_APPBY_DATE_ID:
      return Object.assign({}, state, {
        appByDateAndId: action.payload
      });
    case GET_DAYS_OFF_TEAM:
      return Object.assign({}, state, {
        daysOff: action.payload
      });
    case GET_CONFIRM_DATA:
      return Object.assign({}, state, {
        confirmAppointment: action.payload
      });
    default:
      return state;
  }
}
