const Validator = require("validator");
const isEmpty = require("./isEmptyChecker");
const checkUSnumber = require("./phoneNumChecker");

module.exports = function validateProfile(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";

  if (Validator.isEmpty(data.email)) errors.email = "Email is required";

  if (!Validator.isEmail(data.email)) errors.email = "Email is invalid";

  if (Validator.isEmpty(data.phone)) errors.phone = "Phone number is required";

  if (!checkUSnumber(data.phone))
    errors.phone =
      "The phone number must be in US format. Example 555-555-5555, 5555555555, (555)5555555";

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
