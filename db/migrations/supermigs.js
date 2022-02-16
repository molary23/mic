("use strict");
sequelize = require("../../config/config");

const auto_created_model_table_name = "SuperViews";
const view_name = "SuperViews";

const original_query = [
  "SELECT ",
  " Users.id AS userid, Users.username, Users.email, CONCAT(Profiles.firstname, ' ' , Profiles.lastname) AS fullname, Users.active AS userstatus",
  " FROM Users ",
  " LEFT JOIN Profiles ",
  " ON Users.id = Profiles.UserId ",
  "WHERE Users.level = 3",
].join("");

const new_query = [
  "SELECT ",
  " Users.id AS userid, Users.username, Users.email, CONCAT(Profiles.firstname, ' ' , Profiles.lastname) AS fullname, Users.active AS userstatus",
  " FROM Users ",
  " LEFT JOIN Profiles ",
  " ON Users.id = Profiles.UserId ",
  "WHERE Users.level = 3",
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
