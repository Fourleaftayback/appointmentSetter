import { GET_ALL_TEAMAPP, GET_ALL_CLIENTS } from "../actions/types";

const initialState = {
  schedules: [],
  listOfClient: []
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
    default:
      return state;
  }
}
