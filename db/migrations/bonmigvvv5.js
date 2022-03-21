("use strict");
sequelize = require("../../config/config");

const auto_created_model_table_name = "BonusViews";
const view_name = "BonusViews";

const original_query = [
  "SELECT ",
  " Bonuses.id AS bonusid, Bonuses.UserId, Bonuses.amount, Bonuses.status, ",
  "Users.username AS username, (SELECT Users.username FROM Users INNER JOIN Payments ON Users.id = Payments.UserId WHERE Payments.id = Bonuses.PaymentId) AS payer, (SELECT Users.id FROM Users INNER JOIN Payments ON Users.id = Payments.UserId WHERE Payments.id = Bonuses.PaymentId) AS payerid, Bonuses.createdAt, Bonuses.updatedAt, Bonuses.PaymentId ",
  " FROM Bonuses ",
  " LEFT JOIN Users ",
  " ON Bonuses.UserId = Users.id ",
].join("");

const new_query = [
  "SELECT ",
  " Bonuses.id AS bonusid, Bonuses.UserId, Bonuses.amount, Bonuses.status, ",
  "Users.username AS username, (SELECT Users.username FROM Users INNER JOIN Payments ON Users.id = Payments.UserId WHERE Payments.id = Bonuses.PaymentId) AS payer, (SELECT Users.id FROM Users INNER JOIN Payments ON Users.id = Payments.UserId WHERE Payments.id = Bonuses.PaymentId) AS payerid, Bonuses.createdAt, Bonuses.updatedAt, Bonuses.PaymentId ",
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
