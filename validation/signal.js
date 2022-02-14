const validator = require("validator"),
  isEmpty = require("./emptyChecker");

module.exports = function validateSignalInput(data) {
  let errors = {};

  data.signaloption = !isEmpty(data.signaloption) ? data.signaloption : "";
  data.currency = !isEmpty(data.currency) ? data.currency : "";

  if (validator.isEmpty(data.signaloption)) {
    errors.signaloption = "Signal Option Field must be selected!";
  }

  if (validator.isEmpty(data.currency)) {
    errors.currency = "Currency Combination Field must be selected!";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
