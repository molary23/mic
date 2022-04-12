const express = require("express"),
  router = express.Router(),
  passport = require("passport"),
  { Op } = require("sequelize"),
  Payment = require("../../db/models/Payment"),
  Referral = require("../../db/models/Referral"),
  Bonus = require("../../db/models/Bonus"),
  Transaction = require("../../db/models/Transaction"),
  Subscription = require("../../db/models/Subscription"),
  Forum = require("../../db/models/Forum"),
  SignalView = require("../../db/models/SignalView"),
  CountView = require("../../db/models/CountView"),
  //Bring in Super Admin Checker
  checkSuperAdmin = require("../../validation/superCheck"),
  checkPr = require("../../validation/checkPr"),
  checkUser = require("../../validation/checkUser");

/*
@route GET api/count/admin/all
@desc Admin Count rows in specified tables
@access private
*/

router.get(
  "/admin/all",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }

    CountView.findOne({
      attributes: [
        "users",
        "signals",
        "payments",
        "transactions",
        "subscriptions",
        "bonus",
        "providers",
        "referrals",
        "currency",
        "admins",
        "accounts",
        "announcements",
        "withdrawals",
        "wallets",
        "forums",
      ],
    })
      .then((count) => {
        return res.json(count);
      })
      .catch((err) => res.status(404).json(err));
  }
);

router.get(
  "/provider/all",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { error, isLevel } = checkPr(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    const count = {};
    try {
      count.signals = await SignalView.count();
      res.json(count);
    } catch (error) {
      res.status(404).json(error);
    }
  }
);

/*
@route GET api/count/user/all
@desc Admin Count rows in specified tables
@access private
*/

router.get(
  "/user/all",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { error, isLevel } = checkUser(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }

    let UserId = req.user.id;
    const count = {};

    try {
      count.payments = await Payment.count({ where: { UserId } });
      count.transactions = await Transaction.count({ where: { UserId } });
      count.subscriptions = await Subscription.count({ where: { UserId } });
      count.bonus = await Bonus.count({ where: { UserId } });
      count.referrals = await Referral.count({ where: { referral: UserId } });
      count.forums = await Forum.count({
        where: { [Op.or]: [{ UserId }, { right: "p" }] },
      });

      count.signals = await SignalView.count({
        distinct: true,
        col: "CurrencyId",
      });
      res.json(count);
    } catch (error) {
      res.status(404).json(error);
    }
  }
);
module.exports = router;
