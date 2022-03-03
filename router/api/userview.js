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
  Pass = require("../../db/models/Pass"),
  Referral = require("../../db/models/Referral"),
  Profile = require("../../db/models/Profile"),
  Premium = require("../../db/models/Premium"),
  Payment = require("../../db/models/Payment"),
  Subscription = require("../../db/models/Subscription"),
  Bonus = require("../../db/models/Bonus"),
  Withdrawal = require("../../db/models/Withdrawal"),
  // Bring in View
  SignalView = require("../../db/models/SignalView"),
  ReferralView = require("../../db/models/ReferralView"),
  UserView = require("../../db/models/UserView"),
  Transaction = require("../../db/models/Transaction"),
  // Bring in User Checker
  checkUser = require("../../validation/checkUser");
/*
@route GET api/view/payments
@desc User View Payments
@access private
*/

router.get(
  "/payments",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkUser(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    const UserId = req.user.id;
    Payment.findAll({
      where: {
        UserId,
      },
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
*/

router.get(
  "/subscriptions",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkUser(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    const UserId = req.user.id;
    Subscription.findAll(
      {
        where: {
          UserId,
        },
      },
      {
        include: [Payment],
      }
    )
      .then((sub) => {
        res.json(sub);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route GET api/user/bonus
desc User View bonus
@access private
*/

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
*/

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
);

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

        where = {
          [Op.and]: newSearchArray,
        };
      } else {
        let search = searchArray[0];

        where = {
          [Op.or]: [
            { provider: { [Op.substring]: search } },
            { firstcurrency: { [Op.substring]: search } },
            { secondcurrency: { [Op.substring]: search } },
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
      distinct: true,
      col: "CurrencyId",
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
            [Op.or]: [{ referred: { [Op.substring]: searchArray[i] } }],
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
              { referralId },
            ],
          };
        } else {
          where = {
            [Op.and]: [{ [Op.and]: newSearchArray }, { referral }],
          };
        }
      } else {
        let search = searchArray[0];
        if (req.body.status !== undefined) {
          where = {
            [Op.and]: [
              { referred: { [Op.substring]: search } },
              { status: req.body.status },
              { referralId },
            ],
          };
        } else {
          where = {
            [Op.and]: [
              { referred: { [Op.substring]: search } },
              { referralId },
            ],
          };
        }
      }
    } else if (req.body.status) {
      where = {
        [Op.and]: [{ status: req.body.status }, { referralId }],
      };
    } else {
      where = {
        referralId,
      };
    }
    let result = [];
    ReferralView.findAndCountAll({
      where,
      order: [["id", "desc"]],
      attributes: ["referredId", "referred", "phone", "status", "enddate"],
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
      package = null,
      type = null;

    if (req.body.limit) limit = req.body.limit;
    if (req.body.offset) offset = req.body.offset;
    if (req.body.status) status = req.body.status;
    if (req.body.subpackage) package = req.body.subpackage;
    if (req.body.type) type = req.body.type;

    let where = {};
    if (type && status === null && package === null) {
      where = {
        [Op.and]: [{ type }, { UserId }],
      };
    } else if (type && status && package === null) {
      where = {
        [Op.and]: [{ type }, { status: status }, { UserId }],
      };
    } else if (type === null && status === null && package) {
      where = {
        [Op.and]: [{ package }, { UserId }],
      };
    } else if (type && package && status === null) {
      where = {
        [Op.and]: [{ type }, { package }, { UserId }],
      };
    } else if (type === null && status && package === null) {
      where = {
        [Op.and]: [{ status }, { UserId }],
      };
    } else if (type === null && status && package) {
      where = {
        [Op.and]: [{ package }, { status }, { UserId }],
      };
    } else if (type && status && package) {
      where = {
        [Op.and]: [{ package }, { status }, { type }, { UserId }],
      };
    } else {
      where = {
        UserId,
      };
    }
    let result = [];
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
        "plan",
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
      type = null;

    if (req.body.limit) limit = req.body.limit;
    if (req.body.offset) offset = req.body.offset;
    if (req.body.method) method = req.body.method;
    if (req.body.type) type = req.body.type;

    let where = {};
    if (type && method === null) {
      where = {
        [Op.and]: [{ type }, { UserId }],
      };
    } else if (type === null && method) {
      where = {
        [Op.and]: [{ method }, { UserId }],
      };
    } else if (type && method) {
      where = {
        [Op.and]: [{ type }, { method }, { UserId }],
      };
    } else {
      where = {
        UserId,
      };
    }
    let result = [];
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
      gateway = null,
      status = null,
      search = null,
      offset = 0;

    if (req.body.limit) limit = req.body.limit;
    if (req.body.offset) offset = req.body.offset;
    if (req.body.gateway) gateway = req.body.gateway;
    if (req.body.status) status = req.body.status;
    if (req.body.search) search = req.body.search;

    let where = {};
    if (search) {
      const searchTerms = req.body.search;
      let searchArray = searchTerms.split("+");

      if (searchArray.length > 1) {
        let newSearchArray = [],
          newSearchObj = {};
        for (let i = 0; i < searchArray.length; i++) {
          newSearchObj = {
            [Op.or]: [{ reference: { [Op.substring]: searchArray[i] } }],
          };
          newSearchArray.push(newSearchObj);
        }

        if (status && gateway === null) {
          where = {
            [Op.and]: [
              {
                [Op.and]: newSearchArray,
              },
              { status },
              { UserId },
            ],
          };
        } else if (status === null && gateway) {
          where = {
            [Op.and]: [
              {
                [Op.and]: newSearchArray,
              },
              { gateway },
              { UserId },
            ],
          };
        } else {
          where = {
            [Op.and]: [{ [Op.and]: newSearchArray }, { UserId }],
          };
        }
      } else {
        let search = searchArray[0];
        if (status && gateway !== null) {
          where = {
            [Op.and]: [
              { reference: { [Op.substring]: search } },
              { status },
              { UserId },
            ],
          };
        }
        if (status !== null && gateway) {
          where = {
            [Op.and]: [
              { reference: { [Op.substring]: search } },
              { gateway },
              { UserId },
            ],
          };
        } else if (status && gateway) {
          where = {
            [Op.and]: [
              { reference: { [Op.substring]: search } },
              { gateway },
              { status },
              { UserId },
            ],
          };
        } else {
          where = {
            [Op.and]: [{ reference: { [Op.substring]: search } }, { UserId }],
          };
        }
      }
    } else if (status && gateway === null) {
      where = {
        [Op.and]: [{ status }, { UserId }],
      };
    } else if (status === null && gateway) {
      where = {
        [Op.and]: [{ gateway }, { UserId }],
      };
    } else if (status && gateway) {
      where = {
        [Op.and]: [{ status }, { gateway }, { UserId }],
      };
    } else {
      where = {
        UserId,
      };
    }
    let result = [];
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
      status = null;

    if (req.body.limit) limit = req.body.limit;
    if (req.body.offset) offset = req.body.offset;
    if (req.body.status) status = req.body.status;

    let where = {};
    if (status) {
      where = {
        [Op.and]: [{ status }, { UserId }],
      };
    } else {
      where = {
        UserId,
      };
    }
    let result = [];
    Withdrawal.findAndCountAll({
      where,
      order: [["id", "desc"]],
      attributes: ["amount", "account", "status", "createdAt", "updatedAt"],
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
@route GET api/user/bonus
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
      status = null;

    if (req.body.limit) limit = req.body.limit;
    if (req.body.offset) offset = req.body.offset;
    if (req.body.status) status = req.body.status;

    let where = {};
    if (status) {
      where = {
        [Op.and]: [{ status }, { UserId }],
      };
    } else {
      where = {
        UserId,
      };
    }
    let result = [];
    Bonus.findAndCountAll({
      where,
      order: [["id", "desc"]],
      attributes: [
        "amount",
        "status",
        "createdAt",
        "updatedAt",
        "subscriptionid",
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
module.exports = router;
