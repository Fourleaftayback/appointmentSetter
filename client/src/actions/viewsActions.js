import {
  USERLOGIN_MODAL_TOGGLE,
  PROFILE_MODAL_TOGGLE,
  TEAMLOGIN_MODAL_TOGGLE,
  ADD_APPOINTMENT_MODAL_TOGGLE
} from "./types";

export const userLoginModalToggle = () => {
  return {
    type: USERLOGIN_MODAL_TOGGLE
  };
};

export const teamLoginModalToggle = () => {
  return {
    type: TEAMLOGIN_MODAL_TOGGLE
  };
};

export const profileModalToggle = () => {
  return {
    type: PROFILE_MODAL_TOGGLE
  };
};

export const addAppointmentModalToggle = () => {
  return {
    type: ADD_APPOINTMENT_MODAL_TOGGLE
  };
};
