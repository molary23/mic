("use strict");
sequelize = require("../../config/config");

const auto_created_model_table_name = "SubscriptionViews";
const view_name = "SubscriptionViews";

const original_query = [
  "SELECT ",
  " Subscriptions.id AS subscriptionid, Subscriptions.amount, Subscriptions.type, Subscriptions.duration, Subscriptions.package, Subscriptions.plan,Subscriptions.status,Subscriptions.UserId AS UserId, Users.username AS username, Subscriptions.PayID AS PayId,",
  " Subscriptions.createdAt AS createdAt ",
  " FROM Subscriptions ",
  " LEFT JOIN Users ",
  " ON Subscriptions.UserId = Users.id ",
].join("");

const new_query = [
  "SELECT ",
  " Subscriptions.id AS subscriptionid, Subscriptions.amount, Subscriptions.type, Subscriptions.duration, Subscriptions.package, Subscriptions.plan,Subscriptions.status,Subscriptions.UserId AS UserId, Users.username AS username,Subscriptions.PayID AS PayId,",
  " Subscriptions.createdAt AS createdAt ",
  " FROM Subscriptions ",
  " LEFT JOIN Users ",
  " ON Subscriptions.UserId = Users.id ",
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
