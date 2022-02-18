const express = require("express"),
  router = express.Router(),
  passport = require("passport"),
  { Op } = require("sequelize"),
  Payment = require("../../db/models/Payment"),
  SubscriptionView = require("../../db/models/SubscriptionView"),
  TransactionView = require("../../db/models/TransactionView"),
  ProviderView = require("../../db/models/ProviderView"),
  ReferralView = require("../../db/models/ReferralView"),
  SignalView = require("../../db/models/SignalView"),
  BonusView = require("../../db/models/BonusView"),
  UserView = require("../../db/models/UserView"),
  SuperView = require("../../db/models/SuperView"),
  //Bring in Super Admin Checker
  checkSuperAdmin = require("../../validation/superCheck");

/*
@route GET api/count/:table
@desc Admin Count rows in specified tables
@access private
*/

router.get(
  "/:table",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const table = req.params.table;
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
    } else if (table === "bonus") {
      view = BonusView;
    } else if (table === "providers") {
      view = ProviderView;
    } else if (table === "superadmin") {
      view = SuperView;
    } else if (table === "referrals") {
      view = ReferralView;
    }

    try {
      count = await view.count();
      res.json(count);
    } catch (error) {
      res.status(404).json(error);
    }
  }
);
module.exports = router;
