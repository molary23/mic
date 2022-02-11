const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  passport = require("passport"),
  sequelize = require("./config/dbcon"),
  // Bring in APIs
  users = require("./router/api/users");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Hello World!"));
app.use("/api/users", users);

const port = process.env.PORT || 10000;

app.listen(port, () => console.log(`Server running on port ${port}`));
