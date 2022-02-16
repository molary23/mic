const isEmpty = require("./emptyChecker"),
  userCheck = (value) => {
    const error = {};

    if (isEmpty(value)) {
      error.level = "User level not specified";
    }

    if (value > 1) {
      error.level = "You are not authorised to perform this task";
    }

    return {
      error,
      isLevel: isEmpty(error),
    };
  };

module.exports = userCheck;
