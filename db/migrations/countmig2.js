("use strict");
sequelize = require("../../config/config");

const auto_created_model_table_name = "CountViews";
const view_name = "CountViews";

const original_query = [
  "SELECT ",
  "(SELECT COUNT(*) FROM Users WHERE level = 1) AS users, (SELECT COUNT(*) FROM Signals) AS signals, (SELECT COUNT(*) FROM Payments) AS payments, (SELECT COUNT(*) FROM Transactions) AS transactions, (SELECT COUNT(*) FROM Subscriptions) AS subscriptions, (SELECT COUNT(*) FROM Bonuses) AS bonus, (SELECT COUNT(*) FROM Users WHERE Users.level = 2) AS providers, (SELECT COUNT(*) FROM Referrals) AS referrals, (SELECT COUNT(*) FROM Currencies) AS currency, (SELECT COUNT(*) FROM Users WHERE level = 3) AS admins, (SELECT COUNT(*) FROM Accounts) AS accounts, (SELECT COUNT(*) FROM Announcements) AS announcements, (SELECT COUNT(*) FROM Withdrawals) AS withdrawals, (SELECT COUNT(*) FROM Wallets) AS wallets, (SELECT COUNT(*) FROM Forums) AS forums",
].join("");

const new_query = [
  "SELECT ",
  "(SELECT COUNT(*) FROM Users WHERE level = 1) AS users, (SELECT COUNT(*) FROM Signals) AS signals, (SELECT COUNT(*) FROM Payments) AS payments, (SELECT COUNT(*) FROM Transactions) AS transactions, (SELECT COUNT(*) FROM Subscriptions) AS subscriptions, (SELECT COUNT(*) FROM Bonuses) AS bonus, (SELECT COUNT(*) FROM Users WHERE Users.level = 2) AS providers, (SELECT COUNT(*) FROM Referrals) AS referrals, (SELECT COUNT(*) FROM Currencies) AS currency, (SELECT COUNT(*) FROM Users WHERE level = 3) AS admins, (SELECT COUNT(*) FROM Accounts) AS accounts, (SELECT COUNT(*) FROM Announcements) AS announcements, (SELECT COUNT(*) FROM Withdrawals) AS withdrawals, (SELECT COUNT(*) FROM Wallets) AS wallets, (SELECT COUNT(*) FROM Forums) AS forums",
].join("");
module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.sequelize
        .query(`DROP TABLE IF EXISTS ${auto_created_model_table_name}`)
        .then(() => {
          queryInterface.sequelize
            .query(`CREATE OR REPLACE VIEW ${view_name} AS ${new_query}`)
            .then((result) => {
              return result;
            });
        }),
    ]);
  },
  down: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.sequelize
        .query(`DROP TABLE IF EXISTS ${auto_created_model_table_name}`)
        .then(() => {
          queryInterface.sequelize
            .query(`CREATE OR REPLACE VIEW ${view_name} AS ${original_query}`)
            .then((result) => {
              return result;
            });
        }),
    ]);
  },
};
