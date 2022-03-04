const validator = require("validator"),
  isEmpty = require("./emptyChecker");

module.exports = function validateConfirmInput(data) {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : "";
  data.code = !isEmpty(data.code) ? data.code : "";

  if (validator.isEmpty(data.username)) {
    errors.username = "Username/Email Address Field can't be Empty";
  }
  if (validator.isEmpty(data.code)) {
    errors.code = "Please enter the Password Reset Code sent to your Mail";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
