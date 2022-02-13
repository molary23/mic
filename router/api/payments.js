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
  Transaction = require("../../model/Transaction"),
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
      payFields = {};
    if (req.body.referrerID) bonusFields.UserId = req.body.referrerID;
    if (req.body.amount) payFields.amount = req.body.amount;
    if (req.body.payFor) payFields.package = req.body.payFor;
    if (req.body.payPlan) payFields.plan = req.body.payPlan;
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

    bonusFields.amount = returned.amount * (5 / 100);
    payFields.payday = returned.date.toISOString();
    payFields.status = returned.status;
    payFields.reference = returned.reference.toUpperCase();

    Payment.create(payFields)
      .then((pay) => {
        const date = new Date(),
          year = date.getFullYear(),
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
            // Premium
            Bonus.create(bonusFields)
              .then(() => {
                const transField = {};
                transField.amount = bonusFields.amount;
                transField.type = "c";
                transField.method = "b";
                transField.UserId = bonusFields.UserId;
                console.log(transField);
                Transaction.create(transField)
                  .then(() => {
                    res.json({ message: "Payment Successful!" });
                  })
                  .catch((err) => res.status(404).json(err));
              })
              .catch((err) => res.status(404).json(err));
          })
          .catch((err) => res.status(404).json(err));
      })
      .catch((err) => res.status(404).json(err));
  }
);

module.exports = router;
