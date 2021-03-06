("use strict");
sequelize = require("../../config/config");

const auto_created_model_table_name = "ForumViews";
const view_name = "ForumViews";

const original_query = [
  "SELECT ",
  " Forums.id AS id, Forums.title, Forums.text, Forums.status, Forums.right, ",
  " (SELECT  COUNT(*) FROM ForumReplies WHERE ForumReplies.ForumId = Forums.id) AS replycount, Forums.UserId, (SELECT Users.username FROM Users WHERE Forums.UserId = Users.id) AS creator, Forums.createdAt",
  " FROM Forums ",
  " LEFT JOIN ForumReplies ",
  " ON Forums.id = ForumReplies.ForumId ",
  " GROUP BY  Forums.id ",
].join("");

const new_query = [
  "SELECT ",
  " Forums.id AS id, Forums.title,  Forums.text, Forums.status, Forums.right, ",
  " (SELECT  COUNT(*) FROM ForumReplies WHERE ForumReplies.ForumId = Forums.id) AS replycount, Forums.UserId, (SELECT Users.username FROM Users WHERE Forums.UserId = Users.id) AS creator, Forums.createdAt",
  " FROM Forums ",
  " LEFT JOIN ForumReplies ",
  " ON Forums.id = ForumReplies.ForumId ",
  " GROUP BY  Forums.id ",
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
