import { GET_ALL_TEAMAPP } from "../actions/types";

const initialState = {
  schedules: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_TEAMAPP:
      return Object.assign({}, state, {
        schedules: action.payload
      });
    default:
      return state;
  }
}
