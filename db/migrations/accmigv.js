("use strict");
sequelize = require("../../config/config");

const auto_created_model_table_name = "AccountViews";
const view_name = "AccountViews";

const original_query = [
  "SELECT ",
  " Accounts.id AS accountid, Accounts.type, Accounts.account, Users.id AS userid, CONCAT(Profiles.firstname, ' ', Profiles.lastname) AS fullname,",
  "Users.username, Accounts.createdAt AS createdAt, Accounts.updatedAt AS updatedAt ",
  " FROM Accounts ",
  " INNER JOIN Users ",
  " ON Accounts.UserId = Users.id ",
  " INNER JOIN Profiles ",
  " ON Accounts.UserId = Profiles.UserId ",
].join("");

const new_query = [
  "SELECT ",
  " Accounts.id AS accountid, Accounts.type, Accounts.account, Users.id AS UserId, CONCAT(Profiles.firstname, ' ', Profiles.lastname) AS fullname,",
  "Users.username, Accounts.createdAt AS createdAt, Accounts.updatedAt AS updatedAt ",
  " FROM Accounts ",
  " INNER JOIN Users ",
  " ON Accounts.UserId = Users.id ",
  " INNER JOIN Profiles ",
  " ON Accounts.UserId = Profiles.UserId ",
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
