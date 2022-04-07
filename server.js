const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  passport = require("passport"),
  // Secure Header
  helmet = require("helmet"),
  // Error Logging
  winston = require("winston"),
  // CORS
  cors = require("cors"),
  morgan = require("morgan"),
  // Bring in APIs
  users = require("./router/api/users"),
  admin = require("./router/api/admin"),
  signals = require("./router/api/signals"),
  view = require("./router/api/view"),
  adminview = require("./router/api/adminview"),
  userview = require("./router/api/userview"),
  count = require("./router/api/count"),
  download = require("./router/api/download"),
  payments = require("./router/api/payments");

app.use(helmet());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan("combined"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Logging Error
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

//Sync Sequelize
require("./util/Relationship");

app.use(passport.initialize());
// Passport Config
require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api/admin", admin);
app.use("/api/signals", signals);
app.use("/api/view", view);
app.use("/api/payments", payments);
app.use("/api/adminview", adminview);
app.use("/api/userview", userview);
app.use("/api/count", count);
app.use("/api/download", download);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "../dashboard.micearnbusiness.org"));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "../dashboard.micearnbusiness.org", "index.html")
    );
  });
}

const port = process.env.PORT || 5001;

app.listen(port);
