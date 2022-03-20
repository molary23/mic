const Preference = require("../../db/models/Preference");

const express = require("express"),
  router = express.Router(),
  bcrypt = require("bcryptjs"),
  Sequelize = require("sequelize"),
  passport = require("passport"),
  { Op } = require("sequelize"),
  // Use Json Web Token
  jwt = require("jsonwebtoken"),
  keys = require("../../config/keys"),
  User = require("../../db/models/User"),
  Signal = require("../../db/models/Signal"),
  Currency = require("../../db/models/Currency"),
  SignalView = require("../../db/models/SignalView"),
  //Bring in the Validation
  validateSignalInput = require("../../validation/signal"),
  //Bring in Admin Checker
  checkAdmin = require("../../validation/adminCheck"),
  //Bring in Super Admin Checker
  checkSuperAdmin = require("../../validation/superCheck"),
  checkPr = require("../../validation/checkPr");

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
    signalFields.CurrencyId = req.body.pair;
    if (req.body.pair) signalFields.CurrencyId = req.body.pair;
    if (req.body.option) signalFields.signaloption = req.body.option;
    if (req.body.takeprofit) signalFields.takeprofit = req.body.takeprofit;
    if (req.body.stoploss) signalFields.stoploss = req.body.stoploss;
    if (req.body.startrange)
      signalFields.startrange = parseFloat(req.body.startrange);
    if (req.body.endrange)
      signalFields.endrange = parseFloat(req.body.endrange);
    if (req.body.pip) signalFields.pip = parseFloat(req.body.pip);

    Signal.create(signalFields)
      .then(() => {
        res.json(true);
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

    if (req.body.firstcurrencypair.length <= 0) {
      error.currency = "First Currency Field can't be Empty";
      return res.status(400).json(error);
    } else if (req.body.secondcurrencypair.length <= 0) {
      error.currency = "Second Currency Field can't be Empty";
      return res.status(400).json(error);
    }
    const currencyFields = {};
    currencyFields.firstcurrency = req.body.firstcurrencypair;
    currencyFields.secondcurrency = req.body.secondcurrencypair;
    currencyFields.UserId = req.user.id;

    Currency.findOne({
      where: {
        [Op.and]: [
          { firstcurrency: { [Op.regexp]: currencyFields.firstcurrency[0] } },
          { firstcurrency: { [Op.regexp]: currencyFields.firstcurrency[1] } },
          { secondcurrency: { [Op.regexp]: currencyFields.secondcurrency[0] } },
          { secondcurrency: { [Op.regexp]: currencyFields.secondcurrency[1] } },
        ],
      },
    })
      .then((currency) => {
        if (currency) {
          error.currency = "Currency Combination exist!";
          res.status(400).json(error);
        } else {
          Currency.create(currencyFields)
            .then(() => {
              res.json(true);
            })
            .catch((err) => res.status(400).json(err));
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
    const signalID = req.params.id.split(":")[1],
      userID = req.user.id;
    Signal.findOne({
      where: { id: signalID },
      attributes: ["UserId"],
    })
      .then((signal) => {
        if (signal.UserId === userID) {
          const signalFields = {};
          if (req.body.option) signalFields.signaloption = req.body.option;
          if (req.body.pair) signalFields.CurrencyId = req.body.pair;
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
              res.json(true);
            })
            .catch((err) => res.status(404).json(err));
        } else {
          error.update = "You are not authorised to update this Signal.";
          res.status(400).json(error);
        }
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route GET api/signals/signals
@desc Providers View signals
@access private
*/

router.post(
  "/providers",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkPr(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }

    let limit = null,
      offset = 0,
      search = null,
      status = null,
      signaloption = null,
      providerid = req.user.id,
      where = { providerid },
      result = [];

    if (req.body.limit) limit = req.body.limit;
    if (req.body.offset) offset = req.body.offset;
    if (req.body.search) search = req.body.search;
    if (req.body.status) status = req.body.status;
    if (req.body.signaloption) signaloption = req.body.signaloption;

    if (status !== null) {
      where = { ...where, ...{ status } };
    }
    if (signaloption !== null) {
      where = { ...where, ...{ signaloption } };
    }

    if (search !== null) {
      const searchArray = search.split("+");
      if (searchArray.length > 1) {
        let newSearchArray = [],
          newSearchObj = {};
        for (let i = 0; i < searchArray.length; i++) {
          newSearchObj = {
            [Op.or]: [
              {
                firstcurrency: { [Op.substring]: searchArray[i] },
              },
              {
                secondcurrency: { [Op.substring]: searchArray[i] },
              },
            ],
          };
          newSearchArray.push(newSearchObj);
        }
        where = { ...where, ...{ [Op.and]: newSearchArray } };
      } else {
        let searchTerms = searchArray[0];
        where = {
          ...where,
          ...{
            [Op.or]: [
              { firstcurrency: { [Op.substring]: searchTerms } },
              { secondcurrency: { [Op.substring]: searchTerms } },
            ],
          },
        };
      }
    }

    const query = {
      order: [["signalid", "DESC"]],
      limit,
      offset,
      attributes: [
        "signalid",
        "firstcurrency",
        "secondcurrency",
        "takeprofit",
        "stoploss",
        "pip",
        "createdAt",
        "updatedAt",
        "provider",
        "providerid",
        "signaloption",
        "status",
        "CurrencyId",
        "startrange",
        "endrange",
      ],
      where,
      raw: true,
    };

    SignalView.findAndCountAll(query)
      .then((entries) => {
        const { count, rows } = entries;
        result = [...[count], ...rows];
        res.json(result);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route GET api/signals/currencies
@desc Providers View Currencies
@access private
*/

router.get(
  "/currencies",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkPr(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    Currency.findAll({
      where: {
        status: "a",
      },
      attributes: ["id", "firstcurrency", "secondcurrency"],
    })
      .then((currency) => {
        res.json(currency);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route GET api/signals/currency/delete/:id
@desc Admin Delete currency
@access private
*/

router.post(
  "/currency/update/:action/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    let id = req.params.id.split(":")[1];
    let action = req.params.action.split(":")[1];
    id = parseInt(id);

    let status;
    if (action === "delete") {
      status = "i";
    } else if (action === "activate") {
      status = "a";
    }

    Currency.update(
      { status },
      {
        where: {
          id,
        },
      }
    )
      .then(() => {
        res.json(true);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route GET api/signals/currency/delete/:id
@desc Admin Delete currency
@access private
*/

router.get(
  "/followers",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkPr(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }

    let UserId = req.user.id;

    Preference.count({
      where: {
        [Op.or]: [
          { providers: null },
          {
            providers: { [Op.regexp]: UserId },
          },
        ],
      },
    })
      .then((count) => {
        res.json(count);
      })
      .catch((err) => res.status(404).json(err));
  }
);
module.exports = router;
