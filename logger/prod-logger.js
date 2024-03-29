const { createLogger, format, transports } = require("winston"),
  { combine, timestamp, level, label, printf } = format,
  DailyRotateFile = require("winston-daily-rotate-file");

const myFormat = printf(({ level, message, timestamp }) => {
  return `[${level}] ${timestamp} ${message}`;
});

const productionLogger = () => {
  return createLogger({
    level: "info",
    format: combine(format.colorize(), timestamp(), myFormat),
    transports: [
      new transports.DailyRotateFile({
        filename: "logs/development.log",
        datePattern: "DD-MMM-YYYY",
        format: format.combine(format.uncolorize()),
      }),
    ],
  });
};

module.exports = productionLogger;
