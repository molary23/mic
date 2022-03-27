const validator = require("validator"),
  isEmpty = require("./emptyChecker");

module.exports = function validateSignalInput(data) {
  let errors = {};

  data.signaloption = !isEmpty(data.signaloption) ? data.signaloption : "";
  data.currencypair = !isEmpty(data.currencypair) ? data.currencypair : 0;
  data.takeprofit = !isEmpty(data.takeprofit) ? data.takeprofit : [];
  data.stoploss = !isEmpty(data.stoploss) ? data.stoploss : [];
  data.startrange = !isEmpty(data.startrange) ? data.startrange : "";
  data.endrange = !isEmpty(data.endrange) ? data.endrange : "";
  data.pip = !isEmpty(data.pip) ? data.pip : "";

  if (isNaN(data.currencypair) || validator.isEmpty(data.currencypair)) {
    errors.currencypair = "Currency Pair Field must be selected!";
  }
  if (validator.isEmpty(data.signaloption)) {
    errors.signaloption = "Signal Option Field must be selected!";
  }
  if (data.takeprofit.length <= 0) {
    errors.takeprofit = "Take Profit Field must be selected!";
  }
  if (data.stoploss.length <= 0) {
    errors.stoploss = "Stop Loss Field must be selected!";
  }
  if (validator.isEmpty(data.startrange)) {
    errors.startrange = "Start Range Field must be selected!";
  }
  if (validator.isEmpty(data.endrange)) {
    errors.endrange = "End Range Field must be selected!";
  }
  if (validator.isEmpty(data.pip)) {
    errors.pip = "Profit/Loss, Pip Field must be selected!";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
