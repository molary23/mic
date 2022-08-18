const developmentLogger = require("./dev-logger"),
  productionLogger = require("./prod-logger");

let logger = null;

if (process.env.NODE_ENV !== "production") {
  logger = developmentLogger();
}

if (process.env.NODE_ENV === "production") {
  logger = productionLogger();
}

module.exports = logger;
