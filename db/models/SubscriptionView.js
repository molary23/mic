const { DataTypes, Model } = require("sequelize");
sequelize = require("../../config/dbcon");

class SubscriptionView extends Model {}

SubscriptionView.init(
  {
    // Model attributes are defined here
    subscriptionid: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.DOUBLE, // Bonus or Payment
    },
    type: {
      type: DataTypes.STRING(1), // Bonus or Payment
    },
    duration: {
      type: DataTypes.INTEGER, // Duration in days
    },
    package: {
      type: DataTypes.STRING(1), // Package Paid for
    },
    plan: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
    },
    username: {
      type: DataTypes.STRING(30),
    },
    UserId: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
    PayId: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
  },
  {
    // don't forget to enable timestamps!
    timestamps: false,

    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "SubscriptionView", // We need to choose the model name
  }
);
SubscriptionView.sync = () => Promise.resolve();
module.exports = SubscriptionView;
