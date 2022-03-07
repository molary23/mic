const express = require("express"),
  router = express.Router(),
  bcrypt = require("bcryptjs"),
  passport = require("passport"),
  // Use Json Web Token
  User = require("../../db/models/User"),
  Payment = require("../../db/models/Payment"),
  Subscription = require("../../db/models/Subscription"),
  Bonus = require("../../db/models/Bonus"),
  Transaction = require("../../db/models/Transaction"),
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
    if (req.body.phone) userField.phone = req.body.phone;
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
                      .then(() => {
                        res.json(true);
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
@route POST api/admin/update/:id
@desc update an Admin
@access private
*/

router.post(
  "/update",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    const [action, userId] = req.body;
    let active;
    if (action === "delete") {
      active = "i";
    } else if (action === "reactivate") {
      active = "a";
    }

    User.findByPk(userId).then((user) => {
      if (!user) {
        error.user = "User doesn't exist!";
        res.status(400).json(error);
      } else if (user.level < 2) {
        error.user = "You can't deactivate a User";
        res.status(400).json(error);
      } else {
        User.update({ status: active }, { where: { id: userId } })
          .then(() => {
            res.json(true);
          })
          .catch((err) => res.status(404).json(err));
      }
    });
  }
);

/*
@route POST api/admin/approve/bonus
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

    const { action, id } = req.body;

    let status;
    if (action === "approve") {
      status = "a";
    } else if (action === "reject") {
      status = "r";
    }

    Promise.all([
      Bonus.update({ status }, { where: { id: id } })
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

/*
@route POST api/admin/approve/payment
@desc Admin approve Payment
@access private
*/

router.post(
  "/approve/payment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }

    const id = req.body.payid;
    Promise.all([
      Payment.update({ status: 2 }, { where: { id } })
        .then(() => {
          Subscription.update({ status: 2 }, { where: { payID: id } })
            .then(() => {
              res.json({ message: "Payment Approved!" });
            })
            .catch((err) => res.status(404).json(err));
        })
        .catch((err) => res.status(404).json(err)),
    ]);
  }
);

/*
@route POST api/admin/approve/payments
@desc Admin approve Bonus
@access private
*/

router.post(
  "/approve/payments",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    const ids = JSON.parse(req.body.payids);
    Payment.update({ status: 2 }, { where: { id: ids } })
      .then(() => {
        Subscription.update({ status: 2 }, { where: { payID: ids } })
          .then(() => {
            return res.json({ message: "Payment(s) updated!" });
          })
          .catch((err) => res.status(404).json(err));
      })
      .catch((err) => res.status(404).json(err));
  }
);

module.exports = router;
