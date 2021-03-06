const express = require("express"),
  router = express.Router(),
  bcrypt = require("bcryptjs"),
  gravatar = require("gravatar"),
  postmark = require("postmark"),
  { Op } = require("sequelize"),
  // Use Json Web Token
  jwt = require("jsonwebtoken"),
  keys = require("../../config/keys"),
  User = require("../../db/models/User"),
  Verify = require("../../db/models/Verify"),
  Referral = require("../../db/models/Referral"),
  Profile = require("../../db/models/Profile"),
  Premium = require("../../db/models/Premium"),
  Settings = require("../../db/models/Settings"),
  Preference = require("../../db/models/Preference"),
  // Bring in View
  //Bring in the Validation
  validateAddUserInput = require("../../validation/addUser"),
  validateLoginInput = require("../../validation/login"),
  validateConfirmInput = require("../../validation/confirm"),
  validateResetInput = require("../../validation/reset"),
  encrypt = require("../../util/encrypt"),
  client = new postmark.ServerClient(keys.postKey),
  getMessage = require("../../mail/message");

/*
@route POST api/public/register
@desc Add new user
@access public
*/
router.post("/register", (req, res) => {
  const { errors, isValid } = validateAddUserInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { referral, username, email, phone, password } = req.body;
  const userField = {},
    profileFields = {};

  if (email) userField.email = email;
  if (username) userField.username = username;
  if (phone) profileFields.phone = phone;
  if (password) userField.password = password;

  const verifyFields = {};
  verifyFields.verify = Math.random()
    .toString(36)
    .substring(2, 8)
    .toLowerCase();
  verifyFields.confirm = "n";
  if (referral) {
    return Promise.all([
      User.findOne({
        where: { username: referral.toLowerCase() },
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
                    errors.username = "Username has been taken!";
                    return res.status(400).json(errors);
                  }
                } else {
                  bcrypt.genSalt(10, (_err, salt) => {
                    bcrypt.hash(userField.password, salt, (err, hash) => {
                      if (err) throw err;
                      userField.password = hash;
                      userField.status = "i";
                      User.create(userField)
                        .then((user) => {
                          let UserId = user.id;
                          profileFields.UserId = UserId;
                          profileFields.avatar = gravatar.url(userField.email, {
                            s: "200",
                            r: "pg",
                            d: "mm",
                          });
                          Profile.create(profileFields)
                            .then(() => {
                              Preference.create({
                                UserId,
                                verify: "n",
                              })
                                .then(() => {
                                  Referral.create({
                                    referral: userField.referralId,
                                    UserId,
                                  })
                                    .then(() => {
                                      verifyFields.UserId = UserId;
                                      Verify.create(verifyFields)
                                        .then(() => {
                                          let urldata = {
                                            code: verifyFields.verify,
                                            username: userField.username,
                                          };
                                          urldata = JSON.stringify(urldata);
                                          urldata = encrypt(urldata);
                                          const content = getMessage({
                                            sender: "verify",
                                            details: {
                                              code: verifyFields.verify,
                                              urldata,
                                              username: userField.username,
                                            },
                                          });

                                          client
                                            .sendEmail({
                                              From: "info@micearnbusiness.org",
                                              To: userField.email,
                                              Subject:
                                                "Verify Your Email Address",
                                              HtmlBody: content,
                                              MessageStream: "outbound",
                                            })
                                            .then(() => {
                                              return res.json(1);
                                            });
                                        })
                                        .catch((err) =>
                                          res.status(404).json(`E  ${err}`)
                                        );
                                    })
                                    .catch((err) =>
                                      res.status(404).json(`F  ${err}`)
                                    );
                                })
                                .catch((err) =>
                                  res.status(404).json(`G  ${err}`)
                                );
                            })
                            .catch((err) => res.status(404).json(`H  ${err}`));
                        })
                        .catch((err) => res.status(404).json(`I  ${err}`));
                    });
                  });
                }
              })
              .catch((err) => res.status(404).json(`J  ${err}`));
          }
        })
        .catch((err) => res.status(404).json(`K  ${err}`)),
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
              errors.username = "Username has been taken!";
              return res.status(400).json(errors);
            }
          } else {
            bcrypt.genSalt(10, (_err, salt) => {
              bcrypt.hash(userField.password, salt, (err, hash) => {
                if (err) throw err;
                userField.password = hash;
                userField.status = "i";
                User.create(userField)
                  .then((user) => {
                    let UserId = user.id;
                    profileFields.UserId = UserId;
                    profileFields.avatar = gravatar.url(userField.email, {
                      s: "200",
                      r: "pg",
                      d: "mm",
                    });
                    Profile.create(profileFields)
                      .then(() => {
                        Preference.create({
                          UserId,
                          verify: "n",
                        })
                          .then(() => {
                            verifyFields.UserId = UserId;
                            Verify.create(verifyFields)
                              .then(() => {
                                let urldata = {
                                  code: verifyFields.verify,
                                  username: userField.username,
                                };
                                urldata = JSON.stringify(urldata);
                                urldata = encrypt(urldata);
                                const content = getMessage({
                                  sender: "verify",
                                  details: {
                                    code: verifyFields.verify,
                                    urldata,
                                    username: userField.username,
                                  },
                                });

                                client
                                  .sendEmail({
                                    From: "info@micearnbusiness.org",
                                    To: userField.email,
                                    Subject: "Verify Your Email Address",
                                    HtmlBody: content,
                                    MessageStream: "outbound",
                                  })
                                  .then(() => {
                                    return res.json(1);
                                  });
                              })
                              .catch((err) => res.status(404).json(err));
                          })
                          .catch((err) => res.status(404).json(err));
                      })
                      .catch((err) => res.status(404).json(err));
                  })
                  .catch((err) => res.status(404).json(err));
              });
            });
          }
        })
        .catch((err) => res.status(404).json(err)),
    ]);
  }
});

/*
@route POST api/public/verify
@desc  User verify email address
@access public
*/
router.post("/verify", (req, res) => {
  const { errors, isValid } = validateConfirmInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { username, code } = req.body;

  User.findOne({
    where: {
      [Op.or]: [{ username }, { email: username }],
    },
  })
    .then((user) => {
      if (!user) {
        errors.username = "User doesn't exist!";
        return res.status(400).json(errors);
      }
      let UserId = user.id;
      const now = Date.now() - 3600000;
      Verify.findOne({
        where: {
          UserId,
        },
        attributes: ["verify", "updatedAt", "confirm"],
      })
        .then((pass) => {
          if (!pass) {
            errors.username = "You have entered a wrong Username/Email Address";
            return res.status(400).json(errors);
          } else if (pass.confirm !== "n") {
            errors.code = "You are yet to request for a Verification Code";
            return res.status(400).json(errors);
          } else if (code !== pass.verify.toLowerCase()) {
            errors.code = "You have entered the wrong Verification Code";
            return res.status(400).json(errors);
          } else if (new Date(pass.updatedAt).getTime() < now) {
            errors.code =
              "Your Verification Code has expired. Kindly request for a new one";
            return res.status(400).json(errors);
          } else {
            return Promise.all([
              User.update(
                { status: "a" },
                {
                  where: {
                    id: UserId,
                  },
                }
              )
                .then(() => {
                  Premium.create({ UserId })
                    .then(() => {
                      Settings.create({
                        UserId,
                      })
                        .then(() => {
                          Preference.update(
                            { verify: "y" },
                            {
                              where: {
                                UserId,
                              },
                            }
                          )
                            .then(() => {
                              Verify.update(
                                {
                                  confirm: "y",
                                  verify: null,
                                },
                                {
                                  where: {
                                    UserId,
                                  },
                                }
                              )
                                .then(() => {
                                  return res.json(1);
                                })
                                .catch((err) => res.status(404).json(err));
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
        })
        .catch((err) => res.status(404).json(err));
    })
    .catch((err) => res.status(404).json(err));
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
    include: [
      { model: Settings, attributes: ["mode"] },
      { model: Profile, attributes: ["avatar"] },
    ],
  })
    .then((user) => {
      if (!user) {
        errors.username = "User not Found!";
        return res.status(400).json(errors);
      }
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          const payload = {
            id: user.id,
            username: user.username,
            level: user.level,
            status: user.status,
            mode: user.Settings[0],
            avatar: user.Profile.avatar,
          };
          if (user.level >= 2) {
            if (user.status === "a") {
              jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 43200 },
                (_err, token) => {
                  return res.json({
                    message: "Success",
                    token: `Bearer ${token}`,
                  });
                }
              );
            } else {
              errors.username = "Your Administrative Rights has been revoked!";
              return res.status(400).json(errors);
            }
          } else {
            Preference.findOne({
              where: {
                UserId: user.id,
              },
              attributes: ["verify"],
            })
              .then((verify) => {
                if (verify.verify === "n") {
                  let code = Math.random()
                    .toString(36)
                    .substring(2, 8)
                    .toLowerCase();
                  Verify.update(
                    {
                      verify: code,
                      confirm: "n",
                    },
                    {
                      where: { UserId: user.id },
                    }
                  )
                    .then(() => {
                      let urldata = {
                        code,
                        username: user.username,
                      };
                      urldata = JSON.stringify(urldata);
                      urldata = encrypt(urldata);
                      const content = getMessage({
                        sender: "verify",
                        details: {
                          code,
                          urldata,
                          username: user.username,
                        },
                      });

                      client
                        .sendEmail({
                          From: "info@micearnbusiness.org",
                          To: user.email,
                          Subject: "Verify Your Email Address",
                          HtmlBody: content,
                          MessageStream: "outbound",
                        })
                        .then(() => {
                          errors.verify = 0;
                          return res.status(403).json(errors);
                        });
                    })
                    .catch((err) => res.status(404).json(err));
                } else {
                  jwt.sign(
                    payload,
                    keys.secretOrKey,
                    { expiresIn: 43200 },
                    (_err, token) => {
                      return res.json({
                        message: "Success",
                        token: `Bearer ${token}`,
                      });
                    }
                  );
                }
              })
              .catch((err) => res.status(404).json(err));
          }
        } else {
          errors.password = "Incorrect Password";
          return res.status(400).json(errors);
        }
      });
    })
    .catch((err) => res.status(404).json(err));
});

/*
@route POST api/public/forgot/
@desc User Forgot Password
@access public
*/

router.post("/forgot", (req, res) => {
  const message = {},
    { username } = req.body;

  if (username === "") {
    errors.username =
      "Please enter your Username/Email Address to Reset your Password";
    return res.status(400).json(errors);
  }

  const verifyField = {};
  verifyField.verify = Math.random().toString(36).substring(2, 8).toLowerCase();
  verifyField.confirm = "n";

  User.findOne({
    where: {
      [Op.or]: [{ email: username }, { username }],
    },
  })
    .then((user) => {
      if (!user) {
        message.error = "User not Found!";
        return res.status(400).json(message);
      }

      verifyField.UserId = user.id;
      Verify.update(verifyField, {
        where: {
          UserId: user.id,
        },
      })
        .then(() => {
          let urldata = {
            code: verifyField.verify,
            username: user.username,
          };
          urldata = JSON.stringify(urldata);
          urldata = encrypt(urldata);
          const content = getMessage({
            sender: "forgot",
            details: {
              code: verifyField.verify,
              urldata,
              username: user.username,
            },
          });

          client
            .sendEmail({
              From: "secure@micearnbusiness.org",
              To: "info@micearnbusiness.org",
              Subject: "Password Reset Request",
              HtmlBody: content,
              MessageStream: "outbound",
            })
            .then(() => {
              res.json(1);
            })
            .catch((err) => res.status(500).json(err));
        })
        .catch((err) => res.status(404).json(err));
    })
    .catch((err) => res.status(404).json(err));
});

/*
@route POST api/public/confirm/
@desc User confirm Password
@access public
*/

router.post("/confirm", (req, res) => {
  const { errors, isValid } = validateConfirmInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { username, code, auth } = req.body;

  User.findOne({
    where: {
      [Op.or]: [{ username }, { email: username }],
    },
  }).then((user) => {
    if (!user) {
      errors.username = "User doesn't exist!";
      return res.status(400).json(errors);
    }
    let UserId = user.id;
    const now = Date.now() - 3600000;
    Verify.findOne({
      where: {
        UserId,
      },
      attributes: ["verify", "updatedAt", "confirm"],
    })
      .then((pass) => {
        if (pass.confirm !== "n") {
          errors.code = "You are yet to request for a Password Reset Code";
          return res.status(400).json(errors);
        } else if (code !== pass.verify) {
          errors.code = "You have entered the wrong Password Reset Code";
          return res.status(400).json(errors);
        } else if (new Date(pass.updatedAt).getTime() < now) {
          errors.code =
            "Your Password Reset Code has expired. Kindly request for a new one";
          return res.status(400).json(errors);
        } else {
          Verify.update(
            {
              confirm: "y",
            },
            {
              where: {
                UserId: user.id,
              },
            }
          )
            .then(() => {
              if (auth === "no") {
                return res.json({
                  message: false,
                  value: null,
                });
              } else {
                return res.json({
                  message: true,
                  value: user.id,
                });
              }
            })
            .catch((err) => res.status(404).json(err));
        }
      })
      .catch((err) => res.status(404).json(err));
  });
});

/*
@route POST api/public/reset/
@desc User reset Password
@access public
*/

router.post("/reset", (req, res) => {
  const { errors, isValid } = validateResetInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { UserId, password } = req.body;
  User.findByPk(UserId)
    .then((user) => {
      if (!user) {
        errors.username = "User doesn't exist!";
        return res.status(400).json(errors);
      }

      bcrypt.genSalt(10, (_err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          let newPassword = hash;
          User.update(
            {
              password: newPassword,
            },
            {
              where: {
                id: UserId,
              },
            }
          ).then(() => {
            res.json({ success: true });
          });
        });
      });
    })
    .catch((err) => res.status(404).json(err));
});

module.exports = router;
