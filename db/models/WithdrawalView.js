const { DataTypes, Model } = require("sequelize");
sequelize = require("../../config/dbcon");

class Withdrawal extends Model {}

Withdrawal.init(
  {
    // Model attributes are defined here
    withdrawalid: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    account: {
      type: DataTypes.JSON(),
      allowNull: false,
    },
    userid: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
    fullname: {
      type: DataTypes.STRING(50),
    },
    username: {
      type: DataTypes.STRING(30),
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updattedAt: {
      type: DataTypes.DATE,
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
    modelName: "Withdrawal", // We need to choose the model name
  }
);

module.exports = Withdrawal;
