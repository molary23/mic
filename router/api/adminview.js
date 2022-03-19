const express = require("express"),
  router = express.Router(),
  Sequelize = require("sequelize"),
  passport = require("passport"),
  { Op } = require("sequelize"),
  // Use Json Web Token
  jwt = require("jsonwebtoken"),
  keys = require("../../config/keys"),
  Payment = require("../../db/models/Payment"),
  Subscription = require("../../db/models/Subscription"),
  SubscriptionView = require("../../db/models/SubscriptionView"),
  Bonus = require("../../db/models/Bonus"),
  Currency = require("../../db/models/Currency"),
  Referral = require("../../db/models/Referral"),
  Wallet = require("../../db/models/Wallet"),
  Profile = require("../../db/models/Profile"),
  User = require("../../db/models/User"),
  Announcement = require("../../db/models/Announcement"),
  Account = require("../../db/models/Account"),
  Forum = require("../../db/models/Forum"),
  ForumReply = require("../../db/models/ForumReply"),
  ReferralView = require("../../db/models/ReferralView"),
  ForumView = require("../../db/models/ForumView"),
  Transaction = require("../../db/models/Transaction"),
  TransactionView = require("../../db/models/TransactionView"),
  ProviderView = require("../../db/models/ProviderView"),
  Signal = require("../../db/models/Signal"),
  SignalView = require("../../db/models/SignalView"),
  Preference = require("../../db/models/Preference"),
  Premium = require("../../db/models/Premium"),
  PaymentView = require("../../db/models/PaymentView"),
  WithdrawalView = require("../../db/models/WithdrawalView"),
  BonusView = require("../../db/models/BonusView"),
  UserView = require("../../db/models/UserView"),
  SuperView = require("../../db/models/SuperView"),
  AccountView = require("../../db/models/AccountView"),
  //Bring in Super Admin Checker
  checkSuperAdmin = require("../../validation/superCheck");

/*
@route GET api/adminview/payments
@desc Admin View Payments
@access private
*/

router.post(
  "/payments",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }

    let limit = null,
      offset = 0,
      status = null,
      gateway = null,
      search = null,
      user = null,
      ref = null,
      where = {};

    if (req.body.limit) limit = req.body.limit;
    if (req.body.offset) offset = req.body.offset;
    if (req.body.status) status = req.body.status;
    if (req.body.gateway) gateway = req.body.gateway;
    if (req.body.search) search = req.body.search;
    if (req.body.user) user = parseInt(req.body.user);
    if (req.body.ref) ref = req.body.ref;

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
            [Op.or]: [
              { username: { [Op.substring]: searchArray[i] } },
              { reference: { [Op.substring]: searchArray[i] } },
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
              { username: { [Op.substring]: searchTerms } },
              { reference: { [Op.substring]: searchTerms } },
            ],
          },
        };
      }
    }

    if ((user !== null) & (ref !== null)) {
      let UserId = user;
      where = { ...where, ...{ UserId } };
    }

    const query = {
      order: [["payid", "DESC"]],
      offset,
      limit,
      attributes: [
        "payid",
        "amount",
        "gateway",
        "status",
        "reference",
        "username",
        "UserId",
        "payid",
        "createdAt",
        "updatedAt",
      ],
      where,
      raw: true,
    };
    let result = [];
    PaymentView.findAndCountAll(query)
      .then((entries) => {
        const { count, rows } = entries;
        result = [...[count], ...rows];
        res.json(result);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route GET api/adminview/subscriptions
@desc Admin View subscriptions
@access private
*/

router.post(
  "/subscriptions/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }

    let limit = null,
      offset = 0,
      type = null,
      plan = null,
      search = null,
      user = null,
      ref = null,
      where = {};

    if (req.body.limit) limit = req.body.limit;
    if (req.body.offset) offset = req.body.offset;
    if (req.body.search) search = req.body.search;
    if (req.body.plan) plan = req.body.plan;
    if (req.body.type) type = req.body.type;
    if (req.body.user) user = parseInt(req.body.user);
    if (req.body.ref) ref = req.body.ref;

    if (plan !== null) {
      where = { ...where, ...{ plan } };
    }
    if (type !== null) {
      where = { ...where, ...{ type } };
    }
    if (search !== null) {
      const searchArray = search.split("+");
      if (searchArray.length > 1) {
        let newSearchArray = [],
          newSearchObj = {};
        for (let i = 0; i < searchArray.length; i++) {
          newSearchObj = {
            [Op.or]: [{ username: { [Op.substring]: searchArray[i] } }],
          };
          newSearchArray.push(newSearchObj);
        }
        where = { ...where, ...{ [Op.and]: newSearchArray } };
      } else {
        let searchTerms = searchArray[0];
        where = {
          ...where,
          ...{
            [Op.or]: [{ username: { [Op.substring]: searchTerms } }],
          },
        };
      }
    }

    if ((user !== null) & (ref !== null)) {
      let UserId = user;
      where = { ...where, ...{ UserId } };
    }

    const query = {
      order: [["subscriptionid", "DESC"]],
      offset: offset,
      limit: limit,
      attributes: [
        "subscriptionid",
        "amount",
        "type",
        "package",
        "status",
        "plan",
        "username",
        "userId",
        "createdAt",
      ],
      where,
      raw: true,
    };
    let result = [];
    SubscriptionView.findAndCountAll(query)
      .then((entries) => {
        const { count, rows } = entries;
        result = [...[count], ...rows];
        res.json(result);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route GET api/adminview/bonus
desc Admin View bonus
@access private
*/

router.post(
  "/bonus",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }

    let limit = null,
      offset = 0,
      status = null,
      search = null,
      user = null,
      ref = null,
      where = {};

    if (req.body.limit) limit = req.body.limit;
    if (req.body.offset) offset = req.body.offset;
    if (req.body.search) search = req.body.search;
    if (req.body.status) status = req.body.status;
    if (req.body.user) user = parseInt(req.body.user);
    if (req.body.ref) ref = req.body.ref;

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
            [Op.or]: [
              { username: { [Op.substring]: searchArray[i] } },
              { payer: { [Op.substring]: searchArray[i] } },
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
              { username: { [Op.substring]: searchTerms } },
              { payer: { [Op.substring]: searchTerms } },
            ],
          },
        };
      }
    }

    if ((user !== null) & (ref !== null)) {
      let UserId = user;
      where = { ...where, ...{ UserId } };
    }

    const query = {
      order: [["bonusid", "DESC"]],
      limit,
      offset,
      attributes: [
        "bonusid",
        "amount",
        "status",
        "username",
        "createdAt",
        "updatedAt",
        "UserId",
        "payerid",
        "payer",
      ],
      where,
      raw: true,
    };
    let result = [];
    BonusView.findAndCountAll(query)
      .then((entries) => {
        const { count, rows } = entries;
        result = [...[count], ...rows];
        res.json(result);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route GET api/adminview/signals
@desc Admin View signals
@access private
*/

router.post(
  "/signals",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }

    let limit = null,
      offset = 0,
      status = null,
      search = null,
      signaloption = null,
      where = {};

    if (req.body.limit) limit = req.body.limit;
    if (req.body.offset) offset = req.body.offset;
    if (req.body.search) search = req.body.search;
    if (req.body.status) status = req.body.status;
    if (req.body.signaloption) signaloption = req.body.signaloption;

    if (status !== null) {
      where = { ...where, ...{ status } };
    }
    if (signaloption !== null) {
      where = { ...where, ...{ signaloption } };
    }
    if (search !== null) {
      const searchArray = search.split("+");
      if (searchArray.length > 1) {
        let newSearchArray = [],
          newSearchObj = {};
        for (let i = 0; i < searchArray.length; i++) {
          newSearchObj = {
            [Op.or]: [
              { provider: { [Op.substring]: search } },
              { firstcurrency: { [Op.substring]: search } },
              { secondcurrency: { [Op.substring]: search } },
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
              { provider: { [Op.substring]: searchTerms } },
              { firstcurrency: { [Op.substring]: searchTerms } },
              { secondcurrency: { [Op.substring]: searchTerms } },
            ],
          },
        };
      }
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
        "startrange",
        "endrange",
      ],
      where,
      raw: true,
    };
    let result = [];
    SignalView.findAndCountAll(query)
      .then((entries) => {
        const { count, rows } = entries;
        result = [...[count], ...rows];
        res.json(result);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route GET api/adminview/users
desc Admin View Users
@access private
*/

router.post(
  "/users",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }

    let limit = null,
      offset = 0,
      premiumstatus = null,
      search = null,
      sp = null,
      ref = null,
      where = {};

    if (req.body.limit) limit = req.body.limit;
    if (req.body.offset) offset = req.body.offset;
    if (req.body.search) search = req.body.search;
    if (req.body.premiumstatus) premiumstatus = req.body.premiumstatus;
    if (req.body.sp) sp = parseInt(req.body.sp);
    if (req.body.ref) ref = req.body.ref;

    if (premiumstatus !== null) {
      where = { ...where, ...{ premiumstatus } };
    }
    if (search !== null) {
      const searchArray = search.split("+");
      if (searchArray.length > 1) {
        let newSearchArray = [],
          newSearchObj = {};
        for (let i = 0; i < searchArray.length; i++) {
          newSearchObj = {
            [Op.or]: [
              { username: { [Op.substring]: searchArray[i] } },
              { email: { [Op.substring]: searchArray[i] } },
              { fullname: { [Op.substring]: searchArray[i] } },
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
              { username: { [Op.substring]: searchTerms } },
              { email: { [Op.substring]: searchTerms } },
              { fullname: { [Op.substring]: searchTerms } },
            ],
          },
        };
      }
    }

    let result = [];
    if ((sp !== null) & (ref !== null)) {
      const userid = Preference.findAll({
        where: {
          [Op.or]: [
            { providers: null },
            {
              providers: { [Op.regexp]: sp },
            },
          ],
        },
        attributes: ["UserId"],
        raw: true,
      })
        .then((pr) => {
          let UserId = pr.UserId,
            idArray = [];
          for (let i = 0; i < pr.length; i++) {
            idArray.push(pr[i].UserId);
          }
          where = { ...where, ...{ UserId: idArray } };
          const query = {
            order: [["userid", "DESC"]],
            limit,
            offset,
            attributes: [
              "userid",
              "username",
              "email",
              "fullname",
              "userstatus",
              "premiumstatus",
            ],
            where,
            raw: true,
          };
          UserView.findAndCountAll(query)
            .then((entries) => {
              const { count, rows } = entries;
              result = [...[count], ...rows];
              return res.json(result);
            })
            .catch((err) => res.status(404).json(err));
        })
        .catch((err) => res.status(404).json(err));
    } else {
      const query = {
        order: [["userid", "DESC"]],
        limit,
        offset,
        attributes: [
          "userid",
          "username",
          "email",
          "fullname",
          "userstatus",
          "premiumstatus",
        ],
        where,
        raw: true,
      };
      UserView.findAndCountAll(query)
        .then((entries) => {
          const { count, rows } = entries;
          result = [...[count], ...rows];
          return res.json(result);
        })
        .catch((err) => res.status(404).json(err));
    }
  }
);

/*
@route GET api/adminview/admins/admin
desc Admin View Admins
@access private
*/

router.post(
  "/admins",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }

    let limit = null,
      offset = 0,
      status = null,
      search = null,
      table = null,
      user = null,
      ref = null,
      where = {};

    if (req.body.limit) limit = req.body.limit;
    if (req.body.offset) offset = req.body.offset;
    if (req.body.search) search = req.body.search;
    if (req.body.status) status = req.body.status;
    if (req.body.table) table = req.body.table;
    if (req.body.user) user = parseInt(req.body.user);
    if (req.body.ref) ref = req.body.ref;

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
            [Op.or]: [
              { username: { [Op.substring]: searchArray[i] } },
              { email: { [Op.substring]: searchArray[i] } },
              { fullname: { [Op.substring]: searchArray[i] } },
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
              { username: { [Op.substring]: searchTerms } },
              { email: { [Op.substring]: searchTerms } },
              { fullname: { [Op.substring]: searchTerms } },
            ],
          },
        };
      }
    }
    let UserId,
      providers,
      result = [],
      view;

    if ((user !== null) & (ref !== null)) {
      UserId = user;
      Preference.findOne({ where: { UserId }, attributes: ["providers"] })
        .then((sp) => {
          providers = sp.providers;
          where = { ...where, ...{ userid: providers } };
          const query = {
            order: [["userid", "DESC"]],
            offset,
            limit,
            attributes: ["userid", "username", "email", "fullname", "status"],
            where,
            raw: true,
          };
          ProviderView.findAndCountAll(query)
            .then((entries) => {
              const { count, rows } = entries;
              result = [...[count], ...rows];
              return res.json(result);
            })
            .catch((err) => res.status(404).json(err));
        })
        .catch((err) => res.status(404).json(err));
    } else {
      const query = {
        order: [["userid", "DESC"]],
        offset,
        limit,
        attributes: ["userid", "username", "email", "fullname", "status"],
        where,
        raw: true,
      };
      if (table === "providers") {
        view = ProviderView;
      } else if (table === "superadmin") {
        view = SuperView;
      }
      view
        .findAndCountAll(query)
        .then((entries) => {
          const { count, rows } = entries;
          result = [...[count], ...rows];
          return res.json(result);
        })
        .catch((err) => res.status(404).json(err));
    }
  }
);

/*
@route POST api/adminview/currency
desc Admin View Currency
@access private
*/

router.post(
  "/currency",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }

    let limit = null,
      offset = 0,
      status = null,
      search = null,
      user = null,
      ref = null,
      where = {};

    if (req.body.limit) limit = req.body.limit;
    if (req.body.offset) offset = req.body.offset;
    if (req.body.search) search = req.body.search;
    if (req.body.status) status = req.body.status;
    if (req.body.user) user = parseInt(req.body.user);
    if (req.body.ref) ref = req.body.ref;

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
            [Op.or]: [
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
    let UserId,
      currencies,
      result = [];
    if ((user !== null) & (ref !== null)) {
      UserId = user;
      Preference.findOne({ where: { UserId }, attributes: ["currencies"] })
        .then((sp) => {
          currencies = sp.currencies;
          where = { ...where, ...{ id: currencies } };
          Currency.findAndCountAll({
            order: [["id", "DESC"]],
            offset,
            limit,
            where,
            include: [{ model: User, attributes: ["username"] }],
          })
            .then((entries) => {
              const { count, rows } = entries;
              result = [...[count], ...rows];
              return res.json(result);
            })
            .catch((err) => res.status(404).json(err));
        })
        .catch((err) => res.status(404).json(err));
    } else {
      Currency.findAndCountAll({
        order: [["id", "DESC"]],
        offset,
        limit,
        where,
        include: [{ model: User, attributes: ["username"] }],
      })
        .then((entries) => {
          const { count, rows } = entries;
          result = [...[count], ...rows];
          return res.json(result);
        })
        .catch((err) => res.status(404).json(err));
    }
  }
);

/*
@route GET api/admin/transactions
desc Admin View transactions
@access private
*/

router.post(
  "/transactions",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }

    let limit = null,
      offset = 0,
      type = null,
      method = null,
      search = null,
      user = null,
      ref = null,
      where = {};

    if (req.body.limit) limit = req.body.limit;
    if (req.body.offset) offset = req.body.offset;
    if (req.body.search) search = req.body.search;
    if (req.body.type) type = req.body.type;
    if (req.body.method) method = req.body.method;
    if (req.body.user) user = parseInt(req.body.user);
    if (req.body.ref) ref = req.body.ref;

    if (type !== null) {
      where = { ...where, ...{ type } };
    }
    if (method !== null) {
      where = { ...where, ...{ method } };
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
                fullname: { [Op.substring]: searchArray[i] },
              },
              {
                username: { [Op.substring]: searchArray[i] },
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
                fullname: { [Op.substring]: searchTerms },
              },
              {
                username: { [Op.substring]: searchTerms },
              },
            ],
          },
        };
      }
    }

    if ((user !== null) & (ref !== null)) {
      let UserId = user;
      where = { ...where, ...{ UserId } };
    }

    const query = {
      order: [["transactionid", "DESC"]],
      offset,
      limit,
      attributes: [
        "transactionid",
        "amount",
        "fullname",
        "UserId",
        "username",
        "createdAt",
        "type",
        "method",
      ],
      where,
      raw: true,
    };
    let result = [];
    TransactionView.findAndCountAll(query)
      .then((entries) => {
        const { count, rows } = entries;
        result = [...[count], ...rows];
        res.json(result);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route GET api/adminview/premium
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

    let where = {};
    where.premiumstatus = "a";

    UserView.findAll(where)
      .then((users) => {
        res.json(users);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route GET api/adminview/bonus/:id
@desc Admin view each Bonus
@access private


router.get(
  "/bonus/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }

    const bonusid = req.params.id;
    BonusView.findByPk(bonusid)
      .then((bonus) => {
        const content = {},
          subId = bonus.SubscriptionId;
        content.bonus = bonus;
        SubscriptionView.findByPk(subId)
          .then((sub) => {
            content.subscription = sub;
            res.json(content);
          })
          .catch((err) => res.status(404).json(err));
      })
      .catch((err) => res.status(404).json(err));
  }
);
*/
/*
@route GET api/adminview/subscription/:id
@desc Admin view each Subscription
@access private


router.get(
  "/subscription/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }

    const subId = req.params.id;
    SubscriptionView.findByPk(subId)
      .then((sub) => {
        const content = {},
          subtype = sub.type;
        content.sub = sub;
        if (subtype === "p") {
          Subscription.findByPk(subId, { attributes: ["payID"] })
            .then((subpay) => {
              let id = subpay.payID;
              Payment.findByPk(id)
                .then((pay) => {
                  content.pay = pay;
                  return res.json(content);
                })
                .catch((err) => res.status(404).json(err));
            })
            .catch((err) => res.status(404).json(err));
        } else {
          return res.json(content);
        }
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route GET api/adminview/user/:id
@desc Admin view user details
@access private


router.get(
  "/user/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    const UserId = req.params.id;
    Promise.all([
      UserView.findByPk(UserId)
        .then((user) => {
          const content = {};
          content.user = user;
          Subscription.count({ where: { UserId } })
            .then((sub) => {
              content.sub = sub;
              Transaction.count({ where: { UserId } })
                .then((trans) => {
                  content.trans = trans;
                  Bonus.count({ where: { UserId } })
                    .then((bonus) => {
                      content.bonus = bonus;
                      Payment.count({ where: { UserId } })
                        .then((pay) => {
                          content.pay = pay;
                          Referral.count({ where: { referral: UserId } })
                            .then((ref) => {
                              content.ref = ref;
                              return res.json(content);
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


@route GET api/adminview/user/transactions/:id
@desc Admin view transactions
@access private


router.get(
  "/user/transactions/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    const UserId = req.params.id;
    Transaction.findAll({ where: { UserId } })
      .then((trans) => {
        return res.json(trans);
      })

      .catch((err) => res.status(404).json(err));
  }
);


@route GET api/adminview/user/subscriptions/:id
@desc Admin view subscriptions
@access private


router.get(
  "/user/subscriptions/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    const UserId = req.params.id;
    Subscription.findAll({ where: { UserId } })
      .then((sub) => {
        return res.json(sub);
      })

      .catch((err) => res.status(404).json(err));
  }
);


@route GET api/adminview/user/payments/:id
@desc Admin view User Payments
@access private


router.get(
  "/user/payments/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    const UserId = req.params.id;
    Payment.findAll({ where: { UserId } })
      .then((pay) => {
        return res.json(pay);
      })

      .catch((err) => res.status(404).json(err));
  }
);

/*
@route GET api/adminview/user/bonus/:id
@desc Admin view Bonus
@access private


router.get(
  "/user/bonus/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    const UserId = req.params.id;
    Bonus.findAll({ where: { UserId } })
      .then((bonus) => {
        return res.json(bonus);
      })

      .catch((err) => res.status(404).json(err));
  }
);


@route GET api/adminview/user/signals/:id
@desc Admin view signal
@access private


router.get(
  "/user/signals/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    const UserId = req.params.id;
    Signal.findAll({ where: { UserId } })
      .then((signal) => {
        return res.json(signal);
      })

      .catch((err) => res.status(404).json(err));
  }
);
*/

/*
@route GET api/admin/referrals
desc Admin View referrals
@access private
*/

router.post(
  "/referrals",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }

    let limit = null,
      offset = 0,
      type = null,
      method = null,
      search = null,
      user = null,
      ref = null,
      where = {};

    if (req.body.limit) limit = req.body.limit;
    if (req.body.offset) offset = req.body.offset;
    if (req.body.search) search = req.body.search;
    if (req.body.type) type = req.body.type;
    if (req.body.method) method = req.body.method;
    if (req.body.user) user = parseInt(req.body.user);
    if (req.body.ref) ref = req.body.ref;

    if (type !== null) {
      where = { ...where, ...{ type } };
    }
    if (method !== null) {
      where = { ...where, ...{ method } };
    }
    if (search !== null) {
      const searchArray = search.split("+");
      if (searchArray.length > 1) {
        let newSearchArray = [],
          newSearchObj = {};
        for (let i = 0; i < searchArray.length; i++) {
          newSearchObj = {
            [Op.or]: [
              { referral: { [Op.substring]: searchArray[i] } },
              { referred: { [Op.substring]: searchArray[i] } },
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
              { referral: { [Op.substring]: searchTerms } },
              { referred: { [Op.substring]: searchTerms } },
            ],
          },
        };
      }
    }

    if ((user !== null) & (ref !== null)) {
      let UserId = user;
      where = { ...where, ...{ referralId: UserId } };
    }
    let result = [];
    ReferralView.findAndCountAll({
      where,
      order: [["id", "DESC"]],
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
@route GET api/adminview/accounts
desc Admin View User accounts
@access private
*/

router.post(
  "/accounts",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }

    let limit = null,
      offset = 0,
      search = null,
      user = null,
      ref = null,
      where = {};

    if (req.body.limit) limit = req.body.limit;
    if (req.body.offset) offset = req.body.offset;
    if (req.body.search) search = req.body.search;
    if (req.body.user) user = parseInt(req.body.user);
    if (req.body.ref) ref = req.body.ref;

    if (search !== null) {
      const searchArray = search.split("+");
      if (searchArray.length > 1) {
        let newSearchArray = [],
          newSearchObj = {};
        for (let i = 0; i < searchArray.length; i++) {
          newSearchObj = {
            [Op.or]: [
              {
                username: { [Op.substring]: searchArray[i] },
              },
              {
                fullname: { [Op.substring]: searchArray[i] },
              },
              {
                wallet: { [Op.substring]: searchArray[i] },
              },
              {
                accountnumber: { [Op.substring]: searchArray[i] },
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
                username: { [Op.substring]: searchTerms },
              },
              {
                fullname: { [Op.substring]: searchTerms },
              },
              {
                wallet: { [Op.substring]: searchTerms },
              },
              {
                accountnumber: { [Op.substring]: searchTerms },
              },
            ],
          },
        };
      }
    }

    if ((user !== null) & (ref !== null)) {
      let UserId = user;
      where = { ...where, ...{ UserId } };
    }

    const query = {
      order: [["accountid", "DESC"]],
      limit,
      offset,
      attributes: [
        "UserId",
        "username",
        "fullname",
        "accountnumber",
        "wallet",
        "createdAt",
        "updatedAt",
      ],
      where,
      raw: true,
    };
    let result = [];
    AccountView.findAndCountAll(query)
      .then((entries) => {
        const { count, rows } = entries;
        result = [...[count], ...rows];
        res.json(result);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route POST api/adminview/announcements
@desc Admin View Announcements
@access private
*/

router.post(
  "/announcements",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }

    let limit = null,
      offset = 0,
      search = null,
      user = null,
      ref = null,
      where = {};

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
                summary: { [Op.substring]: searchArray[i] },
              },
              {
                link: { [Op.substring]: searchArray[i] },
              },
              {
                title: { [Op.substring]: searchArray[i] },
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
                summary: { [Op.substring]: searchTerms },
              },
              {
                link: { [Op.substring]: searchTerms },
              },
              {
                title: { [Op.substring]: searchTerms },
              },
            ],
          },
        };
      }
    }

    let result = [];

    Announcement.findAndCountAll({
      order: [["id", "desc"]],
      limit,
      offset,
      include: [
        {
          model: User,
          attributes: ["username"],
          required: true,
        },
      ],
      where,
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
@route GET api/admin/withdrawals
desc Admin View withdrawals
@access private
*/

router.post(
  "/withdrawals",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }

    let limit = null,
      offset = 0,
      status = null,
      search = null,
      user = null,
      ref = null,
      where = {};

    if (req.body.limit) limit = req.body.limit;
    if (req.body.offset) offset = req.body.offset;
    if (req.body.search) search = req.body.search;
    if (req.body.status) status = req.body.status;
    if (req.body.user) user = parseInt(req.body.user);
    if (req.body.ref) ref = req.body.ref;

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
            [Op.or]: [
              {
                fullname: { [Op.substring]: searchArray[i] },
              },
              {
                username: { [Op.substring]: searchArray[i] },
              },
              {
                wallet: { [Op.substring]: searchArray[i] },
              },
              {
                accountnumber: { [Op.substring]: searchArray[i] },
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
                fullname: { [Op.substring]: searchTerms },
              },
              {
                username: { [Op.substring]: searchTerms },
              },
              {
                wallet: { [Op.substring]: searchTerms },
              },
              {
                accountnumber: { [Op.substring]: searchTerms },
              },
            ],
          },
        };
      }
    }

    if ((user !== null) & (ref !== null)) {
      let UserId = user;
      where = { ...where, ...{ UserId } };
    }

    const query = {
      order: [["withdrawalid", "DESC"]],
      offset,
      limit,
      attributes: [
        "withdrawalid",
        "fullname",
        "username",
        "UserId",
        "createdAt",
        "amount",
        "accountnumber",
        "wallet",
        "updatedAt",
        "status",
      ],
      where,
      raw: true,
    };
    let result = [];
    WithdrawalView.findAndCountAll(query)
      .then((entries) => {
        const { count, rows } = entries;
        result = [...[count], ...rows];
        res.json(result);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route GET api/admin/wallets
desc Admin View wallets
@access private
*/

router.post(
  "/wallets",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }

    let limit = null,
      offset = 0,
      status = null,
      search = null,
      user = null,
      ref = null,
      where = {};

    if (req.body.limit) limit = req.body.limit;
    if (req.body.offset) offset = req.body.offset;
    if (req.body.search) search = req.body.search;
    if (req.body.status) status = req.body.status;

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
            [Op.or]: [
              {
                wallet: { [Op.substring]: searchArray[i] },
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
                wallet: { [Op.substring]: searchTerms },
              },
            ],
          },
        };
      }
    }

    let result = [];
    Wallet.findAndCountAll({
      where,
      order: [["id", "DESC"]],
      limit,
      offset,
      attributes: ["id", "wallet", "status", "createdAt", "UserId"],
      include: [{ model: User, attributes: ["username"] }],
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
@route GET api/adminview/forums
@desc Admin View all forums
@access private
*/

router.post(
  "/forums",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }

    let limit = null,
      offset = 0,
      status = null,
      right = null,
      search = null,
      where = {},
      result = [];

    if (req.body.limit) limit = req.body.limit;
    if (req.body.offset) offset = req.body.offset;
    if (req.body.search) search = req.body.search;
    if (req.body.status) status = req.body.status;
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
@route GET api/adminview/forum/:id
@desc Admin View forum
@access private
*/

router.get(
  "/forum/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    let forumid = parseInt(req.params.id.split(":")[1]);

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
);

/*
@route GET api/adminview/bonus/:id
@desc Admin View bonus
@access private
*/

router.get(
  "/bonus/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    let bonusid = parseInt(req.params.id.split(":")[1]);

    let info = {},
      SubscriptionId = null;
    BonusView.findOne({ where: { bonusid } })
      .then((bonus) => {
        info.bonus = bonus;
        if (bonus === null) {
          return res.json(info);
        } else {
          SubscriptionId = bonus.SubscriptionId;
          Subscription.findByPk(SubscriptionId, {
            attributes: ["payID"],
          })
            .then((sub) => {
              let PayId = sub.payID;
              if (PayId === null) {
                return res.json(info);
              } else {
                Payment.findByPk(PayId, {
                  attributes: [
                    "amount",
                    "reference",
                    "status",
                    "gateway",
                    "createdAt",
                  ],
                })
                  .then((pay) => {
                    info.pay = pay;
                    return res.json(info);
                  })
                  .catch((err) => res.status(404).json(err));
              }
            })
            .catch((err) => res.status(404).json(err));
        }
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route GET api/adminview/admin/:id
@desc Admin View admin
@access private
*/

router.get(
  "/admin/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    let adminid = parseInt(req.params.id.split(":")[1]);

    let info = {};
    return Promise.all([
      User.findByPk(adminid, {
        attributes: ["id", "email", "username", "level", "createdAt", "status"],
        include: [
          { model: Profile, attributes: ["firstname", "lastname", "phone"] },
        ],
      })
        .then((user) => {
          if (user === null) {
            info.user = null;
            return res.json(info);
          } else {
            let level = user.level;
            if (level < 2) {
              info.user = null;
              return res.json(info);
            } else {
              info.user = user;
              if (level === 2) {
                Signal.count({
                  where: {
                    UserId: adminid,
                  },
                })
                  .then((signalcount) => {
                    info.signalcount = signalcount;
                    Preference.count({
                      where: {
                        providers: { [Op.regexp]: adminid },
                      },
                    })
                      .then((followerscount) => {
                        info.followerscount = followerscount;
                        return res.json(info);
                      })
                      .catch((err) => res.status(404).json(`P ${err}`));
                  })
                  .catch((err) => res.status(404).json(`S ${err}`));
              } else if (level === 3) {
                Currency.count({
                  where: {
                    UserId: adminid,
                  },
                })
                  .then((currencycount) => {
                    info.currencycount = currencycount;
                    return res.json(info);
                  })
                  .catch((err) => res.status(404).json(`C ${err}`));
              }
            }
          }
        })
        .catch((err) => res.status(404).json(`U ${err}`)),
    ]);
  }
);

/*
@route GET api/adminview/user/:id
@desc Admin View user
@access private
*/

router.get(
  "/user/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    let UserId = parseInt(req.params.id.split(":")[1]);

    let info = {};
    return Promise.all([
      User.findByPk(UserId, {
        attributes: ["id", "email", "username", "level", "createdAt", "status"],
        include: [
          { model: Profile, attributes: ["firstname", "lastname", "phone"] },
        ],
      })
        .then((user) => {
          if (user === null) {
            info.user = null;
            return res.json(info);
          } else {
            let level = user.level;
            if (level !== 1) {
              info.user = null;
              return res.json(info);
            } else {
              info.user = user;
              Subscription.count({ where: { UserId } })
                .then((sub) => {
                  info.sub = sub;
                  Bonus.sum("amount", {
                    where: {
                      UserId,
                      status: "a",
                    },
                  })
                    .then((bonus) => {
                      info.bonus = bonus;
                      Transaction.sum("amount", {
                        where: {
                          UserId,
                          type: "d",
                        },
                      })
                        .then((debit) => {
                          info.debit = debit;
                          Transaction.sum("amount", {
                            where: {
                              UserId,
                              type: "c",
                            },
                          })
                            .then((credit) => {
                              info.credit = credit;
                              Transaction.sum("amount", {
                                where: {
                                  UserId,
                                  method: "w",
                                },
                              })
                                .then((withdrawal) => {
                                  info.withdrawal = withdrawal;
                                  Premium.findOne({
                                    where: {
                                      UserId,
                                    },
                                    attributes: [
                                      "status",
                                      "startdate",
                                      "enddate",
                                    ],
                                  })
                                    .then((premiumstatus) => {
                                      info.premiumstatus = premiumstatus;
                                      Preference.findOne({
                                        where: {
                                          UserId,
                                        },
                                        attributes: [
                                          "currencies",
                                          "providers",
                                          "notify",
                                        ],
                                      })
                                        .then((preference) => {
                                          info.preference = preference;
                                          Payment.sum("amount", {
                                            where: {
                                              UserId,
                                              status: "s",
                                            },
                                          })
                                            .then((pay) => {
                                              info.pay = pay;
                                              Referral.count({
                                                where: {
                                                  referral: UserId,
                                                },
                                              })
                                                .then((referralcount) => {
                                                  info.referralcount =
                                                    referralcount;
                                                  ReferralView.findOne({
                                                    where: {
                                                      referredId: UserId,
                                                    },
                                                    attributes: [
                                                      "referral",
                                                      "referralid",
                                                    ],
                                                  })
                                                    .then((referredby) => {
                                                      info.referredby =
                                                        referredby;
                                                      Account.count({
                                                        where: {
                                                          UserId,
                                                        },
                                                      }).then(
                                                        (accountcount) => {
                                                          info.accountcount =
                                                            accountcount;
                                                          return res.json(info);
                                                        }
                                                      );
                                                    })
                                                    .catch((err) =>
                                                      res
                                                        .status(404)
                                                        .json(`pay ${err}`)
                                                    );
                                                })
                                                .catch((err) =>
                                                  res.status(404).json(err)
                                                );
                                            })
                                            .catch((err) =>
                                              res.status(404).json(err)
                                            );
                                        })
                                        .catch((err) =>
                                          res.status(404).json(err)
                                        );
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
            }
          }
        })
        .catch((err) => res.status(404).json(`U ${err}`)),
    ]);
  }
);

module.exports = router;
