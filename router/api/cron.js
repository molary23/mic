const express = require("express"),
  router = express.Router(),
  bcrypt = require("bcryptjs"),
  Sequelize = require("sequelize"),
  gravatar = require("gravatar"),
  passport = require("passport"),
  { Op } = require("sequelize"),
  // Use Json Web Token
  jwt = require("jsonwebtoken"),
  keys = require("../../config/keys"),
  User = require("../../db/models/User"),
  Verify = require("../../db/models/Verify"),
  Referral = require("../../db/models/Referral"),
  Bonus = require("../../db/models/Bonus"),
  Premium = require("../../db/models/Premium"),
  Settings = require("../../db/models/Settings"),
  Preference = require("../../db/models/Preference");

/*
@route GET api/cron/premium/
@desc Self Updating of Premium
@access public
*/

router.get("/premium", (req, res) => {
  Premium.update(
    { status: "i" },
    {
      where: {
        enddate: new Date().toISOString(),
        status: "a",
      },
    }
  )
    .then(() => {
      return res.json(true);
    })
    .catch((err) => res.json(err));
});

/*
@route GET api/cron/bonus/
@desc Self Updating of Bonus
@access public
*/

router.get("/bonus", (req, res) => {
  let removeday = new Date(new Date().setDate(new Date().getDate() - 7));

  let year = removeday.getFullYear(),
    month = removeday.getMonth() + 1,
    day = removeday.getDate(),
    formatttedDate = `${year}-${month}-${day}`;

  Bonus.update(
    { status: "a" },
    {
      where: sequelize.where(
        sequelize.fn("date", sequelize.col("createdAt")),
        "=",
        formatttedDate
      ),
      status: "p",
    }
  )
    .then(() => {
      return res.json(true);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
