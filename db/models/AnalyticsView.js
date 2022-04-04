const { DataTypes, Model } = require("sequelize");
sequelize = require("../../config/dbcon");

class AnalyticsView extends Model {}

AnalyticsView.init(
  {
    // Model attributes are defined here
    premium: {
      type: DataTypes.INTEGER,
    },
    currencies: {
      type: DataTypes.INTEGER,
    },
    signals: {
      type: DataTypes.INTEGER,
    },
    bonus: {
      type: DataTypes.INTEGER,
    },
    payments: {
      type: DataTypes.INTEGER,
    },
    bonus: {
      type: DataTypes.INTEGER,
    },
    withdrawals: {
      type: DataTypes.INTEGER,
    },
    referrals: {
      type: DataTypes.INTEGER,
    },
    debit: {
      type: DataTypes.INTEGER,
    },
    credit: {
      type: DataTypes.INTEGER,
    },
    sub: {
      type: DataTypes.INTEGER,
    },
  },
  {
    // don't forget to enable timestamps!
    timestamps: false,

    // I want createdAt
    createdAt: true,

    // I dont want updatedAt
    updatedAt: false,
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "AnalyticsView", // We need to choose the model name
  }
);
AnalyticsView.sync = () => Promise.resolve();
module.exports = AnalyticsView;
