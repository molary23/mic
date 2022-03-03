("use strict");
sequelize = require("../../config/config");

const auto_created_model_table_name = "WithdrawalViews";
const view_name = "WithdrawalViews";

const original_query = [
  "SELECT ",
  " Withdrawals.id AS withdrawalid, Withdrawals.amount, Withdrawals.account, Users.id AS userid, CONCAT(Profiles.firstname, ' ', Profiles.lastname) AS fullname,",
  "Users.username, Withdrawals.createdAt AS createdAt, Withdrawals.updatedAt AS updatedAt, Withdrawals.status AS status ",
  " FROM Withdrawals ",
  " INNER JOIN Users ",
  " ON Withdrawals.UserId = Users.id ",
  " INNER JOIN Profiles ",
  " ON Withdrawals.UserId = Profiles.UserId ",
].join("");

const new_query = [
  "SELECT ",
  " Withdrawals.id AS withdrawalid, Withdrawals.amount, Withdrawals.account, Users.id AS UserId, CONCAT(Profiles.firstname, ' ', Profiles.lastname) AS fullname,",
  "Users.username, Withdrawals.createdAt AS createdAt, Withdrawals.updatedAt AS updatedAt, Withdrawals.status AS status ",
  " FROM Withdrawals ",
  " INNER JOIN Users ",
  " ON Withdrawals.UserId = Users.id ",
  " INNER JOIN Profiles ",
  " ON Withdrawals.UserId = Profiles.UserId ",
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
