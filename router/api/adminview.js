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
  User = require("../../db/models/User"),
  Announcement = require("../../db/models/Announcement"),
  Forum = require("../../db/models/Forum"),
  ForumReply = require("../../db/models/ForumReply"),
  ReferralView = require("../../db/models/ReferralView"),
  ForumView = require("../../db/models/ForumView"),
  Transaction = require("../../db/models/Transaction"),
  TransactionView = require("../../db/models/TransactionView"),
  ProviderView = require("../../db/models/ProviderView"),
  Signal = require("../../db/models/Signal"),
  SignalView = require("../../db/models/SignalView"),
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
      offset = 0;

    if (req.body.limit) limit = req.body.limit;
    if (req.body.offset) offset = req.body.offset;

    let where = {};
    if (req.body.search !== undefined) {
      const searchTerms = req.body.search;
      let searchArray = searchTerms.split("+");

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

        if (req.body.status && req.body.gateway === undefined) {
          where = {
            [Op.and]: [
              {
                [Op.and]: newSearchArray,
              },
              { type: req.body.status },
            ],
          };
        } else if (req.body.status === undefined && req.body.gateway) {
          where = {
            [Op.and]: [
              {
                [Op.and]: newSearchArray,
              },
              { package: req.body.gateway },
            ],
          };
        } else if (req.body.status && req.body.gateway) {
          where = {
            [Op.and]: [
              {
                [Op.and]: newSearchArray,
              },
              {
                [Op.and]: [
                  { type: req.body.status },
                  { package: req.body.gateway },
                ],
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
        if (req.body.status && req.body.gateway === undefined) {
          where = {
            [Op.and]: [
              { user: { [Op.substring]: search } },
              { type: req.body.status },
            ],
          };
        } else if (req.body.status === undefined && req.body.gateway) {
          where = {
            [Op.and]: [
              { user: { [Op.substring]: search } },
              { package: req.body.gateway },
            ],
          };
        } else if (req.body.status && req.body.gateway) {
          where = {
            [Op.and]: [
              { user: { [Op.substring]: search } },
              {
                [Op.and]: [
                  { type: req.body.status },
                  { package: req.body.gateway },
                ],
              },
            ],
          };
        } else {
          where = {
            username: { [Op.substring]: search },
          };
        }
      }
    } else {
      if (req.body.status && req.body.gateway === undefined) {
        where.type = req.body.status;
      } else if (req.body.status === undefined && req.body.gateway) {
        where.gateway = req.body.gateway;
      } else if (req.body.status && req.body.gateway) {
        where = {
          [Op.and]: [{ type: req.body.status }, { gateway: req.body.gateway }],
        };
      }
    }

    const query = {
      order: [["payid", "DESC"]],
      offset,
      limit,
      attributes: [
        "payid",
        "amount",
        [
          Sequelize.literal(
            `CASE WHEN gateway = 'b' THEN 'BitPay' WHEN gateway = 's' THEN 'Stripe' END `
          ),
          "gateway",
        ],
        [
          Sequelize.literal(
            `CASE WHEN status = 0 THEN 'failed' WHEN status = 1 THEN 'successful' END`
          ),
          "status",
        ],
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
      offset = 0;

    if (req.body.limit) limit = req.body.limit;
    if (req.body.offset) offset = req.body.offset;

    let where = {};
    if (req.body.search !== undefined) {
      const searchTerms = req.body.search;
      let searchArray = searchTerms.split("+");

      if (searchArray.length > 1) {
        let newSearchArray = [],
          newSearchObj = {};
        for (let i = 0; i < searchArray.length; i++) {
          newSearchObj = { user: { [Op.substring]: searchArray[i] } };
          newSearchArray.push(newSearchObj);
        }

        if (req.body.type && req.body.subPackage === undefined) {
          where = {
            [Op.and]: [
              {
                [Op.and]: newSearchArray,
              },
              { type: req.body.type },
            ],
          };
        } else if (req.body.type === undefined && req.body.subPackage) {
          where = {
            [Op.and]: [
              {
                [Op.and]: newSearchArray,
              },
              { package: req.body.subPackage },
            ],
          };
        } else if (req.body.type && req.body.subPackage) {
          where = {
            [Op.and]: [
              {
                [Op.and]: newSearchArray,
              },
              {
                [Op.and]: [
                  { type: req.body.type },
                  { package: req.body.subPackage },
                ],
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
        if (req.body.type && req.body.subPackage === undefined) {
          where = {
            [Op.and]: [
              { user: { [Op.substring]: search } },
              { type: req.body.type },
            ],
          };
        } else if (req.body.type === undefined && req.body.subPackage) {
          where = {
            [Op.and]: [
              { user: { [Op.substring]: search } },
              { package: req.body.subPackage },
            ],
          };
        } else if (req.body.type && req.body.subPackage) {
          where = {
            [Op.and]: [
              { user: { [Op.substring]: search } },
              {
                [Op.and]: [
                  { type: req.body.type },
                  { package: req.body.subPackage },
                ],
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
      if (req.body.type && req.body.subPackage === undefined) {
        where.type = req.body.type;
      } else if (req.body.type === undefined && req.body.subPackage) {
        where.package = req.body.subPackage;
      } else if (req.body.type && req.body.subPackage) {
        where = {
          [Op.and]: [{ type: req.body.type }, { package: req.body.subPackage }],
        };
      }
    }

    const query = {
      order: [["subscriptionid", "DESC"]],
      offset: offset,
      limit: limit,
      attributes: [
        "subscriptionid",
        "amount",
        [
          Sequelize.literal(
            `CASE WHEN type = 'b' THEN 'Bonus' WHEN type = 'y' THEN 'Pay' END `
          ),
          "Payment Type",
        ],
        [
          Sequelize.literal(
            `CASE WHEN package = 'm' THEN 'Monthly' WHEN package = 'y' THEN 'Annual' END `
          ),
          "Package",
        ],
        [
          Sequelize.literal(
            `CASE WHEN status = 0 THEN 'Unapproved' WHEN status = 1 THEN 'Pending' WHEN status = 2 THEN 'Approved' END `
          ),
          "Status",
        ],
        "plan",
        "user",
        "userId",
        "subscriptiondate",
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
      offset = 0;

    if (req.body.limit) limit = req.body.limit;
    if (req.body.offset) offset = req.body.offset;

    let where = {};
    if (req.body.search) {
      const searchTerms = req.body.search;
      let searchArray = searchTerms.split("+");

      if (searchArray.length > 1) {
        let newSearchArray = [],
          newSearchObj = {};
        for (let i = 0; i < searchArray.length; i++) {
          newSearchObj = { username: { [Op.substring]: searchArray[i] } };
          newSearchArray.push(newSearchObj);
        }

        if (req.body.status) {
          where = {
            [Op.and]: [
              {
                [Op.and]: newSearchArray,
              },
              { userstatus },
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
              { username: { [Op.substring]: search } },
              { status: req.body.status },
            ],
          };
        } else {
          where = {
            username: { [Op.substring]: search },
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
      limit,
      offset,
      attributes: [
        "bonusid",
        "amount",
        "status",
        "username",
        "createdAt",
        "updatedAt",
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
      offset = 0;

    if (req.body.limit) limit = req.body.limit;
    if (req.body.offset) offset = req.body.offset;

    let where = {};
    if (req.body.search) {
      const searchTerms = req.body.search;
      let searchArray = searchTerms.split("+");

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
                firstcurrency: { [Op.substring]: searchArray[i] },
              },
              {
                secondcurrency: { [Op.substring]: searchArray[i] },
              },
            ],
          };
          newSearchArray.push(newSearchObj);
        }

        if (req.body.signaloption && req.body.status === undefined) {
          where = {
            [Op.and]: [
              {
                [Op.and]: newSearchArray,
              },
              { signaloption: req.body.signaloption },
            ],
          };
        } else if (req.body.signaloption === undefined && req.body.status) {
          where = {
            [Op.and]: [
              {
                [Op.and]: newSearchArray,
              },
              { status: req.body.status },
            ],
          };
        } else if (req.body.signaloption && req.body.status) {
          where = {
            [Op.and]: [
              {
                [Op.and]: newSearchArray,
              },
              {
                [Op.and]: [
                  { signaloption: req.body.signaloption },
                  { status: req.body.status },
                ],
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
        if (req.body.signaloption && req.body.status === undefined) {
          where = {
            [Op.and]: [
              {
                [Op.or]: [
                  { provider: { [Op.substring]: search } },
                  { firstcurrency: { [Op.substring]: search } },
                  { secondcurrency: { [Op.substring]: search } },
                ],
              },
              { signaloption: req.body.signaloption },
            ],
          };
        } else if (req.body.signaloption === undefined && req.body.status) {
          where = {
            [Op.and]: [
              {
                [Op.or]: [
                  { provider: { [Op.substring]: search } },
                  { firstcurrency: { [Op.substring]: search } },
                  { secondcurrency: { [Op.substring]: search } },
                ],
              },
              { status: req.body.status },
            ],
          };
        } else if (req.body.signaloption && req.body.status) {
          where = {
            [Op.and]: [
              {
                [Op.or]: [
                  { provider: { [Op.substring]: search } },
                  { firstcurrency: { [Op.substring]: search } },
                  { secondcurrency: { [Op.substring]: search } },
                ],
              },
              {
                [Op.and]: [
                  { signaloption: req.body.signaloption },
                  { status: req.body.status },
                ],
              },
            ],
          };
        } else {
          where = {
            [Op.or]: [
              { provider: { [Op.substring]: search } },
              { firstcurrency: { [Op.substring]: search } },
              { secondcurrency: { [Op.substring]: search } },
            ],
          };
        }
      }
    } else {
      if (req.body.signaloption && req.body.status === undefined) {
        where.signaloption = req.body.signaloption;
      } else if (req.body.signaloption === undefined && req.body.status) {
        where.status = req.body.status;
      } else if (req.body.signaloption && req.body.status) {
        where = {
          [Op.and]: [
            { signaloption: req.body.signaloption },
            { status: req.body.status },
          ],
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
        [
          Sequelize.literal(
            `CASE WHEN signaloption = 'b' THEN 'Buy' WHEN signaloption = 's' THEN 'Sell' END `
          ),
          "signaloption",
        ],
        [
          Sequelize.literal(
            `CASE WHEN status = 'f' THEN 'Filled' WHEN status = 'c' THEN 'Cancelled' END `
          ),
          "status",
        ],
        [Sequelize.literal(`CONCAT(startrange, ' - ', endrange)`), "range"],
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
      offset = 0;

    if (req.body.limit) limit = req.body.limit;
    if (req.body.offset) offset = req.body.offset;

    let where = {};
    if (req.body.search) {
      const searchTerms = req.body.search;
      let searchArray = searchTerms.split("+");

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
                email: { [Op.substring]: searchArray[i] },
              },
            ],
          };

          newSearchArray.push(newSearchObj);
        }

        if (req.body.userstatus && req.body.premiumstatus === undefined) {
          where = {
            [Op.and]: [
              {
                [Op.and]: newSearchArray,
              },
              { userstatus: req.body.userstatus },
            ],
          };
        } else if (
          req.body.userstatus === undefined &&
          req.body.premiumstatus
        ) {
          where = {
            [Op.and]: [
              {
                [Op.and]: newSearchArray,
              },
              { premiumstatus: req.body.premiumstatus },
            ],
          };
        } else if (req.body.userstatus && req.body.premiumstatus) {
          where = {
            [Op.and]: [
              {
                [Op.and]: newSearchArray,
              },
              {
                [Op.and]: [
                  { userstatus: req.body.userstatus },
                  { premiumstatus: req.body.premiumstatus },
                ],
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
        if (req.body.userstatus && req.body.premiumstatus === "") {
          where = {
            [Op.and]: [
              {
                [Op.or]: [
                  { fullname: { [Op.substring]: search } },
                  { email: { [Op.substring]: search } },
                  { username: { [Op.substring]: search } },
                ],
              },
              { userstatus: req.body.userstatus },
            ],
          };
        } else if (
          req.body.userstatus === undefined &&
          req.body.premiumstatus
        ) {
          where = {
            [Op.and]: [
              {
                [Op.or]: [
                  { fullname: { [Op.substring]: search } },
                  { email: { [Op.substring]: search } },
                  { username: { [Op.substring]: search } },
                ],
              },
              { premiumstatus: req.body.premiumstatus },
            ],
          };
        } else if (req.body.userstatus && req.body.premiumstatus) {
          where = {
            [Op.and]: [
              {
                [Op.or]: [
                  { user: { [Op.substring]: search } },
                  { email: { [Op.substring]: search } },
                  { username: { [Op.substring]: search } },
                ],
              },
              {
                [Op.and]: [
                  { userstatus: req.body.userstatus },
                  { premiumstatus: req.body.premiumstatus },
                ],
              },
            ],
          };
        } else {
          where = {
            [Op.or]: [
              { fullname: { [Op.substring]: search } },
              { email: { [Op.substring]: search } },
              { username: { [Op.substring]: search } },
            ],
          };
        }
      }
    } else {
      if (req.body.userstatus && req.body.premiumstatus === undefined) {
        where.userstatus = req.body.userstatus;
      } else if (req.body.userstatus === undefined && req.body.premiumstatus) {
        where.premiumstatus = req.body.premiumstatus;
      } else if (req.body.userstatus && req.body.premiumstatus) {
        where = {
          [Op.and]: [
            { userstatus: req.body.userstatus },
            { premiumstatus: req.body.premiumstatus },
          ],
        };
      }
    }

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
    let result = [];
    UserView.findAndCountAll(query)
      .then((entries) => {
        const { count, rows } = entries;
        result = [...[count], ...rows];
        res.json(result);
      })
      .catch((err) => res.status(404).json(err));
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
      table = "providers";
    if (req.body.table) table = req.body.table;
    if (req.body.limit) limit = req.body.limit;
    if (req.body.offset) offset = req.body.offset;

    let where = {};
    if (req.body.search) {
      const searchTerms = req.body.search;
      let searchArray = searchTerms.split("+");

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
              { status: req.body.status },
              {
                [Op.or]: [
                  { username: { [Op.substring]: search } },
                  { fullname: { [Op.substring]: search } },
                  { email: { [Op.substring]: search } },
                ],
              },
            ],
          };
        } else {
          where = {
            [Op.or]: [
              { username: { [Op.substring]: search } },
              { fullname: { [Op.substring]: search } },
              { email: { [Op.substring]: search } },
            ],
          };
        }
      }
    } else {
      if (req.body.status) {
        where.status = req.body.status;
      }
    }

    const query = {
      order: [["userid", "DESC"]],
      offset,
      limit,
      attributes: ["userid", "username", "email", "fullname", "status"],
      where,
      raw: true,
    };
    let result = [],
      view;
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
        res.json(result);
      })
      .catch((err) => res.status(404).json(err));
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
      offset = 0;

    if (req.body.limit) limit = parseInt(req.body.limit);
    if (req.body.offset) offset = parseInt(req.body.offset);

    let where = {};

    if (req.body.search !== undefined) {
      const searchTerms = req.body.search;
      let searchArray = searchTerms.split("+");

      if (searchArray.length > 1) {
        let newSearchArray = [],
          newSearchObj = {};
        for (let i = 0; i < searchArray.length; i++) {
          newSearchObj = {
            [Op.or]: [
              {
                firstcurrency: { [Op.substring]: searchArray[i] },
              },
              {
                secondcurrency: { [Op.substring]: searchArray[i] },
              },
            ],
          };
          newSearchArray.push(newSearchObj);
        }

        if (req.body.status !== undefined) {
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
        if (req.body.status !== undefined) {
          where = {
            [Op.and]: [
              {
                [Op.or]: [
                  { firstcurrency: { [Op.substring]: search } },
                  { secondcurrency: { [Op.substring]: search } },
                ],
              },
              { status: req.body.status },
            ],
          };
        } else {
          where = {
            [Op.or]: [
              { firstcurrency: { [Op.substring]: search } },
              { secondcurrency: { [Op.substring]: search } },
            ],
          };
        }
      }
    } else {
      if (req.body.status !== undefined) {
        where.status = req.body.status;
      }
    }

    let result = [];
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
        res.json(result);
      })
      .catch((err) => res.status(404).json(err));
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
      offset = 0;

    if (req.body.limit) limit = req.body.limit;
    if (req.body.offset) offset = req.body.offset;

    let where = {};
    if (req.body.search !== undefined) {
      const searchTerms = req.body.search;
      let searchArray = searchTerms.split("+");

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

        if (req.body.type && req.body.method === undefined) {
          where = {
            [Op.and]: [
              {
                [Op.and]: newSearchArray,
              },
              { type: req.body.type },
            ],
          };
        } else if (req.body.type === undefined && req.body.method) {
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
                [Op.and]: [
                  { type: req.body.type },
                  { method: req.body.method },
                ],
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
        if (req.body.type && req.body.method === undefined) {
          where = {
            [Op.and]: [
              {
                [Op.or]: [
                  { fullname: { [Op.substring]: search } },
                  { username: { [Op.substring]: search } },
                ],
              },
              { type: req.body.type },
            ],
          };
        } else if (req.body.type === undefined && req.body.method) {
          where = {
            [Op.and]: [
              {
                [Op.or]: [
                  { fullname: { [Op.substring]: search } },
                  { username: { [Op.substring]: search } },
                ],
              },
              { method: req.body.method },
            ],
          };
        } else if (req.body.type && req.body.method) {
          where = {
            [Op.and]: [
              {
                [Op.or]: [
                  { fullname: { [Op.substring]: search } },
                  { username: { [Op.substring]: search } },
                ],
              },
              {
                [Op.and]: [
                  { type: req.body.type },
                  { method: req.body.method },
                ],
              },
            ],
          };
        } else {
          where = {
            [Op.or]: [
              { fullname: { [Op.substring]: search } },
              { username: { [Op.substring]: search } },
            ],
          };
        }
      }
    } else {
      if (req.body.type && req.body.method === undefined) {
        where.type = req.body.type;
      } else if (req.body.type === undefined && req.body.method) {
        where.method = req.body.method;
      } else if (req.body.type && req.body.method) {
        where = {
          [Op.and]: [{ type: req.body.type }, { method: req.body.method }],
        };
      }
    }

    const query = {
      order: [["transactionid", "DESC"]],
      offset,
      limit,
      attributes: [
        "transactionid",
        "amount",
        "fullname",
        "userId",
        "username",
        "transactiondate",
        [
          Sequelize.literal(
            `CASE WHEN type = 'c' THEN 'Credit' WHEN type = 'd' THEN 'Debit' END `
          ),
          "type",
        ],
        [
          Sequelize.literal(
            `CASE WHEN method = 'b' THEN 'Bonus' WHEN method = 's' THEN 'Subscriptions' WHEN method = 'w' THEN 'Withdrawal' END `
          ),
          "method",
        ],
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

    let clause = {},
      where = {};
    where.premiumstatus = 2;
    clause = { where };

    UserView.findAll(clause)
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
*/

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

/*
@route GET api/adminview/subscription/:id
@desc Admin view each Subscription
@access private
*/

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
              let id = subpay;
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
*/

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

/*
@route GET api/adminview/user/transactions/:id
@desc Admin view transactions
@access private
*/

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

/*
@route GET api/adminview/user/subscriptions/:id
@desc Admin view subscriptions
@access private
*/

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

/*
@route GET api/adminview/user/payments/:id
@desc Admin view User Payments
@access private
*/

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
*/

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

/*
@route GET api/adminview/user/signals/:id
@desc Admin view signal
@access private
*/

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
      offset = 0;

    if (req.body.limit) limit = req.body.limit;
    if (req.body.offset) offset = req.body.offset;

    let where = {};
    if (req.body.search) {
      const searchTerms = req.body.search;
      let searchArray = searchTerms.split("+");

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
        where = {
          [Op.and]: newSearchArray,
        };
      } else {
        let search = searchArray[0];
        where = {
          [Op.or]: [
            { referral: { [Op.substring]: search } },
            { referred: { [Op.substring]: search } },
          ],
        };
      }
    }
    let result = [];
    ReferralView.findAndCountAll({
      where,
      order: [["id", "desc"]],
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
      offset = 0;

    if (req.body.limit) limit = req.body.limit;
    if (req.body.offset) offset = req.body.offset;

    let where = {};
    if (req.body.search) {
      const searchTerms = req.body.search;
      let searchArray = searchTerms.split("+");

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

        where = {
          [Op.and]: newSearchArray,
        };
      } else {
        let search = searchArray[0];
        where = {
          [Op.or]: [
            { fullname: { [Op.substring]: search } },
            { username: { [Op.substring]: search } },
            { wallet: { [Op.substring]: search } },
            { accountnumber: { [Op.substring]: search } },
          ],
        };
      }
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
      offset = 0;

    if (req.body.limit) limit = req.body.limit;
    if (req.body.offset) offset = req.body.offset;

    let where = {};
    if (req.body.search) {
      const searchTerms = req.body.search;
      let searchArray = searchTerms.split("+");

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
        where = {
          [Op.and]: newSearchArray,
        };
      } else {
        let search = searchArray[0];
        where = {
          [Op.or]: [
            {
              summary: { [Op.substring]: search },
            },
            {
              link: { [Op.substring]: search },
            },
            {
              title: { [Op.substring]: search },
            },
          ],
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
      search = null,
      status = null,
      offset = 0;

    if (req.body.limit) limit = req.body.limit;
    if (req.body.offset) offset = req.body.offset;
    if (req.body.search) search = req.body.search;
    if (req.body.status) status = req.body.status;

    let where = {};
    if (search) {
      let searchArray = search.split("+");

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

        if (status) {
          where = {
            [Op.and]: [
              {
                [Op.and]: newSearchArray,
              },
              { status },
            ],
          };
        } else {
          where = {
            [Op.and]: newSearchArray,
          };
        }
      } else {
        let search = searchArray[0];
        if (status) {
          where = {
            [Op.and]: [
              {
                [Op.or]: [
                  { fullname: { [Op.substring]: search } },
                  { username: { [Op.substring]: search } },
                  { wallet: { [Op.substring]: search } },
                  { accountnumber: { [Op.substring]: search } },
                ],
              },
              { status },
            ],
          };
        } else {
          where = {
            [Op.or]: [
              { fullname: { [Op.substring]: search } },
              { username: { [Op.substring]: search } },
              { wallet: { [Op.substring]: search } },
              { accountnumber: { [Op.substring]: search } },
            ],
          };
        }
      }
    } else {
      if (status) {
        where.status = status;
      }
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
      search = null,
      status = null,
      offset = 0;

    if (req.body.limit) limit = req.body.limit;
    if (req.body.offset) offset = req.body.offset;
    if (req.body.search) search = req.body.search;
    if (req.body.status) status = req.body.status;

    let where = {};
    if (search) {
      let searchArray = search.split("+");

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

        if (status) {
          where = {
            [Op.and]: [
              {
                [Op.and]: newSearchArray,
              },
              { status },
            ],
          };
        } else {
          where = {
            [Op.and]: newSearchArray,
          };
        }
      } else {
        let search = searchArray[0];
        if (status) {
          where = {
            [Op.and]: [
              {
                [Op.or]: [{ wallet: { [Op.substring]: search } }],
              },
              { status },
            ],
          };
        } else {
          where = {
            [Op.or]: [{ wallet: { [Op.substring]: search } }],
          };
        }
      }
    } else {
      if (status) {
        where.status = status;
      }
    }

    /* const query = {
      order: [["withdrawalid", "DESC"]],
      offset,
      limit,
      attributes: [
        "wallet",
        "status",
        "date created",
        "created by",
      ],
      where,
      raw: true,
    };*/
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
      gateway = null,
      status = null,
      search = null,
      offset = 0;

    if (req.body.limit) limit = req.body.limit;
    if (req.body.offset) offset = req.body.offset;
    if (req.body.right) right = req.body.right;
    if (req.body.status) status = req.body.status;
    if (req.body.search) search = req.body.search;
    let where = {};
    if (req.body.search !== undefined) {
      const searchTerms = req.body.search;
      let searchArray = searchTerms.split("+");

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

        if (req.body.right && req.body.status === undefined) {
          where = {
            [Op.and]: newSearchArray,

            status: req.body.status,
          };
        } else if (req.body.status === undefined && req.body.right) {
          where = {
            [Op.and]: newSearchArray,

            right: req.body.right,
          };
        } else if (req.body.status && req.body.right) {
          where = {
            [Op.and]: newSearchArray,

            [Op.and]: [{ status: req.body.status }, { right: req.body.right }],
          };
        } else {
          where = {
            [Op.and]: newSearchArray,
          };
        }
      } else {
        let search = searchArray[0];
        if (req.body.status && req.body.right === undefined) {
          where = {
            [Op.or]: [
              {
                title: { [Op.substring]: search },
              },
              {
                creator: { [Op.substring]: search },
              },

              {
                text: { [Op.substring]: search },
              },
            ],
            status: req.body.status,
          };
        } else if (req.body.status === undefined && req.body.right) {
          where = {
            [Op.or]: [
              {
                title: { [Op.substring]: search },
              },
              {
                creator: { [Op.substring]: search },
              },

              {
                text: { [Op.substring]: search },
              },
            ],
            right: req.body.right,
          };
        } else if (req.body.status && req.body.right) {
          where = {
            [Op.or]: [
              {
                title: { [Op.substring]: search },
              },
              {
                creator: { [Op.substring]: search },
              },

              {
                text: { [Op.substring]: search },
              },
            ],

            [Op.and]: [{ status: req.body.status }, { right: req.body.right }],
          };
        } else {
          where = {
            [Op.or]: [
              {
                title: { [Op.substring]: search },
              },
              {
                creator: { [Op.substring]: search },
              },

              {
                text: { [Op.substring]: search },
              },
            ],
          };
        }
      }
    } else if (req.body.status && req.body.right === undefined) {
      where = {
        status: req.body.status,
      };
    } else if (req.body.status === undefined && req.body.right) {
      where = {
        right: req.body.right,
      };
    } else if (req.body.status && req.body.right) {
      where = {
        [Op.and]: [{ status: req.body.status }, { right: req.body.right }],
      };
    } else {
      where = {};
    }

    let result = [];
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
    let forumid = req.params.id.split(":")[1];

    let post = {};
    Forum.findByPk(forumid, {
      include: [
        {
          model: User,
          attributes: ["username"],
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
              attributes: ["username"],
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

module.exports = router;
