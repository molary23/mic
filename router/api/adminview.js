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
  Payment = require("../../db/models/Payment"),
  Subscription = require("../../db/models/Subscription"),
  SubscriptionView = require("../../db/models/SubscriptionView"),
  Bonus = require("../../db/models/Bonus"),
  Referral = require("../../db/models/Referral"),
  ReferralView = require("../../db/models/ReferralView"),
  Transaction = require("../../db/models/Transaction"),
  TransactionView = require("../../db/models/TransactionView"),
  ProviderView = require("../../db/models/ProviderView"),
  Signal = require("../../db/models/Signal"),
  SignalView = require("../../db/models/SignalView"),
  BonusView = require("../../db/models/BonusView"),
  UserView = require("../../db/models/UserView"),
  SuperView = require("../../db/models/SuperView"),
  //Bring in Super Admin Checker
  checkSuperAdmin = require("../../validation/superCheck");

/*
@route GET api/adminview/payments
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
      offset = null;

    if (req.body.limit) limit = req.body.limit;
    if (req.body.offset) offset = req.body.offset;

    limit = req.body.limit;
    offset = req.body.offset;

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

    SubscriptionView.findAll(query)
      .then((sub) => {
        res.json(sub);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route GET api/adminview/bonus
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
            [Op.and]: [{ user: { [Op.substring]: search } }, { userstatus }],
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
            `CASE WHEN status = 1 THEN 'Pending' WHEN status = 0 THEN 'Unapproved' WHEN status = 2 THEN 'Approved' END `
          ),
          "Status",
        ],
        "user",
        "bonusdate",
      ],
      where,
      raw: true,
    };

    BonusView.findAll(query)
      .then((bonus) => {
        res.json(bonus);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route GET api/adminview/signals
@desc Admin View signals
@access private
*/

router.get(
  "/signals",
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
          newSearchObj = { providername: { [Op.substring]: searchArray[i] } };
          newSearchArray.push(newSearchObj);
        }

        if (req.body.signaloption && req.body.status === "") {
          where = {
            [Op.and]: [
              {
                [Op.and]: newSearchArray,
              },
              { signaloption: req.body.signaloption },
            ],
          };
        } else if (req.body.signaloption === "" && req.body.status) {
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
                [Op.or]: [
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
        if (req.body.signaloption && req.body.status === "") {
          where = {
            [Op.and]: [
              {
                [Op.or]: [
                  { providername: { [Op.substring]: search } },
                  { currency: { [Op.substring]: search } },
                  { provideremail: { [Op.substring]: search } },
                ],
              },
              { signaloption: req.body.signaloption },
            ],
          };
        } else if (req.body.signaloption === "" && req.body.status) {
          where = {
            [Op.and]: [
              {
                [Op.or]: [
                  { providername: { [Op.substring]: search } },
                  { currency: { [Op.substring]: search } },
                  { provideremail: { [Op.substring]: search } },
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
                  { providername: { [Op.substring]: search } },
                  { currency: { [Op.substring]: search } },
                  { provideremail: { [Op.substring]: search } },
                ],
              },
              {
                [Op.or]: [
                  { signaloption: req.body.signaloption },
                  { status: req.body.status },
                ],
              },
            ],
          };
        } else {
          where = {
            [Op.or]: [
              { providername: { [Op.substring]: search } },
              { currency: { [Op.substring]: search } },
              { provideremail: { [Op.substring]: search } },
            ],
          };
        }
      }
    } else {
      if (req.body.signaloption && req.body.status === "") {
        where.signaloption = req.body.signaloption;
      } else if (req.body.signaloption === "" && req.body.status) {
        where.status = req.body.status;
      } else if (req.body.signaloption && req.body.status) {
        where = {
          [Op.or]: [
            { signaloption: req.body.signaloption },
            { status: req.body.status },
          ],
        };
      }
    }

    const query = {
      order: [["signalid", "DESC"]],
      attributes: [
        "signalid",
        "currency",
        "takeprofit",
        "stoploss",
        "pip",
        "createdAt",
        "providername",
        "provideremail",
        [
          Sequelize.literal(
            `CASE WHEN signaloption = 'b' THEN 'Buy' WHEN signaloption = 's' THEN 'Sell' END `
          ),
          "Signal Option",
        ],
        [
          Sequelize.literal(
            `CASE WHEN status = 'f' THEN 'Filled' WHEN status = 'c' THEN 'Cancelled' END `
          ),
          "Signal Status",
        ],
        [
          Sequelize.literal(`CONCAT(startrange, ' - ', endrange)`),
          "Signal Range",
        ],
      ],
      where,
      raw: true,
    };

    SignalView.findAll(query)
      .then((signal) => {
        res.json(signal);
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
      offset = null;

    if (req.body.limit) limit = req.body.limit;
    if (req.body.offset) offset = req.body.offset;

    limit = req.body.limit;
    offset = req.body.offset;

    let where = {};
    if (req.body.search) {
      const searchTerms = req.body.search;
      let searchArray = searchTerms.split("+");

      if (searchArray.length > 1) {
        let newSearchArray = [],
          newSearchObj = {};
        for (let i = 0; i < searchArray.length; i++) {
          newSearchObj = {
            user: { [Op.substring]: searchArray[i] },
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
        [
          Sequelize.literal(
            `CASE WHEN userstatus = 1 THEN 'Deactivated' WHEN userstatus = 2 THEN 'Active' END `
          ),
          "userstatus",
        ],
        [
          Sequelize.literal(
            `CASE WHEN premiumstatus = 0 THEN 'New  User' WHEN premiumstatus = 1 THEN 'Not Subscribed' WHEN premiumstatus = 2 THEN 'Active' END `
          ),
          "premiumstatus",
        ],
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
@route GET api/adminview/admins/:table
desc Admin View Admins
@access private
*/

router.get(
  "/admins/:table",
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
          newSearchObj = {
            user: { [Op.substring]: searchArray[i] },
          };
          newSearchArray.push(newSearchObj);
        }

        if (req.body.userstatus) {
          where = {
            [Op.and]: [
              {
                [Op.and]: newSearchArray,
              },
              { userstatus: req.body.userstatus },
            ],
          };
        } else {
          where = {
            [Op.and]: newSearchArray,
          };
        }
      } else {
        let search = searchArray[0];
        if (req.body.userstatus) {
          where = {
            [Op.and]: [
              { user: { [Op.substring]: search } },
              { userstatus: req.body.userstatus },
            ],
          };
        } else {
          where = {
            user: { [Op.substring]: search },
          };
        }
      }
    } else {
      if (req.body.userstatus) {
        where.userstatus = req.body.userstatus;
      }
    }

    const query = {
      order: [["userid", "DESC"]],
      attributes: [
        "userid",
        "username",
        "email",
        "fullname",
        [
          Sequelize.literal(
            `CASE WHEN userstatus = 1 THEN 'Deactivated' WHEN userstatus = 2 THEN 'Active' END `
          ),
          "User Status",
        ],
      ],
      where,
      raw: true,
    };
    const table = req.params.table;
    let view;
    if (table === "providers") {
      view = ProviderView;
    } else if (table === "superadmin") {
      view = SuperView;
    }

    view
      .findAll(query)
      .then((user) => {
        res.json(user);
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
      offset = null;

    if (req.body.limit) limit = req.body.limit;
    if (req.body.offset) offset = req.body.offset;

    limit = req.body.limit;
    offset = req.body.offset;

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
              { user: { [Op.substring]: search } },
              { type: req.body.type },
            ],
          };
        } else if (req.body.type === undefined && req.body.method) {
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
                [Op.and]: [
                  { type: req.body.type },
                  { method: req.body.method },
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
      offset: offset,
      limit: limit,
      attributes: [
        "transactionid",
        "amount",
        [
          Sequelize.literal(
            `CASE WHEN type = 'c' THEN 'Credit' WHEN type = 'd' THEN 'Debit' END `
          ),
          "type",
        ],
        [
          Sequelize.literal(
            `CASE WHEN method = 'b' THEN 'Bonus' WHEN type = 's' THEN 'Subscribed' WHEN type = 'w' THEN 'Withdrawal' END `
          ),
          "method",
        ],
        "user",
        "userId",
        "transactiondate",
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

router.get(
  "/referrals",
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
    ReferralView.findAll({ where })
      .then((referrals) => {
        res.json(referrals);
      })
      .catch((err) => res.status(404).json(err));
  }
);

module.exports = router;
