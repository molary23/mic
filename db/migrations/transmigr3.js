("use strict");
sequelize = require("../../config/config");

const auto_created_model_table_name = "TransactionViews";
const view_name = "TransactionViews";

const original_query = [
  "SELECT ",
  " Transactions.id AS transactionid, Transactions.amount, Transactions.type, Transactions.method,",
  "CONCAT(Profiles.firstname, ' ' , Profiles.lastname) AS fullname, Users.username as username, Transactions.createdAt AS createdAt, Profiles.UserId AS UserId",
  " FROM Transactions ",
  " LEFT JOIN Profiles ",
  " ON Transactions.UserId = Profiles.UserId ",
  " LEFT JOIN Users ",
  " ON Transactions.UserId = Users.id ",
].join("");

const new_query = [
  "SELECT ",
  " Transactions.id AS transactionid, Transactions.amount, Transactions.type, Transactions.method,",
  "CONCAT(Profiles.firstname, ' ' , Profiles.lastname) AS fullname, Users.username as username, Transactions.createdAt AS createdAt, Profiles.UserId AS UserId",
  " FROM Transactions ",
  " LEFT JOIN Profiles ",
  " ON Transactions.UserId = Profiles.UserId ",
  " LEFT JOIN Users ",
  " ON Transactions.UserId = Users.id ",
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
