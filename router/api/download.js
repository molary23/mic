const express = require("express"),
  router = express.Router(),
  passport = require("passport"),
  Sequelize = require("sequelize"),
  // Json2csvParser = require("json2csv").Parser,
  //{ parse } = require("json2csv"),
  { Parser } = require("json2csv"),
  { Op } = require("sequelize"),
  Transaction = require("../../db/models/Transaction"),
  Subscription = require("../../db/models/Subscription"),
  Currency = require("../../db/models/Currency"),
  Wallet = require("../../db/models/Wallet"),
  User = require("../../db/models/User"),
  WithdrawalView = require("../../db/models/WithdrawalView"),
  SubscriptionView = require("../../db/models/SubscriptionView"),
  TransactionView = require("../../db/models/TransactionView"),
  ProviderView = require("../../db/models/ProviderView"),
  ReferralView = require("../../db/models/ReferralView"),
  PaymentView = require("../../db/models/PaymentView"),
  SignalView = require("../../db/models/SignalView"),
  BonusView = require("../../db/models/BonusView"),
  UserView = require("../../db/models/UserView"),
  SuperView = require("../../db/models/SuperView"),
  AccountView = require("../../db/models/AccountView"),
  //Bring in Super Admin Checker
  checkSuperAdmin = require("../../validation/superCheck"),
  checkPr = require("../../validation/checkPr"),
  checkUser = require("../../validation/checkUser");

/*
@route GET api/download/sp
@desc Provider download rows in specified tables
@access private
*/

router.get(
  "/provider",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { error, isLevel } = checkPr(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }

    let providerid = req.user.id,
      where = { providerid };
    const query = {
      order: [["signalid", "ASC"]],
      attributes: [
        "firstcurrency",
        "secondcurrency",
        "takeprofit",
        "stoploss",
        "pip",
        [
          Sequelize.literal(
            `CASE WHEN signaloption = 'b' THEN 'buy instant' WHEN signaloption = 's' THEN 'sell instant' WHEN signaloption = 't' THEN 'sell stop' WHEN signaloption = 'c' THEN 'buy stop' WHEN signaloption = 'u' THEN 'sell limit' WHEN signaloption = 'd' THEN 'buy limit' END `
          ),
          "signaloption",
        ],
        [
          Sequelize.literal(
            `CASE WHEN status = 'c' THEN 'cancelled' WHEN status = 'f' THEN 'failed' WHEN status = 's' THEN 'successful' END `
          ),
          "status",
        ],
        "entry",
        "createdAt",
        "updatedAt",
        "comment",
      ],
      where,
      raw: true,
    };

    SignalView.findAll(query)
      .then((entries) => {
        // -> Convert JSON to CSV data
        const csvFields = [
          "Firstcurrency",
          "Secondcurrency",
          "Takeprofit",
          "Stoploss",
          "Pip",
          "Signaloption",
          "Status",
          "Entry",
          "CreatedAt",
          "UpdatedAt",
          "Comment",
        ];
        const tabledata = JSON.parse(JSON.stringify(entries));

        const parser = new Parser({ csvFields });
        const csv = parser.parse(tabledata);
        res.setHeader("Content-Disposition", "attachment;filename=signals.csv");
        res.setHeader("Content-Type", "application/octet-stream");

        res.status(200).end(csv);
      })
      .catch((err) => res.status(404).json(`H ${err}`));
  }
);

/*
@route GET api/download/user/:table
desc user download subscriptions
@access private
*/

router.get(
  "/user/:table",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkUser(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }

    let UserId = req.user.id,
      table = req.params.table.split(":")[1],
      where,
      view,
      attributes,
      csvFields,
      order;

    if (table === "subscriptions") {
      view = Subscription;
      where = { UserId };
      attributes = [
        "amount",
        [
          Sequelize.literal(
            `CASE WHEN type = 'b' THEN 'bonus' WHEN type = 'p' THEN 'payment' END `
          ),
          "type",
        ],

        [
          Sequelize.literal(
            `CASE WHEN plan = 'm' THEN 'monthly' WHEN plan = 'y' THEN 'annual' END `
          ),
          "plan",
        ],
        [
          Sequelize.literal(
            `CASE WHEN status = 'a' THEN 'approved' WHEN status = 'p' THEN 'pending' WHEN status = 'r' THEN 'rejected' END `
          ),
          "status",
        ],
        "package",
        "duration",
        "createdAt",
      ];
      order = [["id", "desc"]];
      csvFields = [
        "amount",
        "type",
        "plan",
        "status",
        "package",
        "duration",
        "createdAt",
      ];
    } else if (table === "transactions") {
      view = Transaction;
      where = { UserId };
      attributes = [
        "amount",
        [
          Sequelize.literal(
            `CASE WHEN type = 'c' THEN 'credit' WHEN type = 'd' THEN 'debit' END `
          ),
          "type",
        ],
        [
          Sequelize.literal(
            `CASE WHEN method = 'b' THEN 'bonus' WHEN method = 's' THEN 'subscription' WHEN method = 'w' THEN 'withdrawal' END `
          ),
          "method",
        ],
        "createdAt",
      ];
      order = [["id", "desc"]];
      csvFields = ["amount", "type", "method", "createdAt"];
    } else if (table === "referrals") {
      view = ReferralView;
      where = { referralId: UserId };
      attributes = ["referred", "phone"];
      order = [["id", "desc"]];
      csvFields = ["referred", "phone"];
    } else if (table === "bonus") {
      view = BonusView;
      where = { UserId };
      attributes = [
        "amount",
        [
          Sequelize.literal(
            `CASE WHEN status = 'a' THEN 'approved' WHEN status = 'p' THEN 'pending' WHEN status = 'r' THEN 'rejected' END `
          ),
          "status",
        ],
        "payer",
        "createdAt",
        "updatedAt",
      ];
      order = [["bonusid", "desc"]];
      csvFields = ["amount", "status", "payer", "createdAt", "updatedAt"];
    } else if (table === "payments") {
      view = Payment;
      where = { UserId };
      attributes = [
        "amount",
        "reference",
        [
          Sequelize.literal(
            `CASE WHEN gateway = 'c' THEN 'crypto' WHEN gateway = 'b' THEN 'bank' END `
          ),
          "gateway",
        ],
        [
          Sequelize.literal(
            `CASE WHEN status = 's' THEN 'successful' WHEN status = 'f' THEN 'failed' END `
          ),
          "status",
        ],
        "createdAt",
        "updatedAt",
      ];
      order = [["id", "desc"]];
      csvFields = [
        "amount",
        "reference",
        "gateway",
        "status",
        "createdAt",
        "updatedAt",
      ];
    } else if (table === "withdrawals") {
      view = WithdrawalView;
      where = { UserId };
      attributes = [
        "amount",
        "accountnumber",
        "wallet",
        [
          Sequelize.literal(
            `CASE WHEN status = 'a' THEN 'approved' WHEN status = 'p' THEN 'pending' WHEN status = 'r' THEN 'rejected' END `
          ),
          "status",
        ],
        "createdAt",
        "updatedAt",
      ];
      order = [["withdrawalid", "desc"]];
      csvFields = [
        "amount",
        "accountnumber",
        "wallet",
        "status",
        "createdAt",
        "updatedAt",
      ];
    }

    view
      .findAll({
        where,
        order,
        attributes,
      })
      .then((entries) => {
        const tabledata = JSON.parse(JSON.stringify(entries));

        const parser = new Parser({ csvFields });
        const csv = parser.parse(tabledata);
        res.setHeader("Content-Disposition", "attachment;filename=signals.csv");
        res.setHeader("Content-Type", "application/octet-stream");

        res.attachment("subscriptions.csv");
        res.status(200).end(csv);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route GET api/download/admin/:table
desc admin download subscriptions
@access private
*/

router.get(
  "/admin/:table",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }

    let UserId = req.user.id,
      table = req.params.table.split(":")[1],
      view,
      attributes,
      csvFields,
      order,
      include;

    if (table === "subscriptions") {
      view = SubscriptionView;
      attributes = [
        "amount",
        [
          Sequelize.literal(
            `CASE WHEN type = 'b' THEN 'bonus' WHEN type = 'p' THEN 'payment' END `
          ),
          "type",
        ],

        [
          Sequelize.literal(
            `CASE WHEN plan = 'm' THEN 'monthly' WHEN plan = 'y' THEN 'annual' END `
          ),
          "plan",
        ],
        [
          Sequelize.literal(
            `CASE WHEN status = 'a' THEN 'approved' WHEN status = 'p' THEN 'pending' WHEN status = 'r' THEN 'rejected' END `
          ),
          "status",
        ],
        "username",
        "package",
        "duration",
        "createdAt",
      ];
      order = [["subscriptionid", "desc"]];
      csvFields = [
        "amount",
        "type",
        "plan",
        "status",
        "username",
        "package",
        "duration",
        "createdAt",
      ];
    } else if (table === "transactions") {
      view = TransactionView;
      attributes = [
        "amount",
        "fullname",
        "username",
        [
          Sequelize.literal(
            `CASE WHEN type = 'c' THEN 'credit' WHEN type = 'd' THEN 'debit' END `
          ),
          "type",
        ],
        [
          Sequelize.literal(
            `CASE WHEN method = 'b' THEN 'bonus' WHEN method = 's' THEN 'subscription' WHEN method = 'w' THEN 'withdrawal' END `
          ),
          "method",
        ],
        "createdAt",
      ];
      order = [["transactionid", "desc"]];
      csvFields = [
        "amount",
        "fullname",
        "username",
        "type",
        "method",
        "createdAt",
      ];
    } else if (table === "referrals") {
      view = ReferralView;
      attributes = ["referred", "phone", "referral"];
      order = [["id", "desc"]];
      csvFields = ["referred", "phone", "referral"];
    } else if (table === "bonus") {
      view = BonusView;
      attributes = [
        "amount",
        [
          Sequelize.literal(
            `CASE WHEN status = 'a' THEN 'approved' WHEN status = 'p' THEN 'pending' WHEN status = 'r' THEN 'rejected' END `
          ),
          "status",
        ],
        "username",
        "payer",
        "createdAt",
        "updatedAt",
      ];
      order = [["bonusid", "desc"]];
      csvFields = [
        "amount",
        "status",
        "receiver",
        "payer",
        "createdAt",
        "updatedAt",
      ];
    } else if (table === "payments") {
      view = PaymentView;
      attributes = [
        "amount",
        "reference",
        [
          Sequelize.literal(
            `CASE WHEN gateway = 'c' THEN 'crypto' WHEN gateway = 'b' THEN 'bank' END `
          ),
          "gateway",
        ],
        [
          Sequelize.literal(
            `CASE WHEN status = 's' THEN 'successful' WHEN status = 'f' THEN 'failed' END `
          ),
          "status",
        ],
        "username",
        "createdAt",
        "updatedAt",
      ];
      order = [["payid", "desc"]];
      csvFields = [
        "Amount",
        "Reference",
        "Gateway",
        "Status",
        "Username",
        "Created At",
        "Updated At",
      ];
    } else if (table === "withdrawals") {
      view = WithdrawalView;

      attributes = [
        "fullname",
        "username",
        "amount",
        "accountnumber",
        "wallet",
        [
          Sequelize.literal(
            `CASE WHEN status = 'a' THEN 'approved' WHEN status = 'p' THEN 'pending' WHEN status = 'r' THEN 'rejected' END `
          ),
          "status",
        ],
        "createdAt",
        "updatedAt",
      ];
      order = [["withdrawalid", "desc"]];
      csvFields = [
        "fullname",
        "username",
        "amount",
        "accountnumber",
        "wallet",
        "status",
        "createdAt",
        "updatedAt",
      ];
    } else if (table === "signals") {
      view = SignalView;
      attributes = [
        "firstcurrency",
        "secondcurrency",
        "takeprofit",
        "stoploss",
        "pip",
        "provider",
        [
          Sequelize.literal(
            `CASE WHEN signaloption = 'b' THEN 'buy' WHEN signaloption = 's' THEN 'sell' END `
          ),
          "signaloption",
        ],
        [
          Sequelize.literal(
            `CASE WHEN status = 'c' THEN 'cancelled' WHEN status = 'f' THEN 'failed' WHEN status = 's' THEN 'successful' END `
          ),
          "status",
        ],
        "Entry",
        "createdAt",
        "updatedAt",
        "Comment",
      ];
      order = [["signalid", "desc"]];
      csvFields = [
        "Firstcurrency",
        "Secondcurrency",
        "Takeprofit",
        "Stoploss",
        "Pip",
        "Provider",
        "Signaloption",
        "Status",
        "Entry",
        "CreatedAt",
        "UpdatedAt",
        "Comment",
      ];
    } else if (table === "currencies") {
      view = Currency;
      attributes = [
        "firstcurrency",
        "secondcurrency",
        [
          Sequelize.literal(
            `CASE WHEN Currency.status = 'a' THEN 'active' WHEN Currency.status = 'i' THEN 'inactive' END `
          ),
          "status",
        ],
        "createdAt",
        "updatedAt",
      ];
      include = [{ model: User, attributes: ["username"] }];
      order = [["id", "desc"]];
      csvFields = [
        "Firstcurrency",
        "Secondcurrency",
        "Status",
        "CreatedAt",
        "UpdatedAt",
        "creator",
      ];
    } else if (table === "users") {
      view = UserView;
      attributes = [
        "username",
        "email",
        "fullname",
        [
          Sequelize.literal(
            `CASE WHEN premiumstatus = 'a' THEN 'active' WHEN premiumstatus = 'i' THEN 'inactive' WHEN premiumstatus = 'n' THEN 'new' END `
          ),
          "premiumstatus",
        ],
      ];
      order = [["userid", "desc"]];
      csvFields = ["username", "email", "fullname", "premium status"];
    } else if (table === "admins" || table === "providers") {
      view = table === "admins" ? SuperView : ProviderView;
      attributes = [
        "username",
        "email",
        "fullname",
        [
          Sequelize.literal(
            `CASE WHEN status = 'a' THEN 'active' WHEN status = 'i' THEN 'inactive' WHEN status = 'n' THEN 'new' END `
          ),
          "status",
        ],
      ];
      order = [["userid", "desc"]];
      csvFields = ["username", "email", "fullname", "status"];
    } else if (table === "accounts") {
      view = AccountView;
      attributes = [
        "username",
        "fullname",
        "wallet",
        "accountnumber",
        "createdAt",
        "updatedAt",
      ];
      order = [["accountid", "desc"]];
      csvFields = [
        "Username",
        "Fullname",
        "Wallet",
        "Account Number",
        "createdAt",
        "updatedAt",
      ];
    } else if (table === "wallets") {
      view = Wallet;
      attributes = [
        "wallet",
        [
          Sequelize.literal(
            `CASE WHEN Wallet.status = 'a' THEN 'active' WHEN Wallet.status = 'i' THEN 'inactive' END `
          ),
          "status",
        ],
        "createdAt",
      ];
      order = [["id", "desc"]];
      include = [{ model: User, attributes: ["username"] }];
      csvFields = ["wallet", "status", "createdAt", "Creator"];
    }

    view
      .findAll({
        order,
        attributes,
        include,
      })
      .then((entries) => {
        const tabledata = JSON.parse(JSON.stringify(entries));

        const parser = new Parser({ csvFields });
        const csv = parser.parse(tabledata);
        res.setHeader("Content-Disposition", "attachment;filename=signals.csv");
        res.setHeader("Content-Type", "application/octet-stream");

        // res.attachment("subscriptions.csv");
        res.status(200).end(csv);
      })
      .catch((err) => res.status(404).json(err));
  }
);

module.exports = router;
