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
  Payment = require("../../db/models/Payment"),
  Subscription = require("../../db/models/Subscription"),
  Bonus = require("../../db/models/Bonus"),
  Transaction = require("../../db/models/Transaction"),
  Premium = require("../../db/models/Premium"),
  TransactionView = require("../../db/models/TransactionView"),
  BonusView = require("../../db/models/BonusView"),
  UserView = require("../../db/models/UserView"),
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

    SubscriptionView.findAll(
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

    let where = {};
    if (req.body.search) {
      const searchTerms = req.body.search;
      let searchArray = searchTerms.split(" ");

      if (searchArray.length > 1) {
        let newSearchArray = [],
          newSearchObj = {};
        for (let i = 0; i < searchArray.length; i++) {
          newSearchObj = { user: { [Op.substring]: searchArray[i] } };
          newSearchArray.push(newSearchObj);
        }

        if (req.body.status) {
          where = {
            [Op.and]: [
              {
                [Op.and]: newSearchArray,
              },
              { status: req.body.status },
            ],
          };
        } else {
          where = {
            [Op.and]: newSearchArray,
          };
        }
      } else {
        let search = searchArray[0];
        if (req.body.status) {
          where = {
            [Op.and]: [
              { user: { [Op.substring]: search } },
              { status: req.body.status },
            ],
          };
        } else {
          where = {
            user: { [Op.substring]: search },
          };
        }
      }
    } else {
      if (req.body.status) {
        where.status = req.body.status;
      }
    }

    const query = {
      order: [["bonusid", "DESC"]],
      attributes: [
        "bonusid",
        "amount",
        [
          Sequelize.literal(
            `CASE WHEN status = 1 THEN 'Pending' WHEN type = 0 THEN 'Unapproved' WHEN type = 2 THEN 'Approved' END `
          ),
          "Status",
        ],
        "user",
        "bonusdate",
      ],
      where,
      raw: true,
    };

    BonusView.findAll()
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
    let where = {};
    if (req.body.search) {
      const searchTerms = req.body.search;
      let searchArray = searchTerms.split(" ");

      if (searchArray.length > 1) {
        let newSearchArray = [],
          newSearchObj = {};
        for (let i = 0; i < searchArray.length; i++) {
          newSearchObj = { user: { [Op.substring]: searchArray[i] } };
          newSearchArray.push(newSearchObj);
        }

        if (req.body.type && req.body.method === "") {
          where = {
            [Op.and]: [
              {
                [Op.and]: newSearchArray,
              },
              { type: req.body.type },
            ],
          };
        } else if (req.body.type === "" && req.body.method) {
          where = {
            [Op.and]: [
              {
                [Op.and]: newSearchArray,
              },
              { method: req.body.method },
            ],
          };
        } else if (req.body.type && req.body.method) {
          where = {
            [Op.and]: [
              {
                [Op.and]: newSearchArray,
              },
              {
                [Op.or]: [{ type: req.body.type }, { method: req.body.method }],
              },
            ],
          };
        } else {
          where = {
            [Op.and]: newSearchArray,
          };
        }
      } else {
        let search = searchArray[0];
        if (req.body.type && req.body.method === "") {
          where = {
            [Op.and]: [
              { user: { [Op.substring]: search } },
              { type: req.body.type },
            ],
          };
        } else if (req.body.type === "" && req.body.method) {
          where = {
            [Op.and]: [
              { user: { [Op.substring]: search } },
              { method: req.body.method },
            ],
          };
        } else if (req.body.type && req.body.method) {
          where = {
            [Op.and]: [
              { user: { [Op.substring]: search } },
              {
                [Op.or]: [{ type: req.body.type }, { method: req.body.method }],
              },
            ],
          };
        } else {
          where = {
            user: { [Op.substring]: search },
          };
        }
      }
    } else {
      if (req.body.type && req.body.method === "") {
        where.type = req.body.type;
      } else if (req.body.type === "" && req.body.method) {
        where.method = req.body.method;
      } else if (req.body.type && req.body.method) {
        where = {
          [Op.or]: [{ type: req.body.type }, { method: req.body.method }],
        };
      }
    }

    const query = {
      order: [["transactionid", "DESC"]],
      attributes: [
        "transactionid",
        "amount",
        [
          Sequelize.literal(
            `CASE WHEN type = 'c' THEN 'Credit' WHEN type = 'd' THEN 'Debit' END `
          ),
          "Type",
        ],
        [
          Sequelize.literal(
            `CASE WHEN method = 'b' THEN 'Bonus' WHEN type = 's' THEN 'Subscribed' WHEN type = 'w' THEN 'Withdrawal' END `
          ),
          "method",
        ],
        "user",
        "transactiondate",
      ],
      where,
      raw: true,
    };
    TransactionView.findAll(query)
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
        include: [User],
      },
      clause
    )
      .then((users) => {
        res.json(users);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route POST api/admin/approve/:bonusid
@desc Admin approve Bonus
@access private
*/

router.post(
  "/approve/bonus/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }

    const id = req.body.bonusid;
    Promise.all([
      Bonus.update({ status: 2 }, { where: { id: id } })
        .then(() => {
          Bonus.findByPk(id, { attributes: ["amount", "UserId"] })
            .then((bonus) => {
              let amount = bonus.amount,
                UserId = bonus.UserId;

              Transaction.create({
                amount,
                UserId,
                type: "c",
                method: "b",
              })
                .then(() => {
                  return res.json({ message: "Bonus updated!" });
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
@route POST api/admin/approve/bonuses
@desc Admin approve Bonus
@access private
*/

router.post(
  "/approve/bonuses",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }

    const ids = JSON.parse(req.body.bonusids),
      userIds = JSON.parse(req.body.ids),
      amounts = JSON.parse(req.body.amounts);

    let bulk = {},
      bulkCreate = [];

    for (let index = 0; index < ids.length; index++) {
      bulk = {
        amount: amounts[index],
        UserId: userIds[index],
        type: "c",
        method: "b",
      };
      bulkCreate.push(bulk);
    }

    Bonus.update({ status: 2 }, { where: { id: ids } })
      .then(() => {
        Transaction.bulkCreate(bulkCreate)
          .then(() => {
            return res.json({ message: "Bonus(es) updated!" });
          })
          .catch((err) => res.status(404).json(err));
      })
      .catch((err) => res.status(404).json(err));
  }
);

module.exports = router;
