("use strict");
sequelize = require("../../config/config");

const auto_created_model_table_name = "UserViews";
const view_name = "UserViews";

const original_query = [
  "SELECT ",
  " Users.id AS userid, Users.username, Users.email, CONCAT(Profiles.firstname, ' ' , Profiles.lastname) AS fullname, ",
  " CASE ",
  " WHEN Users.active = 0 THEN 'DISABLED' ",
  " WHEN Users.active = 1 THEN 'ENABLED' ",
  " END AS userstatus, ",
  " CASE ",
  " WHEN Premia.active = 0 THEN 'Unactive' ",
  " WHEN Premia.active = 1 THEN 'Active' ",
  " END AS premiumstatus ",
  " FROM Users ",
  " LEFT JOIN Profiles ",
  " ON Users.id = Profiles.UserId ",
  " LEFT JOIN Premia ",
  " ON Users.id = Premia.UserId ",
].join("");

const new_query = [
  "SELECT ",
  " Users.id AS userid, Users.username, Users.email, CONCAT(Profiles.firstname, ' ' , Profiles.lastname) AS fullname, ",
  " CASE ",
  " WHEN Users.active = 0 THEN 'DISABLED' ",
  " WHEN Users.active = 1 THEN 'ENABLED' ",
  " END AS userstatus, ",
  " CASE ",
  " WHEN Premia.active = 0 THEN 'Unactive' ",
  " WHEN Premia.active = 1 THEN 'Active' ",
  " END AS premiumstatus ",
  " FROM Users ",
  " LEFT JOIN Profiles ",
  " ON Users.id = Profiles.UserId ",
  " LEFT JOIN Premia ",
  " ON Users.id = Premia.UserId ",
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
