const express = require("express"),
  router = express.Router(),
  passport = require("passport"),
  postmark = require("postmark"),
  { Op } = require("sequelize"),
  // Use Json Web Token
  Signal = require("../../db/models/Signal"),
  Currency = require("../../db/models/Currency"),
  SignalView = require("../../db/models/SignalView"),
  Preference = require("../../db/models/Preference"),
  UserView = require("../../db/models/UserView"),
  //Bring in the Validation
  validateSignalInput = require("../../validation/signal"),
  //Bring in Admin Checker
  checkAdmin = require("../../validation/adminCheck"),
  //Bring in Super Admin Checker
  checkSuperAdmin = require("../../validation/superCheck"),
  checkPr = require("../../validation/checkPr"),
  validator = require("validator"),
  client = new postmark.ServerClient("d4981f13-01b9-4a75-9e89-acb722d13f88"),
  getMessage = require("../../mail/message");

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
    if (req.body.pair) signalFields.CurrencyId = req.body.pair;
    if (req.body.signaloption)
      signalFields.signaloption = req.body.signaloption;
    if (req.body.takeprofit)
      signalFields.takeprofit = JSON.stringify(req.body.takeprofit);
    if (req.body.stoploss)
      signalFields.stoploss = JSON.stringify(req.body.stoploss);
    if (req.body.entry) signalFields.entry = parseFloat(req.body.entry);
    if (req.body.comment) signalFields.comment = req.body.comment;
    if (req.body.pip) signalFields.pip = parseFloat(req.body.pip);

    Signal.findOne({
      where: {
        CurrencyId: signalFields.CurrencyId,
        UserId: signalFields.UserId,
        status: null,
      },
    })
      .then((signal) => {
        if (signal) {
          errors.status =
            "You are yet to release the STATUS of the last Signal you created for this Currency Pair";
          return res.status(400).json(errors);
        } else {
          Signal.create(signalFields)
            .then((signal) => {
              Preference.findAll({
                where: {
                  [Op.and]: [
                    {
                      [Op.or]: [
                        {
                          providers: null,
                        },
                        {
                          providers: {
                            [Op.substring]: ` ${signalFields.UserId},`,
                          },
                        },
                        {
                          providers: {
                            [Op.substring]: ` ${signalFields.UserId}]`,
                          },
                        },
                      ],
                    },
                    {
                      [Op.or]: [
                        {
                          currencies: null,
                        },
                        {
                          currencies: {
                            [Op.substring]: ` ${signalFields.CurrencyId},`,
                          },
                        },
                        {
                          currencies: {
                            [Op.substring]: ` ${signalFields.CurrencyId}]`,
                          },
                        },
                      ],
                    },
                    {
                      notify: "y",
                    },
                    {
                      verify: "y",
                    },
                  ],
                },
                attributes: ["UserId"],
                raw: true,
              })
                .then((user) => {
                  let userArr = [];
                  for (let i = 0; i < user.length; i++) {
                    userArr.push(user[i].UserId);
                  }
                  UserView.findAll({
                    where: {
                      UserId: userArr,
                    },
                    attributes: ["email"],
                  })
                    .then((users) => {
                      let emailArr = [];
                      for (let i = 0; i < users.length; i++) {
                        emailArr.push(users[i].email);
                      }
                      SignalView.findOne({
                        where: {
                          signalid: signal.id,
                        },
                        attributes: [
                          "signalid",
                          "takeprofit",
                          "stoploss",
                          "entry",
                          "comment",
                          "pip",
                          "firstcurrency",
                          "secondcurrency",
                          "provider",
                        ],
                      })
                        .then((signal) => {
                          return res.json(true);
                          /*    const content = getMessage({
                            sender: "addsignal",
                            details: signal,
                          });

                          client
                            .sendEmail({
                              From: "info@micearnbusiness.org",
                              To: "info@micearnbusiness.org",
                              Bcc: emailArr.toString(),
                              Subject: "New Signal Update",
                              HtmlBody: content,
                              MessageStream: "outbound",
                            })
                            .then(() => {
                              return res.json(true);
                            });*/
                        })
                        .catch((err) => res.status(404).json(`E ${err}`));
                    })
                    .catch((err) => res.status(404).json(`F ${err}`));
                })
                .catch((err) => res.status(404).json(`G ${err}`));
            })
            .catch((err) => res.status(404).json(`F ${err}`));
        }
      })
      .catch((err) => res.status(404).json(`G ${err}`));
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
    currencyFields.firstcurrency = JSON.stringify(req.body.firstcurrencypair);
    currencyFields.secondcurrency = JSON.stringify(req.body.secondcurrencypair);
    currencyFields.UserId = req.user.id;

    Currency.findOne({
      where: {
        [Op.and]: [
          { firstcurrency: { [Op.substring]: currencyFields.firstcurrency } },
          {
            secondcurrency: {
              [Op.substring]: currencyFields.secondcurrency,
            },
          },
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
              return res.json(true);
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
    const signalID = req.params.id.split(":")[1],
      userID = req.user.id,
      signalFields = {};
    if (req.body.status) signalFields.status = req.body.status;
    Signal.findOne({
      where: { id: signalID },
    })
      .then((signal) => {
        if (signal.UserId === userID) {
          Signal.update(signalFields, { where: { id: signalID } })
            .then(() => {
              Preference.findAll({
                where: {
                  [Op.and]: [
                    {
                      [Op.or]: [
                        {
                          providers: null,
                        },
                        {
                          providers: { [Op.substring]: ` ${userID},` },
                        },
                        {
                          providers: { [Op.substring]: ` ${userID}]` },
                        },
                      ],
                    },
                    {
                      [Op.or]: [
                        {
                          currencies: null,
                        },
                        {
                          currencies: {
                            [Op.substring]: ` ${signal.CurrencyId},`,
                          },
                        },
                        {
                          currencies: {
                            [Op.substring]: ` ${signal.CurrencyId}]`,
                          },
                        },
                      ],
                    },
                    {
                      notify: "y",
                    },
                    {
                      verify: "y",
                    },
                  ],
                },
                attributes: ["UserId"],
                raw: true,
              })
                .then((user) => {
                  let userArr = [];
                  for (let i = 0; i < user.length; i++) {
                    userArr.push(user[i].UserId);
                  }
                  UserView.findAll({
                    where: {
                      UserId: userArr,
                    },
                    attributes: ["email"],
                  })
                    .then((users) => {
                      let emailArr = [];
                      for (let i = 0; i < users.length; i++) {
                        emailArr.push(users[i].email);
                      }

                      SignalView.findOne({
                        where: {
                          signalid: signal.id,
                        },
                        attributes: [
                          "signalid",
                          "pip",
                          "firstcurrency",
                          "secondcurrency",
                          "provider",
                          "status",
                        ],
                      })
                        .then((signal) => {
                          const content = getMessage({
                            sender: "editsignal",
                            details: signal,
                          });

                          client
                            .sendEmail({
                              From: "info@micearnbusiness.org",
                              To: "info@micearnbusiness.org",
                              Bcc: emailArr.toString(),
                              Subject: "Signal Status Change Update",
                              HtmlBody: content,
                              MessageStream: "outbound",
                            })
                            .then(() => {
                              return res.json(true);
                            });
                        })
                        .catch((err) => res.status(404).json(err));
                    })
                    .catch((err) => res.status(404).json(err));
                })
                .catch((err) => res.status(404).json(err));
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
          if (validator.isAlphanumeric(searchArray[i])) {
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
          }
          newSearchArray.push(newSearchObj);
        }
        where = { ...where, ...{ [Op.and]: newSearchArray } };
      } else {
        let searchTerms = searchArray[0];
        if (validator.isAlphanumeric(searchTerms)) {
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
        "entry",
        "comment",
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
