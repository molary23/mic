("use strict");
sequelize = require("../../config/config");

const auto_created_model_table_name = "SignalViews";
const view_name = "SignalViews";
const original_query =
  "SELECT Signals.id AS signalid, Signals.signaloption, Signals.takeprofit, Signals.stoploss, Signals.startrange, Signals.endrange, Signals.pip, Signals.status, Signals.createdAt, Signals.updatedAt, Currencies.firstcurrency, Currencies.secondcurrency, Users.username AS provider, Users.id FROM Signals INNER JOIN Users ON Users.id = Signals.UserId INNER JOIN Currencies ON Signals.UserId = Currencies.id";

const new_query =
  "SELECT Signals.id AS signalid, Signals.signaloption, Signals.takeprofit, Signals.stoploss, Signals.startrange, Signals.endrange, Signals.pip, Signals.status, Signals.createdAt, Signals.updatedAt, Currencies.firstcurrency, Currencies.secondcurrency, Users.username AS provider, Users.id FROM Signals INNER JOIN Users ON Users.id = Signals.UserId INNER JOIN Currencies ON Signals.UserId = Currencies.id";
module.exports = {
  up: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.sequelize
        .query(`CREATE OR REPLACE VIEW ${view_name} AS ${new_query}`)
        .then((result) => {
          return result;
        }),
    ]);
  },
  down: function (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.sequelize
        .query(`CREATE OR REPLACE VIEW ${view_name} AS ${original_query}`)
        .then((result) => {
          return result;
        }),
    ]);
  },
};
