const Validator = require("validator");
const isEmpty = require("./isEmptyChecker");

module.exports = function validateProfile(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.first_name = !isEmpty(data.first_name) ? data.first_name : "";
  data.last_name = !isEmpty(data.last_name) ? data.last_name : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";

  if (Validator.isEmpty(data.email)) errors.email = "Email is required";

  if (!Validator.isEmail(data.email)) errors.email = "Email is invalid";

  if (Validator.isEmpty(data.first_name))
    errors.first_name = "First name is required";

  if (Validator.isEmpty(data.last_name))
    errors.last_name = "Last name is required";

  if (Validator.isEmpty(data.phone)) errors.phone = "Phone number is required";

  if (!Validator.isInt(data.phone))
    errors.phone = "Phone number can not contain letters";

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
