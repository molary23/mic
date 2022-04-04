("use strict");
sequelize = require("../../config/config");

const auto_created_model_table_name = "AnalyticsViews";
const view_name = "AnalyticsViews";

const original_query = [
  "SELECT ",
  "(SELECT COUNT(*) FROM Premia WHERE Premia.status = 'a') AS premium, (SELECT COUNT(*) FROM Currencies WHERE Currencies.status = 'a') AS currencies, (SELECT COUNT(*) FROM Signals WHERE (CAST(Signals.createdAt AS date) = CURDATE())) AS signals, (SELECT COUNT(*) FROM Bonuses WHERE Bonuses.status = 'p') AS bonus, (SELECT COUNT(*) FROM Withdrawals WHERE Withdrawals.status = 'p' AND (CAST(Withdrawals.createdAt AS date) BETWEEN DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND CURDATE())) AS withdrawals, (SELECT COUNT(*) FROM Payments WHERE Payments.status = 's' AND (CAST(Payments.createdAt AS  date) BETWEEN DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND CURDATE())) AS payments, (SELECT COUNT(*) FROM Referrals WHERE (CAST(Referrals.createdAt AS date) = CURDATE())) AS referrals, (SELECT COUNT(*) FROM Transactions WHERE Transactions.type = 'c') AS credit, (SELECT COUNT(*) FROM Transactions WHERE Transactions.type = 'd') AS debit, (SELECT COUNT(*) FROM Subscriptions WHERE (CAST(Subscriptions.createdAt AS date) = CURDATE())) AS sub",
].join("");

const new_query = [
  "SELECT ",
  "(SELECT COUNT(*) FROM Premia WHERE Premia.status = 'a') AS premium, (SELECT COUNT(*) FROM Currencies WHERE Currencies.status = 'a') AS currencies, (SELECT COUNT(*) FROM Signals WHERE (CAST(Signals.createdAt AS date) = CURDATE())) AS signals, (SELECT COUNT(*) FROM Bonuses WHERE Bonuses.status = 'p') AS bonus, (SELECT COUNT(*) FROM Withdrawals WHERE Withdrawals.status = 'p' AND (CAST(Withdrawals.createdAt AS date) BETWEEN DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND CURDATE())) AS withdrawals, (SELECT COUNT(*) FROM Payments WHERE Payments.status = 's' AND (CAST(Payments.createdAt AS  date) BETWEEN DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND CURDATE())) AS payments, (SELECT COUNT(*) FROM Referrals WHERE (CAST(Referrals.createdAt AS date) = CURDATE())) AS referrals, (SELECT COUNT(*) FROM Transactions WHERE Transactions.type = 'c') AS credit, (SELECT COUNT(*) FROM Transactions WHERE Transactions.type = 'd') AS debit, (SELECT COUNT(*) FROM Subscriptions WHERE (CAST(Subscriptions.createdAt AS date) = CURDATE())) AS sub",
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
