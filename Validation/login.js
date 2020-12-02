const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.telePhoneNumber = !isEmpty(data.telePhoneNumber) ? data.telePhoneNumber : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isNumeric(data.telePhoneNumber)) {
    errors.telePhoneNumber = "telePhoneNumber must be a Number";
  }

  if (!Validator.isLength(data.telePhoneNumber, { min: 10, max: 10 })) {
    errors.telePhoneNumber = "telePhoneNumber must be 10 Numeric characters";
  }

  if (Validator.isEmpty(data.telePhoneNumber)) {
    errors.telePhoneNumber = "telePhoneNumber field is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
