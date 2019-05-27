import {
  USERLOGIN_MODAL_TOGGLE,
  PROFILE_MODAL_TOGGLE,
  TEAMLOGIN_MODAL_TOGGLE,
  ADD_APPOINTMENT_MODAL_TOGGLE,
  DELETE_MODAL_TOGGLE,
  DELETE_TEAM_TOGGLE,
  NAVBAR_TOGGLE
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

export const navBarToggle = () => {
  return {
    type: NAVBAR_TOGGLE
  };
};

export const deleteModalToggle = () => {
  return {
    type: DELETE_MODAL_TOGGLE
  };
};

export const deleteTeamToggle = () => {
  return {
    type: DELETE_TEAM_TOGGLE
  };
};
