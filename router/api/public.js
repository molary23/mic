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

router.get("/finder", async (req, res) => {
  let limit = 18,
    offset = 0,
    where = {};
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
      [
        Sequelize.literal(
          `CASE WHEN signaloption = 'b' THEN 'Buy' WHEN signaloption = 's' THEN 'Sell' END `
        ),
        "signaloption",
      ],
      [
        Sequelize.literal(
          `CASE WHEN status = 'f' THEN 'Filled' WHEN status = 'c' THEN 'Cancelled' END `
        ),
        "status",
      ],
      [Sequelize.literal(`CONCAT(startrange, ' - ', endrange)`), "range"],
    ],
    where,
    distinct: true,
    col: "CurrencyId",
    raw: true,
  };

  SignalView.findAndCountAll(query)
    .then((signals) => {
      res.json(signals);
    })
    .catch((err) => res.status(404).json(err));
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

  const { referral, username, email, phone, password } = req.body.newUser;
  const userField = {};

  if (email) userField.email = email;
  if (username) userField.username = username;
  if (phone) userField.phone = phone;
  if (password) userField.password = password;

  if (referral) {
    return Promise.all([
      User.findOne({
        where: { username: referral },
        attributes: ["id"],
      })
        .then((ref) => {
          if (!ref) {
            errors.referral = "Referral doesn't exist!";
            return res.status(400).json(errors);
          } else {
            userField.referralId = ref.id;
            User.findOne({
              where: {
                [Op.or]: [
                  { email: userField.email },
                  { username: userField.username },
                ],
              },
              attributes: ["email", "username"],
            })
              .then((user) => {
                if (user) {
                  if (user.email === userField.email) {
                    errors.email = "Email Addresss has been taken!";
                    return res.status(400).json(errors);
                  } else if (user.username === userField.username) {
                    errors.email = "Username has been taken!";
                    return res.status(400).json(errors);
                  }
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
                                      Referral.create({
                                        referral: userField.referralId,
                                        UserId: user.id,
                                      })
                                        .then(() => res.json(1))
                                        .catch((err) => res.json(err));
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
              })
              .catch((err) => res.status(400).json(err));
          }
        })
        .catch((err) => res.json(err)),
    ]);
  } else {
    return Promise.all([
      User.findOne({
        where: {
          [Op.or]: [
            { email: userField.email },
            { username: userField.username },
          ],
        },
        attributes: ["email", "username"],
      })
        .then((user) => {
          if (user) {
            if (user.email === userField.email) {
              errors.email = "Email Addresss has been taken!";
              return res.status(400).json(errors);
            } else if (user.username === userField.username) {
              errors.email = "Username has been taken!";
              return res.status(400).json(errors);
            }
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
                                return res.json(1);
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
        })
        .catch((err) => res.status(400).json(err)),
    ]);
  }
});

/*
@route POST api/public/referral
@desc  Get Referral Username
@access public
*/

router.post("/referral", (req, res) => {
  let check,
    message = {};
  if (req.body.referral) {
    check = req.body.referral;
  }

  User.findOne({
    where: { username: check },
    attributes: ["username"],
  })
    .then((user) => {
      if (!user) {
        message.text = "There is no User with the Referral ID";
        res.json(message);
      } else {
        message.text = "Referral ID confirmed";
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

  User.findOne({ where: { email: check }, attributes: ["email"] })
    .then((user) => {
      if (user) {
        message.text = "Email Address has been taken!";
        res.json(message);
      } else {
        message.text = "Email Address is Available!";
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

router.post("/username", (req, res) => {
  let check,
    message = {};
  if (req.body.username) {
    check = req.body.username;
  }

  User.findOne({ where: { username: check }, attributes: ["username"] })
    .then((user) => {
      if (user) {
        message.text = "Username has been taken!";
        res.json(message);
      } else {
        message.text = "Username is Available!";
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
        errors.username = "User not Found!";
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
