const express = require("express"),
  router = express.Router(),
  bcrypt = require("bcryptjs"),
  Sequelize = require("sequelize"),
  passport = require("passport"),
  { Op } = require("sequelize"),
  // Use Json Web Token
  jwt = require("jsonwebtoken"),
  keys = require("../../config/keys"),
  User = require("../../model/User"),
  Signal = require("../../model/Signal"),
  //Bring in the Validation
  //Bring in Super Admin Checker
  checkAdmin = require("../../validation/adminCheck");

module.exports = router;
