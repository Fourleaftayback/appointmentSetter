import { GET_ALL_TEAMADMIN } from "../actions/types";

const initialState = {
  allTeam: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_TEAMADMIN:
      return Object.assign({}, state, {
        allTeam: action.payload
      });
    default:
      return state;
  }
}
