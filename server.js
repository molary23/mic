const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  passport = require("passport"),
  // Bring in APIs
  users = require("./router/api/users");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Sync Sequelize
require("./model/util/Relationship");

app.use(passport.initialize());
// Passport Config
require("./config/passport")(passport);

app.use("/api/users", users);

const port = process.env.PORT || 10000;

app.listen(port, () => console.log(`Server running on port ${port}`));
