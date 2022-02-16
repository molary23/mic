const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  passport = require("passport"),
  // Bring in APIs
  users = require("./router/api/users"),
  admin = require("./router/api/admin"),
  signals = require("./router/api/signals"),
  public = require("./router/api/public"),
  adminview = require("./router/api/adminview"),
  userview = require("./router/api/userview"),
  count = require("./router/api/count"),
  payments = require("./router/api/payments");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Sync Sequelize
require("./util/Relationship");

app.use(passport.initialize());
// Passport Config
require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api/admin", admin);
app.use("/api/signals", signals);
app.use("/api/public", public);
app.use("/api/payments", payments);
app.use("/api/adminview", adminview);
app.use("/api/userview", userview);
app.use("/api/count", count);

const port = process.env.PORT || 10000;

app.listen(port, () => console.log(`Server running on port ${port}`));
