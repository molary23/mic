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
      type: DataTypes.TINYINT, // Duration in days
      defaultValue: 1,
    },
    user: {
      type: DataTypes.STRING(50), // Duration in days
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED, // Duration in days
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
