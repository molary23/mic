const validator = require("validator"),
  isEmpty = require("./emptyChecker");

module.exports = function validatePassInput(data) {
  let errors = {};

  data.password = !isEmpty(data.password) ? data.password : "";

  if (validator.isEmpty(data.password)) {
    errors.password = "Password Field can't be Empty";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
