const Premium = require("../../model/Premium");

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
  User = require("../../model/User"),
  Payment = require("../../model/Payment"),
  Subscription = require("../../model/Subscription"),
  Bonus = require("../../model/Bonus"),
  Transaction = require("../../model/Transaction"),
  //Bring in the Validation
  validateAddUserInput = require("../../validation/addUser"),
  //Bring in Super Admin Checker
  checkSuperAdmin = require("../../validation/superCheck");

/*
@route POST api/admin/add
@desc Add new admin
@access private
*/

router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }

    const { errors, isValid } = validateAddUserInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    const userField = {};

    if (req.body.email) userField.email = req.body.email;
    if (req.body.username) userField.username = req.body.username;
    if (req.body.password) userField.password = req.body.password;
    if (req.body.level) userField.level = req.body.level;

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
  }
);

/*
@route POST api/admin/delete/:id
@desc Delete an Admin
@access private
*/

router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    const userId = req.params.id;
    User.findByPk(userId).then((user) => {
      if (!user) {
        error.user = "User doesn't exist!";
        res.status(400).json(error);
      } else if (user.level < 2) {
        error.user = "You can't deactivate a User";
        res.status(400).json(error);
      } else {
        User.update({ active: 0 }, { where: { id: userId } })
          .then(() => {
            res.json({ message: "Admin/SP deactivated" });
          })
          .catch((err) => res.status(404).json(err));
      }
    });
  }
);

/*
@route GET api/admin/payments
@desc Admin View Payments
@access private
*/

router.get(
  "/payments",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    Payment.findAll()
      .then((pay) => {
        res.json(pay);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route GET api/admin/subscription
@desc Admin View subscriptions
@access private
*/

router.get(
  "/subscriptions",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    let clause = {},
      where = {};
    if (req.body.type) {
      where.type = req.body.type;
    }
    clause = { where };

    Subscription.findAll(
      {
        include: Payment,
      },
      clause
    )
      .then((sub) => {
        res.json(sub);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route GET api/admin/bonus
desc Admin View bonus
@access private
*/

router.get(
  "/bonus",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    let clause = {},
      where = {};
    if (req.body.status) {
      where.status = req.body.status;
    }
    clause = { where };

    Bonus.findAll(
      {
        include: [User, Payment],
      },
      clause
    )
      .then((bonus) => {
        res.json(bonus);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route GET api/admin/transactions
desc Admin View transactions
@access private
*/

router.get(
  "/transactions",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    let clause = {},
      where = {};
    if (req.body.type && !req.body.method) {
      where.type = req.body.type;
    } else if (!req.body.type && req.body.method) {
      where.method = req.body.method;
    } else if (req.body.type && req.body.method) {
      where.method = req.body.method;
      where.type = req.body.type;
    }
    clause = { where };
    Transaction.findAll(
      {
        include: User,
      },
      clause
    )
      .then((transactions) => {
        res.json(transactions);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route GET api/admin/premium
@desc Admin View Premium Members
@access private
*/

router.get(
  "/premium",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }

    let clause = {},
      where = {};
    if (req.body.active) {
      where.active = req.body.active;
    }
    clause = { where };

    Premium.findAll(
      {
        include: [User, Subscription],
      },
      clause
    )
      .then((users) => {
        res.json(users);
      })
      .catch((err) => res.status(404).json(err));
  }
);

module.exports = router;
