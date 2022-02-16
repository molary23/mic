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
  Pass = require("../../db/models/Pass"),
  Referral = require("../../db/models/Referral"),
  Profile = require("../../db/models/Profile"),
  Premium = require("../../db/models/Premium"),
  Payment = require("../../db/models/Payment"),
  Subscription = require("../../db/models/Subscription"),
  Settings = require("../../db/models/Settings"),
  // Bring in View
  SignalView = require("../../db/models/SignalView"),
  UserView = require("../../db/models/UserView"),
  // Bring in User Checker
  checkUser = require("../../validation/checkUser");
/*
@route GET api/view/payments
@desc User View Payments
@access private
*/

router.get(
  "/payments",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkUser(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    const UserId = req.user.id;
    Payment.findAll({
      where: {
        UserId,
      },
    })
      .then((pay) => {
        res.json(pay);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route GET api/view/subscriptions
@desc User View subscriptions
@access private
*/

router.get(
  "/subscriptions",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkUser(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    const UserId = req.user.id;
    Subscription.findAll(
      {
        where: {
          UserId,
        },
      },
      {
        include: [Payment],
      }
    )
      .then((sub) => {
        res.json(sub);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route GET api/user/bonus
desc User View bonus
@access private
*/

router.get(
  "/bonus",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkUser(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    const UserId = req.user.id;
    Bonus.findAll({
      where: { UserId },
      include: [Payment],
    })
      .then((bonus) => {
        res.json(bonus);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route GET api/user/transactions
desc User View transactions
@access private
*/

router.get(
  "/transactions",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkUser(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    const UserId = req.user.id;
    let clause = {},
      where = {};
    where.UserId = UserId;
    if (req.body.type && !req.body.method) {
      where.type = req.body.type;
    } else if (!req.body.type && req.body.method) {
      where.method = req.body.method;
    } else if (req.body.type && req.body.method) {
      where.method = req.body.method;
      where.type = req.body.type;
    }
    clause = { where };
    Transaction.findAll(clause)
      .then((transactions) => {
        res.json(transactions);
      })
      .catch((err) => res.status(404).json(err));
  }
);
module.exports = router;
