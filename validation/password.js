const validator = require("validator"),
  isEmpty = require("./emptyChecker");

module.exports = function validatePassInput(data) {
  let errors = {};

  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (validator.isEmpty(data.password)) {
    errors.password = "Password Field can't be Empty";
  }
  if (validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password Field can't be Empty";
  }
  if (!validator.equals(data.password, data.password2)) {
    errors.passwords = "Password mismatched.";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
