const express = require("express"),
  router = express.Router(),
  bcrypt = require("bcryptjs"),
  Sequelize = require("sequelize"),
  passport = require("passport"),
  // Use Json Web Token
  jwt = require("jsonwebtoken"),
  keys = require("../../config/keys"),
  User = require("../../model/User"),
  Subscription = require("../../model/Subscription"),
  Payment = require("../../model/Payment"),
  Bonus = require("../../model/Bonus"),
  Premium = require("../../model/Premium"),
  //Bring in the Validation
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
    const bonusFields = {},
      payFields = {},
      premFields = {},
      date = new Date();
    let daysleft, percent;
    if (req.body.referrerID) bonusFields.UserId = req.body.referrerID;
    if (req.body.amount) payFields.amount = req.body.amount;
    if (req.body.payFor) payFields.package = req.body.payFor;
    if (req.body.payPlan) payFields.plan = req.body.payPlan;
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
          UserId: payFields.UserId,
        })
          .then((sub) => {
            bonusFields.SubscriptionId = sub.id;
            premFields.SubscriptionId = sub.id;
            premFields.UserId = payFields.UserId;
            let left = parseInt(daysleft) + period;
            premFields.startdate = date;
            premFields.enddate = date.setDate(date.getDate() + left);
            premFields.active = 1;
            if (isTrue) {
              Premium.create(premFields)
                .then(() => {
                  if (
                    bonusFields.UserId !== "" ||
                    bonusFields.UserId !== undefined
                  ) {
                    bonusFields.amount = returned.amount * (percent / 100);
                    Bonus.create(bonusFields)
                      .then(() => {
                        res.json({ message: "Payment Successful!" });
                      })
                      .catch((err) => res.status(404).json(err));
                  } else {
                    res.json({ message: "Payment Successful!" });
                  }
                })
                .catch((err) => res.status(404).json(err));
            } else {
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
            }
          })
          .catch((err) => res.status(404).json(err));
      })
      .catch((err) => res.status(404).json(err));
  }
);

module.exports = router;
