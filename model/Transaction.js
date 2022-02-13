const { DataTypes, Model } = require("sequelize");
sequelize = require("../config/dbcon");

class Transaction extends Model {}

Transaction.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("d", "c"), // Debit or Credit
      allowNull: false,
    },
    method: {
      type: DataTypes.ENUM("b", "s", "w"),
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
    modelName: "Transaction", // We need to choose the model name
  }
);

module.exports = Transaction;
