const express = require("express"),
  router = express.Router(),
  bcrypt = require("bcryptjs"),
  Sequelize = require("sequelize"),
  passport = require("passport"),
  // Use Json Web Token
  jwt = require("jsonwebtoken"),
  keys = require("../../config/keys"),
  User = require("../../db/models/User"),
  Subscription = require("../../db/models/Subscription"),
  Transaction = require("../../db/models/Transaction"),
  Payment = require("../../db/models/Payment"),
  Bonus = require("../../db/models/Bonus"),
  Premium = require("../../db/models/Premium"),
  //Bring in the Validation

  //Bring in User Checker
  checkSuperAdmin = require("../../validation/superCheck"),
  checkUser = require("../../validation/checkUser"),
  // Bring in Duration
  duration = require("../../util/duration");

/*
@route POST api/payments/make
@desc User make Payment
@access private
*/

router.post(
  "/make",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    const bonusFields = {},
      payFields = {},
      subFields = {},
      premFields = {},
      date = new Date();
    let daysleft, percent;
    if (req.body.referrerID) bonusFields.UserId = req.body.referrerID;
    if (req.body.amount) payFields.amount = req.body.amount;
    if (req.body.payFor) subFields.package = req.body.payFor;
    if (req.body.payPlan) subFields.plan = req.body.payPlan;
    if (req.body.starter) premFields.starter = req.body.starter;

    let isTrue = premFields.starter === "true";

    if (isTrue) {
      daysleft = 0;
      percent = 10;
    } else {
      daysleft = req.body.daysleft;
      percent = 5;
    }

    payFields.UserId = req.user.id;
    const returned = {
      amount: 2.99,
      user: 2,
      date: new Date(),
      status: "success",
      package: "m",
      plan: 6,
      reference: "jgw7sti9237467tvjerghrs97t36y",
    };

    payFields.payday = returned.date.toISOString();
    payFields.status = returned.status;
    payFields.reference = returned.reference.toUpperCase();

    Payment.create(payFields)
      .then((pay) => {
        const year = date.getFullYear(),
          month = date.getMonth() + 1;
        let days = 365,
          payId = pay.id,
          payType = "p",
          period = 0;
        if (year % 4 === 0) {
          days = 366;
        }

        if (payFields.package.toLowerCase() === "m") {
          for (let i = 0; i < payFields.plan; i++) {
            period += duration(month + i, year);
          }
        } else if (payFields.package.toLowerCase() === "y") {
          period = days;
        }

        Subscription.create({
          type: payType,
          duration: period,
          payID: payId,
          plan: subFields.plan,
          package: subFields.package,
          UserId: payFields.UserId,
          amount: payFields.amount,
        })
          .then((sub) => {
            bonusFields.SubscriptionId = sub.id;
            premFields.SubscriptionId = sub.id;
            premFields.UserId = payFields.UserId;
            let left = parseInt(daysleft) + period;
            premFields.startdate = date;
            premFields.enddate = new Date(
              new Date().setDate(new Date().getDate() + left)
            );
            premFields.active = 1;
            Premium.update(
              {
                SubscriptionId: premFields.SubscriptionId,
                startdate: premFields.startdate,
                enddate: premFields.enddate,
                active: premFields.active,
              },
              { where: { UserId: premFields.UserId } }
            )
              .then(() => {
                if (
                  bonusFields.UserId !== "" ||
                  bonusFields.UserId !== undefined
                ) {
                  bonusFields.amount = returned.amount * (percent / 100);
                  Bonus.create(bonusFields)
                    .then(() => {
                      res.json({
                        message: "Payment Successful!",
                      });
                    })
                    .catch((err) => res.status(404).json(err));
                } else {
                  res.json({
                    message: "Payment Successful!",
                  });
                }
              })
              .catch((err) => res.status(404).json(err));
          })
          .catch((err) => res.status(404).json(err));
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route POST api/payments/bonus
@desc User use Bonus to make Payment
@access private
*/

router.post(
  "/bonus",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkUser(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    const subFields = {},
      UserId = req.user.id;
    const today = new Date();

    const year = today.getFullYear(),
      month = today.getMonth() + 1;

    subFields.amount = req.body.amount;
    subFields.plan = req.body.plan;
    subFields.package = req.body.package;
    subFields.daysleft = req.body.daysleft;
    let days = 365,
      payType = "b";
    period = 0;
    if (year % 4 === 0) {
      days = 366;
    }
    if (subFields.package.toLowerCase() === "m") {
      for (let i = 0; i < subFields.plan; i++) {
        period += duration(month + i, year);
      }
    } else if (subFields.package.toLowerCase() === "y") {
      period = days;
    }

    let left = parseInt(subFields.daysleft) + period;
    subFields.startdate = today;
    subFields.enddate = new Date(
      new Date().setDate(new Date().getDate() + left)
    );
    console.log(subFields);

    return Promise.all([
      Transaction.sum("amount", {
        where: { UserId, type: "c" },
      })
        .then((credit) => {
          Transaction.sum("amount", { where: { UserId, type: "d" } })
            .then((debit) => {
              const balance = credit - debit;
              if (balance > subFields.amount) {
                Subscription.create({
                  type: payType,
                  duration: period,
                  plan: subFields.plan,
                  package: subFields.package,
                  amount: subFields.amount,
                  UserId,
                })
                  .then((sub) => {
                    const subid = sub.id;
                    Premium.update(
                      {
                        active: 1,
                        startdate: subFields.startdate.toISOString(),
                        enddate: subFields.enddate.toISOString(),
                        subid,
                      },
                      {
                        where: {
                          UserId,
                        },
                      }
                    )
                      .then(() => {
                        Transaction.create({
                          type: "d",
                          method: "s",
                          UserId,
                          amount: subFields.amount,
                        })
                          .then(() => {
                            return res.json({ message: "Payment Successful!" });
                          })
                          .catch((err) =>
                            res.status(404).json(`transs ${err}`)
                          );
                      })
                      .catch((err) => res.status(404).json(`Premium ${err}`));
                  })
                  .catch((err) => res.status(404).json(`sub: ${err}`));
              } else {
                error.amount =
                  "You don't have sufficient balance to pay for this plan";
                res.json(error);
              }
            })
            .catch((err) => res.status(404).json(err));
        })
        .catch((err) => res.status(404).json(err)),
    ]);
  }
);

module.exports = router;
