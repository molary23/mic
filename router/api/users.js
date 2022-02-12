const express = require("express"),
  router = express.Router(),
  bcrypt = require("bcryptjs"),
  Sequelize = require("sequelize"),
  passport = require("passport"),
  { Op, where } = require("sequelize"),
  // Use Json Web Token
  jwt = require("jsonwebtoken"),
  keys = require("../../config/keys"),
  User = require("../../model/User"),
  Pass = require("../../model/Pass"),
  //Bring in the Validation
  validateAddUserInput = require("../../validation/addUser"),
  validateLoginInput = require("../../validation/login");
validateResetInput = require("../../validation/reset");

/*
@route GET api/user/test
@desc Test our route
@access public
*/

router.get("/test", (req, res) => res.json({ msg: "user page works" }));

/*
@route POST api/user/add
@desc Add new user
@access public
*/

router.post("/add", (req, res) => {
  const { errors, isValid } = validateAddUserInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const userField = {};

  if (req.body.email) userField.email = req.body.email;
  if (req.body.username) userField.username = req.body.username;
  if (req.body.password) userField.password = req.body.password;

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
                      res.json(user);
                    })
                    .catch((err) => res.json(err));
                });
              });
            }
          }
        );
      }
    })
    .catch((err) => res.status(400).json(err));
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
@route POST api/user/login/
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
      passField.reset = Math.random().toString(36).substr(2, 8).toUpperCase();
      passField.UserId = user.id;

      Pass.findOrCreate({
        where: {
          UserId: user.id,
        },
        defaults: {
          passField,
        },
      })
        .then((found, created) => {
          if (found) {
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
              message.success =
                "A Password Reset Code has been sent to your Mail";
              res.json(message);
            });
          } else if (created) {
            // Send  Mail to User
            message.success =
              "A Password Reset Code has been sent to your Mail";
            res.json(message);
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
    const now = Math.floor(Date.now() / 1000) - 36000;
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
        } else if (pass.timeUpdated < now) {
          errors.error =
            "Your Password Reset Code has expired. Kindly request for a new one";
          return res.status(400).json(errors);
        } else {
          // GET back here molary
        }
      })
      .catch((err) => res.json(err));
  });
});

module.exports = router;
