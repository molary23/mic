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
  Referral = require("../../db/models/Referral"),
  //Bring in the Validation

  //Bring in User Checker
  checkSuperAdmin = require("../../validation/superCheck"),
  checkUser = require("../../validation/checkUser"),
  // Bring in Duration
  duration = require("../../util/duration"),
  dateformat = require("../../util/dateformat");

/*
@route POST api/payments/make
@desc User make Payment
@access private
*/

router.post(
  "/make",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkUser(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    const bonusFields = {},
      payFields = {},
      subFields = {},
      premFields = {};
    date = new Date();

    let daysleft, percent;

    if (req.body.amount) payFields.amount = req.body.amount;
    if (req.body.package) subFields.package = req.body.package;
    if (req.body.plan) subFields.plan = req.body.plan;
    if (req.body.reference) payFields.reference = req.body.reference;
    if (req.body.gateway) payFields.gateway = req.body.gateway;
    if (req.body.status) payFields.status = req.body.status;

    payFields.UserId = req.user.id;

    if (payFields.status === "f") {
      Payment.create(payFields)
        .then(() => {
          error.payment = "Payment failed";
          return res.status(400).json(error);
        })
        .catch((err) => res.status(404).json(err));
    } else {
      return Promise.all([
        Referral.findOne({
          where: {
            UserId: payFields.UserId,
          },
          attributes: ["referral"],
        })
          .then((ref) => {
            if (ref) {
              bonusFields.referral = ref.referral;
              if (subFields.plan === "m") {
                percent = 0.1;
              } else {
                percent = 0.2;
              }
            }

            const year = new Date(date).getFullYear(),
              month = new Date(date).getMonth() + 1;
            let days = 365,
              period = 0;
            if (year % 4 === 0) {
              days = 366;
            }

            if (subFields.plan.toLowerCase() === "m") {
              for (let i = 0; i < subFields.package; i++) {
                period += duration(month + i, year);
              }
            } else if (subFields.plan.toLowerCase() === "y") {
              period = days;
            }

            Payment.create(payFields)
              .then((pay) => {
                subFields.payId = pay.id;
                bonusFields.PaymentId = pay.id;
                Subscription.create({
                  type: "p",
                  duration: period,
                  payID: subFields.payId,
                  plan: subFields.plan,
                  package: subFields.package,
                  UserId: payFields.UserId,
                  amount: payFields.amount,
                })
                  .then((sub) => {
                    premFields.SubscriptionId = sub.id;
                    premFields.UserId = payFields.UserId;
                    premFields.status = "a";
                    Premium.findOne({
                      where: { UserId: premFields.UserId },
                      attributes: ["enddate"],
                    })
                      .then((prem) => {
                        let enddate = prem.enddate,
                          daysleft = Math.floor(
                            Math.abs(new Date(enddate) - date) / (24 * 3600000)
                          ),
                          left = daysleft + period,
                          expirydate = new Date(
                            new Date().setDate(new Date().getDate() + left)
                          );
                        premFields.enddate = expirydate;

                        Premium.update(
                          {
                            SubscriptionId: premFields.SubscriptionId,
                            enddate: premFields.enddate,
                            status: premFields.status,
                          },
                          { where: { UserId: premFields.UserId } }
                        )
                          .then(() => {
                            if (bonusFields.referral !== null) {
                              bonusFields.UserId = bonusFields.referral;
                              bonusFields.amount = payFields.amount * percent;
                              Bonus.create(bonusFields)
                                .then(() => {
                                  return res.json({
                                    message: true,
                                  });
                                })
                                .catch((err) => res.status(404).json(err));
                            } else {
                              return res.json({
                                message: true,
                              });
                            }
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
    const date = new Date();

    const year = date.getFullYear(),
      month = date.getMonth() + 1;

    subFields.amount = req.body.amount;
    subFields.plan = req.body.plan;
    subFields.package = req.body.package;

    let days = 365,
      payType = "b";
    period = 0;
    if (year % 4 === 0) {
      days = 366;
    }
    if (subFields.plan.toLowerCase() === "m") {
      for (let i = 0; i < subFields.package; i++) {
        period += duration(month + i, year);
      }
    } else if (subFields.plan.toLowerCase() === "y") {
      period = days;
    }

    return Promise.all([
      Transaction.sum("amount", {
        where: { UserId, type: "c" },
      })
        .then((credit) => {
          Transaction.sum("amount", { where: { UserId, type: "d" } })
            .then((debit) => {
              const balance = credit - debit;
              if (balance >= subFields.amount) {
                Subscription.create({
                  type: payType,
                  duration: period,
                  plan: subFields.plan,
                  package: subFields.package,
                  amount: subFields.amount,
                  UserId,
                })
                  .then((sub) => {
                    const subId = sub.id;
                    Premium.findOne({
                      where: { UserId },
                      attributes: ["enddate"],
                    })
                      .then((prem) => {
                        let enddate = prem.enddate,
                          daysleft = Math.floor(
                            Math.abs(new Date(enddate) - date) / (24 * 3600000)
                          ),
                          left = daysleft + period,
                          expirydate = new Date(
                            new Date().setDate(new Date().getDate() + left)
                          );
                        subFields.enddate = expirydate;
                        Premium.update(
                          {
                            status: "a",
                            enddate: subFields.enddate,
                            subId,
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
                                return res.json({
                                  message: true,
                                });
                              })
                              .catch((err) =>
                                res.status(404).json(`transs ${err}`)
                              );
                          })
                          .catch((err) =>
                            res.status(404).json(`Premium ${err}`)
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

/*
@route GET api/payments/update/:action/:id
@desc Admin Delete wallet
@access private
*/

router.get(
  "/update/:action/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    let id = req.params.id.split(":")[1];
    let action = req.params.action.split(":")[1];
    id = parseInt(id);

    let status;
    if (action === "cancel") {
      status = "f";
      bonusstatus = "r";
    } else if (action === "update") {
      // check payment gateway to get result
      bonusstatus = "a";
      status = "s";
    }

    Payment.update(
      { status },
      {
        where: {
          id,
        },
      }
    )
      .then(() => {
        Bonus.update(
          { status: bonusstatus },
          {
            where: {
              PaymentId: id,
            },
          }
        )
          .then(() => {
            res.json(true);
          })
          .catch((err) => res.status(404).json(err));
      })
      .catch((err) => res.status(404).json(err));
  }
);

module.exports = router;
