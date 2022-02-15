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
    type: {
      type: DataTypes.ENUM("b", "p"), // Bonus or Payment
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER, // Duration in days
      allowNull: false,
    },
    payID: {
      type: DataTypes.INTEGER.UNSIGNED, // Duration in days
      allowNull: false,
    },
    status: {
      type: DataTypes.TINYINT, // Duration in days
      defaultValue: 1,
    },
  },
  {
    // don't forget to enable timestamps!
    timestamps: true,

    // I want createdAt
    createdAt: true,
    // I want updatedAt
    updatedAt: false,
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Subscription", // We need to choose the model name
  }
);
module.exports = Subscription;
