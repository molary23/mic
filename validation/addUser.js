const validator = require("validator"),
  isEmpty = require("./emptyChecker");

module.exports = function validateAddUserInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.username = !isEmpty(data.username) ? data.username : "";

  if (validator.isEmpty(data.email)) {
    errors.email = "Email Field can't be Empty";
  }
  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (validator.isEmpty(data.username)) {
    errors.username = "Username Field can't be Empty";
  }
  if (validator.isEmail(data.username)) {
    errors.username = "Username can't be an Email Address";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Password Field can't be Empty";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
