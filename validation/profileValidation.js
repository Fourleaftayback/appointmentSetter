const Validator = require("validator");
const isEmpty = require("./isEmptyChecker");

module.exports = function validateProfile(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";

  if (Validator.isEmpty(data.email)) errors.email = "Email is required";

  if (!Validator.isEmail(data.email)) errors.email = "Email is invalid";

  if (Validator.isEmpty(data.phone)) errors.phone = "Phone number is required";

  if (!Validator.isInt(data.phone))
    errors.phone = "Phone number can not contain letters";

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
