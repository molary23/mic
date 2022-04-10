const { createLogger, format, transports } = require("winston"),
  winston = require("winston"),
  DailyRotateFile = require("winston-daily-rotate-file");

const transport = new winston.transports.DailyRotateFile({
  filename: "logs/server.log",
  datePattern: "yyyy-MM-DD",
  prepend: true,
  //level: "info",
  format: format.combine(
    format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
    format.align(),
    format.printf(
      (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
    )
  ),
});
const logger = new winston.createLogger({
  transports: [transport],
});
logger.info("Hello World!");
/*
const logger = createLogger({
  transports: new transports.File({
    filename: "logs/server.log",
    format: format.combine(
      format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
      format.align(),
      format.printf(
        (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
      )
    ),
  }),
});*/

module.exports = logger;
