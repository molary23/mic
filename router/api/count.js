const express = require("express"),
  router = express.Router(),
  passport = require("passport"),
  { Op } = require("sequelize"),
  Payment = require("../../db/models/Payment"),
  Referral = require("../../db/models/Referral"),
  Bonus = require("../../db/models/Bonus"),
  Transaction = require("../../db/models/Transaction"),
  Subscription = require("../../db/models/Subscription"),
  Currency = require("../../db/models/Currency"),
  Signal = require("../../db/models/Signal"),
  Announcement = require("../../db/models/Announcement"),
  Wallet = require("../../db/models/Wallet"),
  WithdrawalView = require("../../db/models/WithdrawalView"),
  SubscriptionView = require("../../db/models/SubscriptionView"),
  TransactionView = require("../../db/models/TransactionView"),
  ProviderView = require("../../db/models/ProviderView"),
  ReferralView = require("../../db/models/ReferralView"),
  SignalView = require("../../db/models/SignalView"),
  BonusView = require("../../db/models/BonusView"),
  UserView = require("../../db/models/UserView"),
  SuperView = require("../../db/models/SuperView"),
  AccountView = require("../../db/models/AccountView"),
  //Bring in Super Admin Checker
  checkSuperAdmin = require("../../validation/superCheck"),
  checkPr = require("../../validation/checkPr"),
  userCheck = require("../../validation/checkUser");

/*
@route GET api/count/:table
@desc Admin Count rows in specified tables
@access private


router.get(
  "/table/:table",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const table = JSON.parse(req.params.table);
    let unapprovedSubQuery, pendingSubQuery, approvedSubQuery;
    let view;
    if (table === "users") {
      view = UserView;
    } else if (table === "signals") {
      view = SignalView;
    } else if (table === "payments") {
      view = Payment;
    } else if (table === "transactions") {
      view = TransactionView;
    } else if (table === "subscriptions") {
      view = SubscriptionView;
      unapprovedSubQuery = { where: { status: 0 } };
      pendingSubQuery = { where: { status: 1 } };
      approvedSubQuery = { where: { status: 2 } };
    } else if (table === "bonus") {
      view = BonusView;
    } else if (table === "providers") {
      view = ProviderView;
    } else if (table === "superadmin") {
      view = SuperView;
    } else if (table === "referrals") {
      view = ReferralView;
    }
    const count = {};
    try {
      count.all = await view.count();
      count.unapproved = await view.count(unapprovedSubQuery);
      count.pending = await view.count(pendingSubQuery);
      count.approved = await view.count(approvedSubQuery);
      res.json(count);
    } catch (error) {
      res.status(404).json(error);
    }
  }
);
*/
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
    const count = {};

    try {
      count.users = await UserView.count();
      count.signals = await SignalView.count();
      count.payments = await Payment.count();
      count.transactions = await TransactionView.count();
      count.subscriptions = await SubscriptionView.count();
      count.bonus = await BonusView.count();
      count.providers = await ProviderView.count();
      count.referrals = await ReferralView.count();
      count.currency = await Currency.count();
      count.admins = await SuperView.count();
      count.providers = await ProviderView.count();
      count.accounts = await AccountView.count();
      count.announcement = await Announcement.count();
      count.withdrawals = await WithdrawalView.count();
      count.wallet = await Wallet.count();
      res.json(count);
    } catch (error) {
      res.status(404).json(error);
    }
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
    const { error, isLevel } = userCheck(req.user.level);
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
