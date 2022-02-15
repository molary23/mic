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
  SignalView = require("../../db/models/SignalView"),
  //Bring in the Validation
  validateAddUserInput = require("../../validation/addUser"),
  validateLoginInput = require("../../validation/login"),
  validateResetInput = require("../../validation/reset"),
  validatePassInput = require("../../validation/password");

/*
@route POST api/user/register
@desc Add new user
@access public
*/

router.post("/register", (req, res) => {
  const { errors, isValid } = validateAddUserInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const userField = {};

  if (req.body.email) userField.email = req.body.email;
  if (req.body.username) userField.username = req.body.username;
  if (req.body.password) userField.password = req.body.password;

  return Promise.all([
    User.findOne({ where: { email: userField.email } })
      .then((user) => {
        if (user) {
          errors.email = "Email Address has been taken!";
          res.status(400).json(errors);
        } else {
          User.findOne({ where: { username: userField.username } }).then(
            (username) => {
              if (username) {
                errors.username = "Username has been taken!";
                res.status(400).json(errors);
              } else {
                bcrypt.genSalt(10, (_err, salt) => {
                  bcrypt.hash(userField.password, salt, (err, hash) => {
                    if (err) throw err;
                    userField.password = hash;
                    User.create(userField)
                      .then((user) => {
                        const UserId = user.id,
                          avatar = gravatar.url(userField.email, {
                            s: "200",
                            r: "pg",
                            d: "mm",
                          }),
                          date = new Date();
                        let startdate = date.toISOString(),
                          enddate = startdate;
                        Profile.create({
                          UserId,
                          avatar,
                        })
                          .then(() => {
                            Premium.create({ UserId, startdate, enddate })
                              .then(() => {
                                if (req.body.referral) {
                                  User.findOne({
                                    where: { username: req.body.referral },
                                    attributes: ["id"],
                                  })
                                    .then((ref) => {
                                      if (ref) {
                                        Referral.create({
                                          referral: ref.id,
                                          UserId: user.id,
                                        }).catch((err) => res.json(err));
                                      }
                                    })
                                    .catch((err) => res.json(err));
                                }
                                return res.json(user);
                              })
                              .catch((err) => res.json(err));
                          })
                          .catch((err) => res.json(err));
                      })
                      .catch((err) => res.json(err));
                  });
                });
              }
            }
          );
        }
      })
      .catch((err) => res.status(400).json(err)),
  ]);
});

/*
@route POST api/user/:referral
@desc  Get Referral Username
@access public
*/

router.post("/referral/:username", (req, res) => {
  const message = {};
  User.findOne({
    where: { username: req.params.referral },
    attributes: ["username"],
  })
    .then((user) => {
      if (!user) {
        message.error = "There is no User with the Referral ID";
        res.json(message);
      } else {
        message.success = user.username;
        res.json(message);
      }
    })
    .catch((err) => res.status(404).json(err));
});

/*
@route POST api/user/email/
@desc Check if Email has been taken
@access public
*/

router.get("/email", (req, res) => {
  let check,
    message = {};
  if (req.body.email) {
    check = req.body.email;
  }

  User.findOne({ where: { email: check } })
    .then((user) => {
      if (user) {
        message.error = "Email Address has been taken!";
        res.json(message);
      } else {
        message.success = "Email Address is Available!";
        res.json(message);
      }
    })
    .catch((err) => res.status(404).json(err));
});

/*
@route POST api/user/username/
@desc Check if Username has been taken
@access public
*/

router.get("/username", (req, res) => {
  let check,
    message = {};
  if (req.body.username) {
    check = req.body.username;
  }

  User.findOne({ where: { username: check } })
    .then((user) => {
      if (user) {
        message.error = "Username has been taken!";
        res.json(message);
      } else {
        message.success = "Username is Available!";
        res.json(message);
      }
    })
    .catch((err) => res.status(404).json(err));
});

/*
@route POST api/users/login/
@desc User Login
@access public
*/

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const username = req.body.username,
    password = req.body.password;

  User.findOne({
    where: {
      [Op.or]: [{ email: username }, { username: username }],
    },
  })
    .then((user) => {
      if (!user) {
        errors.user = "User not Found!";
        return res.status(404).json(errors);
      }
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          const payload = {
            id: user.id,
            email: user.email,
            level: user.level,
            active: user.active,
          };
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 3600 },
            (_err, token) => {
              res.json({ message: "Success", token: `Bearer ${token}` });
            }
          );
        } else {
          errors.password = "Incorrect Password";
          return res.status(400).json(errors);
        }
      });
    })
    .catch((err) => res.json(err));
});

/*
@route POST api/user/forgot/
@desc User Forgot Password
@access public
*/

router.post("/forgot", (req, res) => {
  const message = {},
    username = req.body.username;

  if (username === "") {
    errors.username =
      "Please enter your Username/Email Address to Reset your Password";
    return res.status(400).json(errors);
  }

  User.findOne({
    where: {
      [Op.or]: [{ email: username }, { username }],
    },
  })
    .then((user) => {
      if (!user) {
        message.error = "User not Found!";
        return res.status(404).json(message);
      }
      const passField = {};
      passField.reset = Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();
      passField.UserId = user.id;

      Pass.findOrCreate({
        where: {
          UserId: user.id,
        },
        defaults: {
          passField,
        },
      })
        .then(([found, created]) => {
          if (created) {
            // Send  Mail to User
            message.add = "A Password Reset Code has been sent to your Mail";
            res.json(message);
          } else {
            Pass.update(
              {
                reset: passField.reset,
              },
              {
                where: {
                  UserId: user.id,
                },
              }
            ).then(() => {
              message.update =
                "A Password Reset Code has been sent to your Mail";
              res.json(message);
            });
          }
        })
        .catch((err) => res.json(err));
    })
    .catch((err) => res.json(err));
});

/*
@route POST api/user/reset/
@desc User Reset Password
@access public
*/

router.post("/reset", (req, res) => {
  const { errors, isValid } = validateResetInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const username = req.body.username,
    code = req.body.code;

  User.findOne({
    where: {
      [Op.or]: [{ username }, { email: username }],
    },
  }).then((user) => {
    if (!user) {
      errors.error = "User doesn't exist!";
      return res.status(400).json(errors);
    }
    const now = Date.now() - 3600 * 1000;
    Pass.findOne({
      where: {
        UserId: user.id,
      },
      attributes: ["reset", "timeUpdated"],
    })
      .then((pass) => {
        if (!pass) {
          errors.error = "You are yet to request for a Password Reset Code";
          return res.status(400).json(errors);
        } else if (code !== pass.reset) {
          errors.error = "You have entered the wrong Password Reset Code";
          return res.status(400).json(errors);
        } else if (pass.timeUpdated.getTime() < now) {
          errors.error =
            "Your Password Reset Code has expired. Kindly request for a new one";
          return res.status(400).json(errors);
        } else {
          // GET back here molary
          Pass.update(
            {
              confirm: 1,
            },
            {
              where: {
                UserId: user.id,
              },
            }
          )
            .then(() => {
              res.json({
                message: "Password Reset Code confirmed!",
                id: user.id,
              });
            })
            .catch((err) => res.json(err));
        }
      })
      .catch((err) => res.json(err));
  });
});

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
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const message = {},
      profileFields = {},
      userId = req.user.id;

    let userEmail;

    if (req.body.firstname) profileFields.firstname = req.body.firstname;
    if (req.body.lastname) profileFields.lastname = req.body.lastname;

    User.findByPk(userId, { attributes: ["email"] }).then((user) => {
      userEmail = user.email;
    });

    profileFields.avatar = gravatar.url(userEmail, {
      s: "200",
      r: "pg",
      d: "mm",
    });

    Profile.findOrCreate({
      where: { UserId: userId },
      defaults: {
        firstname: profileFields.firstname,
        lastname: profileFields.lastname,
        avatar: profileFields.avatar,
      },
    })
      .then(([profile, created]) => {
        if (created) {
          message.add = "Profile added!";
          res.json(message);
        } else {
          Profile.update(
            {
              firstname: profileFields.firstname,
              lastname: profileFields.lastname,
            },
            {
              where: {
                UserId: userId,
              },
            }
          )
            .then(() => {
              message.update = "Profile updated!";
              res.json(message);
            })
            .catch((err) => res.json(err));
        }
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
@route GET api/user/details
@desc User view Details
@access private
*/

router.get(
  "/details",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userId = req.user.id;

    User.findByPk(userId, { include: [Profile, Premium] })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route GET api/user/payments
@desc User View Payments
@access private
*/

router.get(
  "/payments",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
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
@route GET api/user/subscriptions
@desc User View subscriptions
@access private
*/

router.get(
  "/subscriptions",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const UserId = req.user.id;

    Subscription.findAll(
      {
        where: {
          UserId,
        },
      },
      {
        include: Payment,
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
    const UserId = req.user.id;

    Bonus.findAll(
      { where: { UserId } },
      {
        include: Payment,
      }
    )
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
