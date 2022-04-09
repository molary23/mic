const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  passport = require("passport"),
  path = require("path"),
  fs = require("fs"),
  // Secure Header
  helmet = require("helmet"),
  // Error Logging
  winston = require("winston"),
  // CORS
  cors = require("cors"),
  morgan = require("morgan"),
  // Cron
  cron = require("node-cron"),
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

// Create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "logs", "access.log"),
  { flags: "a" }
);

// Setup the logger
app.use(morgan("combined", { stream: accessLogStream }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Bring Logger
const logger = require("./util/logger");

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

//Use Crons
require("./router/api/cron");

app.use((err, req, res, next) => {
  res.status(500).send("Could not perform the calculation!");
  logger.error(
    `${err.status || 500} - ${res.statusMessage} - ${err.message} - ${
      req.originalUrl
    } - ${req.method} - ${req.ip}`
  );
});

// Capture 404 erors
app.use((req, res, next) => {
  res.status(404).send("PAGE NOT FOUND");
  logger.error(
    `400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`
  );
});

const port = process.env.PORT || 5001;

app.listen(port);
