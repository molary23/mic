("use strict");
sequelize = require("../../config/config");

const auto_created_model_table_name = "ViewSignals";
const view_name = "ViewSignals";
const original_query =
  "SELECT Signals.signaloption, Signals.takeprofit, Signals.stoploss, Signals.startrange, Signals.endrange, Signals.pip, Signals.status, Signals.timecreated, Signals.timeupdated, Currencies.currency, CONCAT(Profiles.firstname, ' ' , Profiles.lastname) AS providername, Users.email AS provideremail FROM Signals INNER JOIN Users ON Users.id = Signals.UserId INNER JOIN Profiles ON Signals.UserId = Profiles.UserId INNER JOIN Currencies ON Signals.CurrencyId = Currencies.id  ";

const new_query =
  "SELECT Signals.signaloption, Signals.takeprofit, Signals.stoploss, Signals.startrange, Signals.endrange, Signals.pip, Signals.status, Signals.timecreated, Signals.timeupdated, Currencies.currency, CONCAT(Profiles.firstname, ' ' , Profiles.lastname) AS providername, Users.email AS provideremail FROM Signals INNER JOIN Users ON Users.id = Signals.UserId INNER JOIN Profiles ON Signals.UserId = Profiles.UserId INNER JOIN Currencies ON Signals.CurrencyId = Currencies.id  ";
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
