import { GET_ALL_CLIENTAPP, SET_TEAM_MEMBERS } from "../actions/types";

const initialState = {
  schedules: [],
  teamMembers: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CLIENTAPP:
      return Object.assign({}, state, {
        schedules: action.payload
      });
    case SET_TEAM_MEMBERS:
      return Object.assign({}, state, {
        teamMembers: action.payload
      });
    default:
      return state;
  }
}
