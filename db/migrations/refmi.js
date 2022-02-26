("use strict");
sequelize = require("../../config/config");

const auto_created_model_table_name = "ReferralViews";
const view_name = "ReferralViews";
const original_query =
  "SELECT Referrals.id AS id, Referrals.referral AS referralId, Referrals.UserId AS referredId, (SELECT CONCAT(Profiles.firstname, ' ', Profiles.lastname) FROM Profiles WHERE Profiles.UserId = Referrals.referral) AS referral, CONCAT(Profiles.firstname, ' ' , Profiles.lastname) AS referred FROM Referrals INNER JOIN Profiles ON Referrals.UserId = Profiles.UserId";

const new_query =
  "SELECT Referrals.id AS id, Referrals.referral AS referralId, Referrals.UserId AS referredId, (SELECT CONCAT(Profiles.firstname, ' ', Profiles.lastname) FROM Profiles WHERE Profiles.UserId = Referrals.referral) AS referral, CONCAT(Profiles.firstname, ' ' , Profiles.lastname) AS referred FROM Referrals INNER JOIN Profiles ON Referrals.UserId = Profiles.UserId";
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
