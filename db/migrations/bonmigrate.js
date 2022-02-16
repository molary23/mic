("use strict");
sequelize = require("../../config/config");

const auto_created_model_table_name = "BonusViews";
const view_name = "BonusViews";

const original_query = [
  "SELECT ",
  " Bonuses.id AS bonusid, Bonuses.amount, Bonuses.status, ",
  "CONCAT(Profiles.firstname, ' ' , Profiles.lastname) AS user, Bonuses.createdAt AS bonusdate ",
  " FROM Bonuses ",
  " LEFT JOIN Profiles ",
  " ON Bonuses.UserId = Profiles.UserId ",
].join("");

const new_query = [
  "SELECT ",
  " Bonuses.id AS bonusid, Bonuses.amount, Bonuses.status, ",
  "CONCAT(Profiles.firstname, ' ' , Profiles.lastname) AS user, Bonuses.createdAt AS bonusdate  ",
  " FROM Bonuses ",
  " LEFT JOIN Profiles ",
  " ON Bonuses.UserId = Profiles.UserId ",
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
