const express = require("express"),
  router = express.Router(),
  bcrypt = require("bcryptjs"),
  passport = require("passport"),
  { Op } = require("sequelize"),
  // Use Json Web Token
  User = require("../../db/models/User"),
  Profile = require("../../db/models/Profile"),
  Settings = require("../../db/models/Settings"),
  Currency = require("../../db/models/Currency"),
  AccountView = require("../../db/models/AccountView"),
  Account = require("../../db/models/Account"),
  Forum = require("../../db/models/Forum"),
  ForumReply = require("../../db/models/ForumReply"),
  Preference = require("../../db/models/Preference"),
  Withdrawal = require("../../db/models/Withdrawal"),
  // Bring in View
  UserView = require("../../db/models/UserView"),
  ProviderView = require("../../db/models/ProviderView"),
  SuperView = require("../../db/models/SuperView"),
  //Bring in the Validation
  validateEmailInput = require("../../validation/email"),
  validatePassInput = require("../../validation/password"),
  // Message
  postmark = require("postmark"),
  client = new postmark.ServerClient("d4981f13-01b9-4a75-9e89-acb722d13f88"),
  getMessage = require("../../mail/message"),
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
    if (req.body.phone) profileFields.phone = req.body.phone;

    Profile.update(
      {
        firstname: profileFields.firstname,
        lastname: profileFields.lastname,
        phone: profileFields.phone,
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
                    attributes: ["firstname", "lastname", "phone"],
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
                              { userid: JSON.parse(preference.providers) },
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
                                  { id: JSON.parse(preference.currencies) },
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
                                  { id: JSON.parse(preference.currencies) },
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
                              { userid: JSON.parse(preference.providers) },
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
@route POST api/user/Preference/provider
@desc User post Preference 
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

    Preference.findOne({ where: { UserId: id }, attributes: ["providers"] })
      .then((prList) => {
        if (prList.providers !== null) {
          providers = [...providers, ...JSON.parse(prList.providers)];
        }
        providers = [...new Set(providers)];
        providers = JSON.stringify(providers);
        Preference.update({ providers }, { where: { UserId: id } })
          .then(() => {
            res.json(true);
          })
          .catch((err) => res.status(404).json(err));
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route POST api/user/Preference/reset/provider
@desc User reset provider Preference 
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
    Preference.update({ providers }, { where: { UserId: id } })
      .then(() => {
        res.json(true);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route POST api/user/Preference/currency
@desc User post Preference 
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

    Preference.findOne({ where: { UserId: id }, attributes: ["currencies"] })
      .then((curList) => {
        if (curList.currencies !== null) {
          currencies = [...currencies, ...JSON.parse(curList.currencies)];
        }
        currencies = [...new Set(currencies)];
        currencies = JSON.stringify(currencies);
        Preference.update({ currencies }, { where: { UserId: id } })
          .then(() => {
            res.json(true);
          })
          .catch((err) => res.status(404).json(err));
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route POST api/user/Preference/reset/currency
@desc User post Preference 
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

    Preference.update({ currencies }, { where: { UserId: id } })
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

/*
@route POST api/user/add/forum
@desc User add forum
@access private
*/

router.post(
  "/add/forum",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkUser(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    const forumFields = {};

    if (req.body.title) forumFields.title = req.body.title;
    if (req.body.text) forumFields.text = req.body.text;
    forumFields.UserId = req.user.id;

    Forum.create(forumFields)
      .then((forum) => {
        User.findByPk(forumFields.UserId, {
          attributes: ["email", "username"],
        }).then((user) => {
          let email = user.email,
            username = user.username,
            ticketid;
          if (forum.id.toString().length < 5) {
            ticketid = forum.id.toString().padStart(5, "0");
          } else {
            ticketid = forum.id;
          }

          const content = getMessage({
            sender: "forumticket",
            details: {
              username: username,
              forumid: ticketid,
            },
          });

          client
            .sendEmail({
              From: "info@micearnbusiness.org",
              To: email,
              Cc: "support@micearnbusiness.org",
              Subject: `[Ticket ID: ${ticketid}] ${forumFields.title.toUpperCase()}`,
              HtmlBody: content,
              MessageStream: "outbound",
            })
            .then(() => {
              return res.json(true);
            });
        });
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route POST api/user/update/forum
@desc User update forum
@access private
*/

router.post(
  "/update/forum",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkUser(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    let action, forumid, UserId;
    if (req.body.action) action = req.body.action;
    if (req.body.id) forumid = req.body.id;
    UserId = req.user.id;

    Forum.findByPk(forumid, { attributes: ["UserId"] })
      .then((forum) => {
        let creatorId = forum.UserId;
        if (UserId !== creatorId) {
          error.user = "You are not authorised to change this post";
          return res.json(error);
        } else {
          if (action === "close") {
            Forum.update(
              {
                status: "c",
              },
              {
                where: {
                  id: forumid,
                },
              }
            )
              .then(() => {
                return res.json(true);
              })
              .catch((err) => res.status(404).json(err));
          } else if (action === "delete") {
            Forum.destroy({
              where: {
                id: forumid,
              },
            })
              .then(() => {
                return res.json(true);
              })
              .catch((err) => res.status(404).json(err));
          } else if (action === "public") {
            Forum.update(
              {
                right: "p",
              },
              {
                where: {
                  id: forumid,
                },
              }
            )
              .then(() => {
                return res.json(true);
              })
              .catch((err) => res.status(404).json(err));
          }
        }
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route POST api/user/forum/reply
@desc User add reply
@access private
*/

router.post(
  "/forum/reply",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkUser(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    const replyFields = {};

    if (req.body.text) replyFields.text = req.body.text;
    if (req.body.ForumId) replyFields.ForumId = req.body.ForumId;
    replyFields.UserId = req.user.id;

    ForumReply.create(replyFields)
      .then(() => {
        res.json(true);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route POST api/user/delete/reply
@desc User delete reply
@access private
*/

router.delete(
  "/reply/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkUser(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }

    let UserId = req.user.id,
      replyid = req.params.id.split(":")[1];

    ForumReply.findByPk(replyid, { attributes: ["UserId"] })
      .then((reply) => {
        if (reply.UserId !== UserId) {
          error.allow = "You are not authorised to delete this reply";
          return res.status(400).json(error);
        } else {
          ForumReply.destroy({ where: { id: replyid } })
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
@route POST api/users/theme
@desc User get mode
@access private
*/

router.get(
  "/theme",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkUser(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }

    let UserId = req.user.id;

    Settings.findOne({
      where: {
        UserId,
      },
      attributes: ["mode"],
    })
      .then((setting) => {
        return res.json(setting.mode);
      })
      .catch((err) => res.status(404).json(err));
  }
);

module.exports = router;
