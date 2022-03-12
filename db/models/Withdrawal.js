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
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    walletid: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    accountnumber: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("p", "r", "a"), // Pending, Rejected, Approved
      //allowNull: false,
      defaultValue: "p",
    },
  },
  {
    // don't forget to enable timestamps!
    timestamps: true,

    // I want createdAt
    createdAt: true,

    // I dont want updatedAt
    updatedAt: true,
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Withdrawal", // We need to choose the model name
  }
);

module.exports = Withdrawal;
