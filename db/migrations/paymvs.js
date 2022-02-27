("use strict");
sequelize = require("../../config/config");

const auto_created_model_table_name = "PaymentViews";
const view_name = "PaymentViews";

const original_query = [
  "SELECT ",
  " Payments.id AS payid, Payments.amount, Payments.reference, Payments.status, Payments.gateway, Users.id AS UserId,",
  "Users.username, Payments.createdAt AS createdAt, Payments.createdAt AS updatedAt ",
  " FROM Payments ",
  " INNER JOIN Users ",
  " ON Payments.UserId = Users.id ",
].join("");

const new_query = [
  "SELECT ",
  " Payments.id AS payid, Payments.amount, Payments.reference, Payments.status, Payments.gateway, Users.id AS UserId,",
  "Users.username, Payments.createdAt AS createdAt, Payments.createdAt AS updatedAt ",
  " FROM Payments ",
  " INNER JOIN Users ",
  " ON Payments.UserId = Users.id ",
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
