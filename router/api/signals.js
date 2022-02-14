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
  Currency = require("../../model/Currency"),
  //Bring in the Validation
  validateSignalInput = require("../../validation/signal"),
  //Bring in Admin Checker
  checkAdmin = require("../../validation/adminCheck"),
  //Bring in Super Admin Checker
  checkSuperAdmin = require("../../validation/superCheck");

/*
@route POST api/signals/add
@desc SP add Signal
@access private
*/

router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    const { errors, isValid } = validateSignalInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const signalFields = {};
    signalFields.UserId = req.user.id;
    signalFields.signaloption = req.body.signaloption;
    signalFields.CurrencyId = req.body.currency;
    if (req.body.takeprofit) signalFields.takeprofit = req.body.takeprofit;
    if (req.body.stoploss) signalFields.stoploss = req.body.stoploss;
    if (req.body.startrange) signalFields.startrange = req.body.startrange;
    if (req.body.endrange) signalFields.endrange = req.body.endrange;
    if (req.body.pip) signalFields.pip = req.body.pip;

    Signal.create(signalFields)
      .then((signal) => {
        res.json(signal);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route POST api/signals/currency/add
@desc Super Admin add Currency
@access private
*/
router.post(
  "/currency/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }

    if (req.body.currency === "" || req.body.currency === undefined) {
      error.currency = "Currency Field can't be Empty";
      return res.status(400).json(error);
    }
    const currencyFields = {};
    currencyFields.currency = req.body.currency;
    currencyFields.UserId = req.user.id;

    Currency.findOne({
      where: {
        currency: currencyFields.currency,
      },
    })
      .then((currency) => {
        if (currency) {
          error.currency = "Currency Combination exist!";
          res.json(error);
        } else {
          Currency.create(currencyFields)
            .then((currency) => {
              res.json(currency);
            })
            .catch((err) => res.status(404).json(err));
        }
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route POST api/signals/update/:id
@desc SP update Signal
@access private
*/

router.post(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    const signalID = req.params.id,
      userID = req.user.id;
    Signal.findOne({
      where: { id: signalID },
      attributes: ["UserId"],
    })
      .then((signal) => {
        if (signal.UserId === userID) {
          const signalFields = {};
          if (req.body.signaloption)
            signalFields.signaloption = req.body.signaloption;
          if (req.body.currency) signalFields.CurrencyId = req.body.currency;
          if (req.body.takeprofit)
            signalFields.takeprofit = req.body.takeprofit;
          if (req.body.stoploss) signalFields.stoploss = req.body.stoploss;
          if (req.body.startrange)
            signalFields.startrange = req.body.startrange;
          if (req.body.endrange) signalFields.endrange = req.body.endrange;
          if (req.body.status) signalFields.status = req.body.status;
          if (req.body.pip) signalFields.pip = req.body.pip;

          Signal.update(signalFields, { where: { id: signalID } })
            .then(() => {
              res.json({ message: "Signal updated Successfully!" });
            })
            .catch((err) => res.status(404).json(err));
        } else {
          error.user = "You are not authorised to update this Signal.";
          res.status(400).json(error);
        }
      })
      .catch((err) => res.status(404).json(err));
  }
);

module.exports = router;
