const { DataTypes, Model } = require("sequelize");
sequelize = require("../../config/dbcon");

class Subscription extends Model {}

Subscription.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.DOUBLE, // Bonus or Payment
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("b", "p"), // Bonus or Payment
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER, // Duration in days
      allowNull: false,
    },
    payID: {
      type: DataTypes.INTEGER.UNSIGNED, // Payment ID
    },
    plan: {
      type: DataTypes.ENUM("m", "y"), // Package Paid for
      allowNull: false,
    },
    package: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("a", "p", "r"), // Approved, Pending or Rejected
      defaultValue: "a",
    },
  },
  {
    // don't forget to enable timestamps!
    timestamps: true,

    // I want createdAt
    createdAt: true,
    // I want updatedAt
    updatedAt: true,
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Subscription", // We need to choose the model name
  }
);
module.exports = Subscription;
