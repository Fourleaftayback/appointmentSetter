import { USER_MODAL_TOGGLE, PROFILE_MODAL_TOGGLE } from "./types";

export const userModalToggle = () => {
  return {
    type: USER_MODAL_TOGGLE
  };
};

export const profileModalToggle = () => {
  return {
    type: PROFILE_MODAL_TOGGLE
  };
};
