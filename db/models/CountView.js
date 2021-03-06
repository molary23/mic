const { DataTypes, Model } = require("sequelize");
sequelize = require("../../config/dbcon");

class CountView extends Model {}

CountView.init(
  {
    // Model attributes are defined here
    users: {
      type: DataTypes.INTEGER,
    },
    signals: {
      type: DataTypes.INTEGER,
    },
    payments: {
      type: DataTypes.INTEGER,
    },
    transactions: {
      type: DataTypes.INTEGER,
    },
    subscriptions: {
      type: DataTypes.INTEGER,
    },
    bonus: {
      type: DataTypes.INTEGER,
    },
    providers: {
      type: DataTypes.INTEGER,
    },
    referrals: {
      type: DataTypes.INTEGER,
    },
    currency: {
      type: DataTypes.INTEGER,
    },
    admins: {
      type: DataTypes.INTEGER,
    },
    accounts: {
      type: DataTypes.INTEGER,
    },
    announcements: {
      type: DataTypes.INTEGER,
    },
    withdrawals: {
      type: DataTypes.INTEGER,
    },
    wallets: {
      type: DataTypes.INTEGER,
    },
    forums: {
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
    modelName: "CountView", // We need to choose the model name
  }
);
CountView.sync = () => Promise.resolve();
module.exports = CountView;
