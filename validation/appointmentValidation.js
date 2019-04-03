const Validator = require("validator");
const isEmpty = require("./isEmptyChecker");

module.exports = function validateAppointmentInput(data) {
  let errors = {};

  data.appointment_type = !isEmpty(data.appointment_type)
    ? data.appointment_type
    : "";

  data.appointment_start = !isEmpty(data.appointment_start)
    ? data.appointment_start
    : "";
  data.appointment_end = !isEmpty(data.appointment_end)
    ? data.appointment_end
    : "";

  if (Validator.isEmpty(data.appointment_type))
    errors.appointment_type = "Apppointment type is required";

  if (Validator.isEmpty(data.appointment_start))
    errors.appointment_start = "Apppointment start date is required";
  /*
  if (Validator.isISO8601(data.appointment_start))
    errors.appointment_start = "Apppointment start date is not valid";
  */
  if (Validator.isEmpty(data.appointment_end))
    errors.appointment_end = "Apppointment end date is required";
  /*
  if (Validator.isISO8601(data.appointment_end))
    errors.appointment_end = "Apppointment end date is not valid";
  */
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
