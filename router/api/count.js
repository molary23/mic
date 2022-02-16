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
@route GET api/count/users
@desc Admin Count users
@access private
*/

router.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  (_req, res) => {
    UserView.count()
      .then((count) => {
        res.json(count);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route GET api/count/signals
@desc Admin Count signals
@access private
*/

router.get(
  "/signals",
  passport.authenticate("jwt", { session: false }),
  (_req, res) => {
    SignalView.count()
      .then((count) => {
        res.json(count);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route GET api/count/payments
@desc Admin Count payments
@access private
*/

router.get(
  "/payments",
  passport.authenticate("jwt", { session: false }),
  (_req, res) => {
    Payment.count()
      .then((count) => {
        res.json(count);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route GET api/count/transactions
@desc Admin Count transactions
@access private
*/

router.get(
  "/transactions",
  passport.authenticate("jwt", { session: false }),
  (_req, res) => {
    TransactionView.count()
      .then((count) => {
        res.json(count);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route GET api/count/subscriptions
@desc Admin Count subscriptions
@access private
*/

router.get(
  "/subscriptions",
  passport.authenticate("jwt", { session: false }),
  (_req, res) => {
    SubscriptionView.count()
      .then((count) => {
        res.json(count);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route GET api/count/bonus
@desc Admin Count bonus
@access private
*/

router.get(
  "/bonus",
  passport.authenticate("jwt", { session: false }),
  (_req, res) => {
    BonusView.count()
      .then((count) => {
        res.json(count);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route GET api/count/providers
@desc Admin Count providers
@access private
*/

router.get(
  "/providers",
  passport.authenticate("jwt", { session: false }),
  (_req, res) => {
    ProviderView.count()
      .then((count) => {
        res.json(count);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route GET api/count/superadmin
@desc Admin Count superadmin
@access private
*/

router.get(
  "/superadmin",
  passport.authenticate("jwt", { session: false }),
  (_req, res) => {
    SuperView.count()
      .then((count) => {
        res.json(count);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route GET api/count/referral
@desc Admin Count referral
@access private
*/

router.get(
  "/referral",
  passport.authenticate("jwt", { session: false }),
  (_req, res) => {
    ReferralView.count()
      .then((count) => {
        res.json(count);
      })
      .catch((err) => res.status(404).json(err));
  }
);
module.exports = router;
