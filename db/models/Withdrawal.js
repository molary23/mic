const { DataTypes, Model } = require("sequelize");
sequelize = require("../../config/dbcon");

class Withdrawal extends Model {}

Withdrawal.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.ENUM("b", "c"),
      allowNull: false,
    },
    account: {
      type: DataTypes.JSON(),
      allowNull: false,
    },
  },
  {
    // don't forget to enable timestamps!
    timestamps: true,

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
