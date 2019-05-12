import {
  USERLOGIN_MODAL_OPEN,
  USERLOGIN_MODAL_CLOSE,
  TEAMLOGIN_MODAL_OPEN,
  TEAMLOGIN_MODAL_CLOSE,
  PROFILE_MODAL_OPEN,
  PROFILE_MODAL_CLOSE,
  ADD_APPOINTMENT_MODAL_OPEN,
  ADD_APPOINTMENT_MODAL_CLOSE,
  DATA_LOADING,
  LOADING_DONE
} from "../actions/types";

const initialState = {
  userLoginIsOpen: false,
  teamLoginIsOpen: false,
  profileModalIsOpen: false,
  dataLoading: false,
  addAppointmentModalisOpen: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USERLOGIN_MODAL_CLOSE:
      return Object.assign({}, state, {
        userLoginIsOpen: false
      });
    case USERLOGIN_MODAL_OPEN:
      return Object.assign({}, state, {
        userLoginIsOpen: true
      });
    case TEAMLOGIN_MODAL_CLOSE:
      return Object.assign({}, state, {
        teamLoginIsOpen: false
      });
    case TEAMLOGIN_MODAL_OPEN:
      return Object.assign({}, state, {
        teamLoginIsOpen: true
      });
    case PROFILE_MODAL_CLOSE:
      return Object.assign({}, state, {
        profileModalIsOpen: false
      });
    case PROFILE_MODAL_OPEN:
      return Object.assign({}, state, {
        profileModalIsOpen: true
      });
    case ADD_APPOINTMENT_MODAL_OPEN:
      return Object.assign({}, state, {
        addAppointmentModalisOpen: true
      });
    case ADD_APPOINTMENT_MODAL_CLOSE:
      return Object.assign({}, state, {
        addAppointmentModalisOpen: false
      });
    case DATA_LOADING:
      return Object.assign({}, state, {
        dataLoading: true
      });
    case LOADING_DONE:
      return Object.assign({}, state, {
        dataLoading: false
      });
    default:
      return state;
  }
}
