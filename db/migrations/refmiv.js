("use strict");
sequelize = require("../../config/config");

const auto_created_model_table_name = "ReferralViews";
const view_name = "ReferralViews";
const original_query =
  "SELECT Referrals.id AS id, Referrals.referral AS referralId, Referrals.UserId AS referredId, (SELECT Users.username FROM Users WHERE Users.id = Referrals.referral) AS referral, (SELECT Users.username FROM Users WHERE Users.id = Referrals.UserId) AS referred FROM Referrals";

const new_query =
  "SELECT Referrals.id AS id, Referrals.referral AS referralId, Referrals.UserId AS referredId, (SELECT Users.username FROM Users WHERE Users.id = Referrals.referral) AS referral, (SELECT Users.username FROM Users WHERE Users.id = Referrals.UserId) AS referred FROM Referrals";
module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.sequelize
        .query(`CREATE OR REPLACE VIEW ${view_name} AS ${new_query}`)
        .then((result) => {
          return result;
        }),
    ]);
  },
  down: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.sequelize
        .query(`CREATE OR REPLACE VIEW ${view_name} AS ${original_query}`)
        .then((result) => {
          return result;
        }),
    ]);
  },
};
