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
  Settings = require("../../db/models/Settings"),
  // Bring in View
  SignalView = require("../../db/models/SignalView"),
  //Bring in the Validation
  validateAddUserInput = require("../../validation/addUser"),
  validateLoginInput = require("../../validation/login"),
  validateResetInput = require("../../validation/reset"),
  validatePassInput = require("../../validation/password");

/*
@route POST api/public/test
@desc Add new user
@access public
*/

router.get("/finder", (_req, res) => {
  User.findAll().then((users) => {
    res.json(users);
  });
});

router.post("/tester", (req, res) => {
  const { referral, username, email, password } = req.body.newUser;
  res.json(username);
});

/*
@route POST api/public/register
@desc Add new user
@access public
*/
router.post("/register", (req, res) => {
  const { errors, isValid } = validateAddUserInput(req.body.newUser);

  if (!isValid) {
    return res.status(404).json(errors);
  }

  const { referral, username, email, password } = req.body.newUser;
  const userField = {};

  if (email) userField.email = email;
  if (username) userField.username = username;
  if (password) userField.password = password;

  return Promise.all([
    User.findOne({ where: { email: userField.email } })
      .then((user) => {
        if (user) {
          errors.email = "Email Addresss has been taken!";
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
                                Settings.create({
                                  UserId,
                                  type: "l",
                                  option: "d",
                                })
                                  .then(() => {
                                    if (referral) {
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
@route POST api/public/:referral
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
@route POST api/public/email/
@desc Check if Email has been taken
@access public
*/

router.post("/email", (req, res) => {
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
@route POST api/public/username/
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
@route POST api/public/login/
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
    include: [{ model: Settings, attributes: ["type", "option"] }],
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
            mode: user.Settings[0],
            option: user.Settings[0],
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
@route POST api/public/forgot/
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
@route POST api/public/reset/
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

module.exports = router;
