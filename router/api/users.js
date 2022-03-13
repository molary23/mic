const Account = require("../../db/models/Account");
const Preference = require("../../db/models/Preference");
const Withdrawal = require("../../db/models/Withdrawal");

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
  Profile = require("../../db/models/Profile"),
  Premium = require("../../db/models/Premium"),
  Settings = require("../../db/models/Settings"),
  Currency = require("../../db/models/Currency"),
  AccountView = require("../../db/models/AccountView"),
  // Bring in View
  UserView = require("../../db/models/UserView"),
  ProviderView = require("../../db/models/ProviderView"),
  SuperView = require("../../db/models/SuperView"),
  //Bring in the Validation
  validateEmailInput = require("../../validation/email"),
  validatePassInput = require("../../validation/password"),
  //Check level
  checkUser = require("../../validation/checkUser");

/*
@route /api/user/reset/password
@desc User reset Password
@access PRIVATE
*/

router.post("/reset/password", (req, res) => {
  const { errors, isValid } = validatePassInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const userId = req.body.id,
    password = req.body.password;

  User.update({ password }, { where: { id: userId } })
    .then(() => {
      res.json({ message: "Password changed Successfully!" });
    })
    .catch((err) => res.status(404).json(err));
});

/*
@route /api/user/profile/
@desc User update profile
@access PRIVATE
*/

router.post(
  "/settings/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profileFields = {},
      UserId = req.user.id;

    if (req.body.firstname) profileFields.firstname = req.body.firstname;
    if (req.body.lastname) profileFields.lastname = req.body.lastname;

    Profile.update(
      {
        firstname: profileFields.firstname,
        lastname: profileFields.lastname,
      },
      {
        where: { UserId },
      }
    )
      .then(() => {
        res.json(true);
      })
      .catch((err) => res.json(err));
  }
);

/*
@route POST api/user/password
@desc User change Password
@access private
*/

router.post(
  "/password",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePassInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const userId = req.user.id,
      password = req.body.password;

    User.update({ password }, { where: { id: userId } })
      .then((user) => {
        res.json({ message: "Password changed Successfully!" });
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route POST api/user/email
@desc User change email
@access private
*/

router.post(
  "/email",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEmailInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const id = req.user.id,
      email = req.body.email;

    User.findOne({ where: { email } })
      .then((user) => {
        if (user) {
          errors.email = "Email addresss has been used!";
          res.json(errors);
        } else {
          User.update({ email }, { where: { id } })
            .then(() => {
              res.json({ message: "Email Address changed successfully" });
            })
            .catch((err) => res.status(404).json(err));
        }
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route GET api/user/details
@desc User view Details
@access private
*/

router.get(
  "/details",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userid = req.user.id;
    const level = req.user.level;
    let view;
    if (level === 1) {
      view = UserView;
    } else if (level === 2) {
      view = ProviderView;
    } else if (level === 3) {
      view = SuperView;
    }

    view
      .findOne({ where: { userid } })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route POST api/user/checkpass
@desc User view Details
@access private
*/

router.post(
  "/checkpass",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePassInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const id = req.user.id,
      password = req.body.password;

    User.findByPk(id, { attributes: ["password"] })
      .then((user) => {
        bcrypt.compare(password, user.password).then((isMatch) => {
          if (isMatch) {
            return res.json({ message: "Password is Correct" });
          } else {
            errors.password = "Incorrect Password";
            return res.status(400).json(errors);
          }
        });
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route GET api/user/settings
@desc User view settings
@access private
*/

router.get(
  "/settings",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkUser(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    const UserId = req.user.id;
    let info = {};
    return Promise.all([
      Settings.findOne({
        where: { UserId },
        attributes: ["mode"],
      })
        .then((settings) => {
          info.settings = settings;
          Preference.findOne({
            where: { UserId },
            attributes: ["currencies", "providers", "notify"],
          })
            .then((preference) => {
              info.preference = preference;
              AccountView.findAll({
                where: { UserId },
                attributes: ["accountnumber", "wallet"],
              })
                .then((accounts) => {
                  info.accounts = accounts;
                  Profile.findOne({
                    where: { UserId },
                    attributes: ["firstname", "lastname"],
                  })
                    .then((profile) => {
                      info.profile = profile;
                      if (
                        info.preference.providers !== null &&
                        info.preference.currencies !== null
                      ) {
                        ProviderView.findAll({
                          where: {
                            [Op.and]: [
                              { status: "a" },
                              { userid: preference.providers },
                            ],
                          },
                          attributes: ["username", "userid"],
                        })
                          .then((provider) => {
                            info.providers = provider;
                            Currency.findAll({
                              where: {
                                [Op.and]: [
                                  { status: "a" },
                                  { id: preference.currencies },
                                ],
                              },
                              attributes: [
                                "firstcurrency",
                                "secondcurrency",
                                "id",
                              ],
                            })
                              .then((currency) => {
                                info.currencies = currency;
                                return res.json(info);
                              })
                              .catch((err) => res.status(404).json(err));
                          })
                          .catch((err) => res.status(404).json(err));
                      } else if (
                        info.preference.providers === null &&
                        info.preference.currencies === null
                      ) {
                        ProviderView.findAll({
                          where: {
                            status: "a",
                          },
                          attributes: ["username", "userid"],
                        })
                          .then((provider) => {
                            info.providers = provider;
                            Currency.findAll({
                              where: {
                                status: "a",
                              },
                              attributes: [
                                "firstcurrency",
                                "secondcurrency",
                                "id",
                              ],
                            })
                              .then((currency) => {
                                info.currencies = currency;
                                return res.json(info);
                              })
                              .catch((err) => res.status(404).json(err));
                          })
                          .catch((err) => res.status(404).json(err));
                      } else if (
                        info.preference.providers === null &&
                        info.preference.currencies !== null
                      ) {
                        ProviderView.findAll({
                          where: {
                            status: "a",
                          },
                          attributes: ["username", "userid"],
                        })
                          .then((provider) => {
                            info.providers = provider;
                            Currency.findAll({
                              where: {
                                [Op.and]: [
                                  { status: "a" },
                                  { id: preference.currencies },
                                ],
                              },
                              attributes: [
                                "firstcurrency",
                                "secondcurrency",
                                "id",
                              ],
                            })
                              .then((currency) => {
                                info.currencies = currency;
                                return res.json(info);
                              })
                              .catch((err) => res.status(404).json(err));
                          })
                          .catch((err) => res.status(404).json(err));
                      } else if (
                        info.preference.providers !== null &&
                        info.preference.currencies === null
                      ) {
                        ProviderView.findAll({
                          where: {
                            [Op.and]: [
                              { status: "a" },
                              { userid: preference.providers },
                            ],
                          },
                          attributes: ["username", "userid"],
                        })
                          .then((provider) => {
                            info.providers = provider;
                            Currency.findAll({
                              where: {
                                status: "a",
                              },
                              attributes: [
                                "firstcurrency",
                                "secondcurrency",
                                "id",
                              ],
                            })
                              .then((currency) => {
                                info.currencies = currency;
                                return res.json(info);
                              })
                              .catch((err) => res.status(404).json(err));
                          })
                          .catch((err) => res.status(404).json(err));
                      }
                    })
                    .catch((err) => res.status(404).json(err));
                })
                .catch((err) => res.status(404).json(err));
            })
            .catch((err) => res.status(404).json(err));
        })
        .catch((err) => res.status(404).json(err)),
    ]);
  }
);

/*
@route POST api/user/settings/provider
@desc User post settings 
@access private
*/

router.post(
  "/settings/provider",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkUser(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    const id = req.user.id;
    let providers;
    if (req.body) {
      providers = req.body;
    }

    Settings.findOne({ where: { UserId: id }, attributes: ["providers"] })
      .then((prList) => {
        if (prList.providers !== null) {
          providers = [...providers, ...prList.providers];
        }
        providers = [...new Set(providers)];
        Settings.update({ providers }, { where: { UserId: id } })
          .then(() => {
            res.json(true);
          })
          .catch((err) => res.status(404).json(err));
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route POST api/user/settings/reset/provider
@desc User reset provider settings 
@access private
*/

router.post(
  "/settings/reset/provider",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkUser(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    const id = req.user.id;
    let providers;
    if (req.body) {
      providers = req.body;
    }

    if (providers.length <= 0) {
      providers = null;
    }
    Settings.update({ providers }, { where: { UserId: id } })
      .then(() => {
        res.json(true);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route POST api/user/settings/currency
@desc User post settings 
@access private
*/

router.post(
  "/settings/currency",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkUser(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    const id = req.user.id;
    let currencies;
    if (req.body) {
      currencies = req.body;
    }

    Settings.findOne({ where: { UserId: id }, attributes: ["currencies"] })
      .then((curList) => {
        if (curList.currencies !== null) {
          currencies = [...currencies, ...curList.currencies];
        }
        currencies = [...new Set(currencies)];
        Settings.update({ currencies }, { where: { UserId: id } })
          .then(() => {
            res.json(true);
          })
          .catch((err) => res.status(404).json(err));
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route POST api/user/settings/reset/currency
@desc User post settings 
@access private
*/

router.post(
  "/settings/reset/currency",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkUser(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    const id = req.user.id;
    let currencies;
    if (req.body) {
      currencies = req.body;
    }

    if (currencies.length <= 0) {
      currencies = null;
    }

    Settings.update({ currencies }, { where: { UserId: id } })
      .then(() => {
        res.json(true);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route POST api/user/settings/mode
@desc User post settings 
@access private
*/

router.post(
  "/settings/mode",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const id = req.user.id;
    let mode;
    if (req.body.mode) {
      mode = req.body.mode;
    }

    Settings.update({ mode }, { where: { UserId: id } })
      .then(() => {
        res.json(true);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route POST api/user/settings/notify
@desc User post settings 
@access private
*/

router.post(
  "/settings/notify",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const id = req.user.id;
    let notify;
    if (req.body) {
      notify = req.body.notify;
    }

    Settings.update({ notify }, { where: { UserId: id } })
      .then(() => {
        res.json(true);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route POST api/user/settings/account
@desc User post settings 
@access private
*/

router.post(
  "/settings/account",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const id = req.user.id;
    let account;
    if (req.body) {
      account = req.body;
    }

    Account.findOrCreate({
      where: {
        [Op.and]: [
          {
            WalletId: account.walletid,
          },
          {
            UserId: id,
          },
        ],
      },
      defaults: {
        WalletId: account.walletid,
        accountnumber: account.accountnumber,
        UserId: id,
      },
    })
      .then(([found, created]) => {
        if (created) {
          res.json(true);
        } else {
          Account.update(
            {
              accountnumber: account.accountnumber,
            },
            {
              where: {
                [Op.and]: [{ UserId: id }, { WalletId: account.walletid }],
              },
            }
          ).then(() => {
            res.json(true);
          });
        }
      })
      .catch((err) => res.json(err));
  }
);

/*
@route POST api/user/settings/pass
@desc User post passs 
@access private
*/

router.post(
  "/settings/pass",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const id = req.user.id,
      errors = {};
    let pass;
    if (req.body) {
      pass = req.body;
    }

    User.findByPk(id, { attributes: ["password"] })
      .then((user) => {
        bcrypt.compare(pass.old, user.password).then((isMatch) => {
          if (isMatch) {
            bcrypt.genSalt(10, (_err, salt) => {
              bcrypt.hash(pass.new, salt, (err, hash) => {
                let newPassword = hash;
                User.update(
                  { password: newPassword },
                  {
                    where: {
                      id,
                    },
                  }
                )
                  .then(() => {
                    res.json(true);
                  })
                  .catch((err) => res.json(err));
              });
            });
          } else {
            errors.password = "Incorrect Old Password";
            return res.status(400).json(errors);
          }
        });
      })
      .catch((err) => res.json(err));
  }
);

/*
@route POST api/user/withdrawals
@desc User request withdrawal
@access private
*/

router.post(
  "/withdrawals",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkUser(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    const withFields = {};

    if (req.body.wallet) withFields.walletid = req.body.wallet;
    if (req.body.accountnumber)
      withFields.accountnumber = req.body.accountnumber;
    if (req.body.amount) withFields.amount = req.body.amount;
    withFields.UserId = req.user.id;

    Withdrawal.create(withFields)
      .then(() => {
        res.json(true);
      })
      .catch((err) => res.status(404).json(err));
  }
);

module.exports = router;
