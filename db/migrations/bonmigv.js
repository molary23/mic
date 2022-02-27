("use strict");
sequelize = require("../../config/config");

const auto_created_model_table_name = "BonusViews";
const view_name = "BonusViews";

const original_query = [
  "SELECT ",
  " Bonuses.id AS bonusid, Bonuses.amount, Bonuses.status, ",
  "Users.username AS username, Bonuses.createdAt, Bonuses.updatedAt, Bonuses.SubscriptionId ",
  " FROM Bonuses ",
  " LEFT JOIN Users ",
  " ON Bonuses.UserId = Users.id ",
].join("");

const new_query = [
  "SELECT ",
  " Bonuses.id AS bonusid, Bonuses.amount, Bonuses.status, ",
  "Users.username  AS username, Bonuses.createdAt, Bonuses.updatedAt, Bonuses.SubscriptionId  ",
  " FROM Bonuses ",
  " LEFT JOIN Users ",
  " ON Bonuses.UserId = Users.id ",
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
