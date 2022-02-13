const validator = require("validator"),
  isEmpty = require("./emptyChecker");

module.exports = function validateSignalInput(data) {
  let errors = {};

  data.signalfrom = !isEmpty(data.signalfrom) ? data.signalfrom : "";
  data.signaltime = !isEmpty(data.signaltime) ? data.signaltime : "";
  data.boughtat = !isEmpty(data.boughtat) ? data.boughtat : "";
  data.soldat = !isEmpty(data.soldat) ? data.soldat : "";

  if (validator.isEmpty(data.signalfrom)) {
    errors.signalfrom = "Signal From Field can't be Empty";
  }

  if (validator.isEmpty(data.username)) {
    errors.username = "Username Field can't be Empty";
  }
  if (validator.isEmpty(data.signaltime)) {
    errors.signaltime = "Signal Time Field can't be Empty";
  }
  if (validator.isEmpty(data.boughtat)) {
    errors.boughtat = "Bought At Field can't be Empty";
  }
  if (validator.isEmpty(data.soldat)) {
    errors.soldat = "Sold At Field can't be Empty";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
