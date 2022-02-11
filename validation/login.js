const validator = require("validator"),
  isEmpty = require("./emptyChecker");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (validator.isEmpty(data.username)) {
    errors.username = "To Login Username/Email Address Field can't be Empty";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Password Field can't be Empty";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
