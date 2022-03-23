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
  Verify = require("../../db/models/Verify"),
  Referral = require("../../db/models/Referral"),
  Profile = require("../../db/models/Profile"),
  Premium = require("../../db/models/Premium"),
  Payment = require("../../db/models/Payment"),
  Subscription = require("../../db/models/Subscription"),
  Preference = require("../../db/models/Preference"),
  Bonus = require("../../db/models/Bonus"),
  Signal = require("../../db/models/Signal"),
  Withdrawal = require("../../db/models/Withdrawal"),
  ForumReply = require("../../db/models/ForumReply"),
  Announcement = require("../../db/models/Announcement"),
  ProviderView = require("../../db/models/ProviderView"),
  Wallet = require("../../db/models/Wallet"),
  WithdrawalView = require("../../db/models/WithdrawalView"),
  AccountView = require("../../db/models/AccountView"),
  BonusView = require("../../db/models/BonusView"),
  Currency = require("../../db/models/Currency"),
  // Bring in View
  SignalView = require("../../db/models/SignalView"),
  ReferralView = require("../../db/models/ReferralView"),
  Forum = require("../../db/models/Forum"),
  ForumView = require("../../db/models/ForumView"),
  UserView = require("../../db/models/UserView"),
  Transaction = require("../../db/models/Transaction"),
  // Bring in User Checker
  checkUser = require("../../validation/checkUser");
/*
@route GET api/view/payments
@desc User View Payments
@access private


router.get(
  "/payments",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkUser(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }

    let limit = null,
      offset = 0;

    if (req.body.limit) limit = req.body.limit;
    if (req.body.offset) offset = req.body.offset;

    const UserId = req.user.id;
    Payment.findAll({
      where: {
        UserId,
      },
      order: ["id", "DESC"],
      limit,
      offset,
    })
      .then((pay) => {
        res.json(pay);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route GET api/view/subscriptions
@desc User View subscriptions
@access private


router.get(
  "/subscriptions",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkUser(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }

    let limit = null,
      offset = 0;

    if (req.body.limit) limit = req.body.limit;
    if (req.body.offset) offset = req.body.offset;

    const UserId = req.user.id;
    Subscription.findAll({
      where: {
        UserId,
      },
      order: ["id", "DESC"],
      limit,
      offset,
    })
      .then((sub) => {
        res.json(sub);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route GET api/userview/bonus
desc User View bonus
@access private


router.get(
  "/bonus",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkUser(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    const UserId = req.user.id;
    Bonus.findAll({
      where: { UserId },
      include: [Payment],
    })
      .then((bonus) => {
        res.json(bonus);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route GET api/user/transactions
desc User View transactions
@access private


router.get(
  "/transactions",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkUser(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    const UserId = req.user.id;
    let clause = {},
      where = {};
    where.UserId = UserId;
    if (req.body.type && !req.body.method) {
      where.type = req.body.type;
    } else if (!req.body.type && req.body.method) {
      where.method = req.body.method;
    } else if (req.body.type && req.body.method) {
      where.method = req.body.method;
      where.type = req.body.type;
    }
    clause = { where };
    Transaction.findAll(clause)
      .then((transactions) => {
        res.json(transactions);
      })
      .catch((err) => res.status(404).json(err));
  }
);*/

/*
@route GET api/userview/signals
@desc Admin View signals
@access private
*/

router.post(
  "/signals",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkUser(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    let UserId = req.user.id,
      limit = null,
      search = null,
      offset = 0,
      where = {},
      result = [];

    if (req.body.limit) limit = req.body.limit;
    if (req.body.offset) offset = req.body.offset;
    if (req.body.search) search = req.body.search;

    if (search !== null) {
      const searchArray = search.split("+");
      if (searchArray.length > 1) {
        let newSearchArray = [],
          newSearchObj = {};
        for (let i = 0; i < searchArray.length; i++) {
          newSearchObj = {
            [Op.or]: [
              {
                provider: { [Op.substring]: searchArray[i] },
              },
              {
                firstcurrency: { [Op.regexp]: searchArray[i] },
              },
              {
                secondcurrency: { [Op.regexp]: searchArray[i] },
              },
            ],
          };
          newSearchArray.push(newSearchObj);
        }
        where = { ...where, ...{ [Op.and]: newSearchArray } };
      } else {
        let searchTerms = searchArray[0];
        where = {
          ...where,
          ...{
            [Op.or]: [
              {
                provider: { [Op.substring]: searchTerms },
              },
              {
                firstcurrency: { [Op.regexp]: searchTerms },
              },
              {
                secondcurrency: { [Op.regexp]: searchTerms },
              },
            ],
          },
        };
      }
    }

    Preference.findOne({
      where: { UserId },
      attributes: ["providers", "currencies"],
    })
      .then((pref) => {
        let currencies = pref.currencies;
        providers = pref.providers;
        if (currencies !== null) {
          where = { ...where, ...{ CurrencyId: currencies } };
        }
        if (providers !== null) {
          where = { ...where, ...{ providerid: providers } };
        }
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
            "signaloption",
            "status",
            "CurrencyId",
            "startrange",
            "endrange",
          ],
          where,
          raw: true,
        };

        SignalView.findAndCountAll(query)
          .then((entries) => {
            const { count, rows } = entries;
            result = [...[count], ...rows];
            return res.json(result);
          })
          .catch((err) => res.status(404).json(err));
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route GET api/user/referrals
desc user View referrals
@access private
*/

router.post(
  "/referrals",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkUser(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }

    let referralId = req.user.id;

    let limit = null,
      offset = 0,
      status = null,
      search = null,
      where = { referralId },
      result = [];

    if (req.body.limit) limit = req.body.limit;
    if (req.body.offset) offset = req.body.offset;
    if (req.body.status) status = req.body.status;
    if (req.body.gateway) gateway = req.body.gateway;
    if (req.body.search) search = req.body.search;

    if (status !== null) {
      where = { ...where, ...{ status } };
    }

    if (search !== null) {
      const searchArray = search.split("+");
      if (searchArray.length > 1) {
        let newSearchArray = [],
          newSearchObj = {};
        for (let i = 0; i < searchArray.length; i++) {
          newSearchObj = {
            [Op.or]: [{ referred: { [Op.substring]: searchArray[i] } }],
          };
          newSearchArray.push(newSearchObj);
        }
        where = { ...where, ...{ [Op.and]: newSearchArray } };
      } else {
        let searchTerms = searchArray[0];
        where = {
          ...where,
          ...{
            [Op.or]: [{ referred: { [Op.substring]: searchTerms } }],
          },
        };
      }
    }

    ReferralView.findAndCountAll({
      where,
      order: [["id", "desc"]],
      attributes: ["referredId", "referred", "phone", "status"],
      limit,
      offset,
    })
      .then((entries) => {
        const { count, rows } = entries;
        result = [...[count], ...rows];
        res.json(result);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route GET api/user/subscriptions
desc user View subscriptions
@access private
*/

router.post(
  "/subscriptions",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkUser(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }

    let UserId = req.user.id;

    let limit = null,
      offset = 0,
      status = null,
      plan = null,
      type = null,
      where = { UserId },
      result = [];

    if (req.body.limit) limit = req.body.limit;
    if (req.body.offset) offset = req.body.offset;
    if (req.body.status) status = req.body.status;
    if (req.body.plan) plan = req.body.plan;
    if (req.body.type) type = req.body.type;

    if (status !== null) {
      where = { ...where, ...{ status } };
    }
    if (type !== null) {
      where = { ...where, ...{ type } };
    }
    if (plan !== null) {
      where = { ...where, ...{ plan } };
    }

    Subscription.findAndCountAll({
      where,
      order: [["id", "desc"]],
      attributes: [
        "id",
        "amount",
        "type",
        "plan",
        "status",
        "package",
        "duration",
        "payID",
        "createdAt",
      ],
      limit,
      offset,
    })
      .then((entries) => {
        const { count, rows } = entries;
        result = [...[count], ...rows];
        res.json(result);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route GET api/user/transactions
desc user View transactions
@access private
*/

router.post(
  "/transactions",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkUser(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }

    let UserId = req.user.id;

    let limit = null,
      offset = 0,
      method = null,
      type = null,
      where = { UserId },
      result = [];

    if (req.body.limit) limit = req.body.limit;
    if (req.body.offset) offset = req.body.offset;
    if (req.body.method) method = req.body.method;
    if (req.body.type) type = req.body.type;

    if (method !== null) {
      where = { ...where, ...{ method } };
    }
    if (type !== null) {
      where = { ...where, ...{ type } };
    }

    Transaction.findAndCountAll({
      where,
      order: [["id", "desc"]],
      attributes: ["amount", "type", "method", "createdAt"],
      limit,
      offset,
    })
      .then((entries) => {
        const { count, rows } = entries;
        result = [...[count], ...rows];
        res.json(result);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route GET api/user/payments
desc user View payments
@access private
*/

router.post(
  "/payments",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkUser(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }

    let UserId = req.user.id;

    let limit = null,
      offset = 0,
      status = null,
      gateway = null,
      search = null,
      where = { UserId },
      result = [];

    if (req.body.limit) limit = req.body.limit;
    if (req.body.offset) offset = req.body.offset;
    if (req.body.status) status = req.body.status;
    if (req.body.gateway) gateway = req.body.gateway;
    if (req.body.search) search = req.body.search;

    if (status !== null) {
      where = { ...where, ...{ status } };
    }
    if (gateway !== null) {
      where = { ...where, ...{ gateway } };
    }
    if (search !== null) {
      const searchArray = search.split("+");
      if (searchArray.length > 1) {
        let newSearchArray = [],
          newSearchObj = {};
        for (let i = 0; i < searchArray.length; i++) {
          newSearchObj = {
            [Op.or]: [{ reference: { [Op.substring]: searchArray[i] } }],
          };
          newSearchArray.push(newSearchObj);
        }
        where = { ...where, ...{ [Op.and]: newSearchArray } };
      } else {
        let searchTerms = searchArray[0];
        where = {
          ...where,
          ...{
            [Op.or]: [{ reference: { [Op.substring]: searchTerms } }],
          },
        };
      }
    }

    Payment.findAndCountAll({
      where,
      order: [["id", "desc"]],
      attributes: [
        "amount",
        "reference",
        "gateway",
        "status",
        "createdAt",
        "updatedAt",
      ],
      limit,
      offset,
    })
      .then((entries) => {
        const { count, rows } = entries;
        result = [...[count], ...rows];
        res.json(result);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route GET api/user/withdrawals
desc user View withdrawals
@access private
*/

router.post(
  "/withdrawals",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkUser(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }

    let UserId = req.user.id;

    let limit = null,
      offset = 0,
      status = null,
      where = { UserId },
      result = [];

    if (req.body.limit) limit = req.body.limit;
    if (req.body.offset) offset = req.body.offset;
    if (req.body.status) status = req.body.status;

    if (status !== null) {
      where = { ...where, ...{ status } };
    }

    WithdrawalView.findAndCountAll({
      where,
      order: [["withdrawalid", "desc"]],
      attributes: [
        "amount",
        "accountnumber",
        "wallet",
        "status",
        "createdAt",
        "updatedAt",
      ],
      limit,
      offset,
    })
      .then((entries) => {
        const { count, rows } = entries;
        result = [...[count], ...rows];
        res.json(result);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route GET api/userview/bonus
desc user View bonus
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

    let UserId = req.user.id;

    let limit = null,
      offset = 0,
      status = null,
      where = { UserId },
      result = [];

    if (req.body.limit) limit = req.body.limit;
    if (req.body.offset) offset = req.body.offset;
    if (req.body.status) status = req.body.status;

    if (status !== null) {
      where = { ...where, ...{ status } };
    }

    BonusView.findAndCountAll({
      where,
      order: [["bonusid", "desc"]],
      attributes: ["amount", "status", "createdAt", "updatedAt", "payer"],
      limit,
      offset,
    })
      .then((entries) => {
        const { count, rows } = entries;
        result = [...[count], ...rows];
        res.json(result);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route GET api/userview/premium
@desc User View premium
@access private
*/

router.get(
  "/premium",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkUser(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    const UserId = req.user.id;
    Premium.findOne({
      where: {
        UserId,
      },
      attributes: ["enddate", "status"],
    })
      .then((premium) => {
        res.json(premium);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route GET api/userview/details
@desc User View details
@access private
*/

router.get(
  "/details",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkUser(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    const UserId = req.user.id;
    const details = {};
    return Promise.all([
      Transaction.sum("amount", {
        where: {
          type: "c",
          UserId,
        },
      })
        .then((credit) => {
          details.credit = credit;
          Transaction.sum("amount", {
            where: {
              type: "d",
              UserId,
            },
          })
            .then((debit) => {
              details.debit = debit;
              Transaction.count({
                where: {
                  UserId,
                },
              })
                .then((transactions) => {
                  details.transactions = transactions;
                  Bonus.sum("amount", {
                    where: {
                      status: "a",
                      UserId,
                    },
                  })
                    .then((bonus) => {
                      details.bonus = bonus;
                      Referral.count({
                        where: {
                          referral: UserId,
                        },
                      })
                        .then((referral) => {
                          details.referral = referral;
                          Subscription.count({
                            where: {
                              UserId,
                              status: "a",
                            },
                          })
                            .then((sub) => {
                              details.sub = sub;

                              Announcement.findAll({
                                limit: 3,
                                where: {
                                  enddate: {
                                    [Op.gt]: new Date().toISOString(),
                                  },
                                },
                              })
                                .then((ann) => {
                                  details.ann = ann;
                                  return res.json(details);
                                })
                                .catch((err) => res.status(404).json(err));
                            })
                            .catch((err) => res.status(404).json(err));
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
);

/*
@route GET api/userview/currency
@desc User View currency
@access private
*/

router.get(
  "/list/:table",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkUser(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }

    let table = req.params.table.split(":")[1],
      view,
      attributes;
    if (table === "currency") {
      view = Currency;
      attributes = ["id", "firstcurrency", "secondcurrency"];
    } else if (table === "provider") {
      view = ProviderView;
      attributes = ["userid", "username"];
    } else if (table === "wallet") {
      view = Wallet;
      attributes = ["wallet", "id"];
    }
    view
      .findAll({
        where: { status: "a" },
        attributes,
      })
      .then((view) => {
        res.json(view);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route GET api/userview/balance
@desc User View balance
@access private
*/

router.get(
  "/balance",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkUser(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    let UserId = req.user.id,
      balance = {};

    Transaction.sum("amount", {
      where: {
        type: "c",
        UserId,
      },
    })
      .then((credit) => {
        balance.credit = credit;
        Transaction.sum("amount", {
          where: {
            type: "d",
            UserId,
          },
        })
          .then((debit) => {
            balance.debit = debit;
            let total = balance.credit - balance.debit;
            return res.json(total);
          })
          .catch((err) => res.status(404).json(err));
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route GET api/userview/account
@desc User View account
@access private
*/

router.get(
  "/account",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkUser(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    let UserId = req.user.id;

    AccountView.findAll({
      where: {
        UserId,
      },
      attributes: ["walletid", "accountnumber", "wallet"],
    })
      .then((account) => {
        return res.json(account);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route GET api/userview/forums
@desc User View public forums
@access private
*/

router.post(
  "/forums",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkUser(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    let UserId = req.user.id;

    let limit = null,
      status = null,
      search = null,
      right = null,
      offset = 0,
      where = {},
      result = [];

    if (req.body.limit) limit = req.body.limit;
    if (req.body.offset) offset = req.body.offset;
    if (req.body.status) status = req.body.status;
    if (req.body.search) search = req.body.search;
    if (req.body.right) right = req.body.right;

    if (status !== null) {
      where = { ...where, ...{ status } };
    }
    if (right !== null) {
      where = { ...where, ...{ right } };
    }
    if (search !== null) {
      const searchArray = search.split("+");
      if (searchArray.length > 1) {
        let newSearchArray = [],
          newSearchObj = {};
        for (let i = 0; i < searchArray.length; i++) {
          newSearchObj = {
            [Op.or]: [
              {
                title: { [Op.substring]: searchArray[i] },
              },
              {
                creator: { [Op.substring]: searchArray[i] },
              },

              {
                text: { [Op.substring]: searchArray[i] },
              },
            ],
          };
          newSearchArray.push(newSearchObj);
        }
        where = { ...where, ...{ [Op.and]: newSearchArray } };
      } else {
        let searchTerms = searchArray[0];
        where = {
          ...where,
          ...{
            [Op.or]: [
              {
                title: { [Op.substring]: searchTerms },
              },
              {
                creator: { [Op.substring]: searchTerms },
              },

              {
                text: { [Op.substring]: searchTerms },
              },
            ],
          },
        };
      }
    }

    where = {
      ...where,
      ...{
        [Op.or]: [
          {
            right: "p",
          },
          {
            UserId,
          },
        ],
      },
    };

    ForumView.findAndCountAll({
      order: [
        ["id", "Desc"],
        ["status", "Asc"],
      ],
      limit,
      offset,
      where,
    })
      .then((entries) => {
        const { count, rows } = entries;
        result = [...[count], ...rows];
        return res.json(result);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route GET api/userview/forum/:id
@desc User View forum
@access private
*/

router.get(
  "/forum/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkUser(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    let UserId = req.user.id,
      forumid = parseInt(req.params.id.split(":")[1]);

    Forum.findByPk(forumid, { attributes: ["UserId", "right"] })
      .then((forum) => {
        let creatorId = forum.UserId,
          right = forum.right;
        if (creatorId !== UserId && right !== "p") {
          error.user = "You don't have any connection to this post";
          return res.status(400).json(error);
        } else {
          let post = {};
          Forum.findByPk(forumid, {
            include: [
              {
                model: User,
                attributes: ["username", "level"],
                required: true,
              },
            ],
          })
            .then((forum) => {
              post.forum = forum;
              ForumReply.findAll({
                where: {
                  ForumId: forumid,
                },
                include: [
                  {
                    model: User,
                    attributes: ["username", "level"],
                    required: true,
                  },
                ],
              })
                .then((reply) => {
                  post.reply = reply;
                  return res.json(post);
                })
                .catch((err) => res.status(404).json(err));
            })
            .catch((err) => res.status(404).json(err));
        }
      })
      .catch((err) => res.status(404).json(err));
  }
);
module.exports = router;
