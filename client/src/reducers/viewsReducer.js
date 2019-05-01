import {
  USER_MODAL_OPEN,
  USER_MODAL_CLOSE,
  PROFILE_MODAL_OPEN,
  PROFILE_MODAL_CLOSE
} from "../actions/types";

const initialState = {
  userLoginIsOpen: false,
  profileModalIsOpen: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_MODAL_CLOSE:
      return Object.assign({}, state, {
        userLoginIsOpen: false
      });
    case USER_MODAL_OPEN:
      return Object.assign({}, state, {
        userLoginIsOpen: true
      });
    case PROFILE_MODAL_CLOSE:
      return Object.assign({}, state, {
        profileModalIsOpen: false
      });
    case PROFILE_MODAL_OPEN:
      return Object.assign({}, state, {
        profileModalIsOpen: true
      });
    default:
      return state;
  }
}
