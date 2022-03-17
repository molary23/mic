const { DataTypes, Model } = require("sequelize");
sequelize = require("../../config/dbcon");

class TransactionView extends Model {}

TransactionView.init(
  {
    // Model attributes are defined here
    transactionid: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.DOUBLE,
    },
    type: {
      type: DataTypes.STRING(1), // Debit or Credit
    },
    method: {
      type: DataTypes.STRING(1),
    },
    fullname: {
      type: DataTypes.STRING(50),
    },
    username: {
      type: DataTypes.STRING(50),
    },
    transactiondate: {
      type: DataTypes.DATE,
    },
    UserId: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
  },
  {
    // don't forget to enable timestamps!
    timestamps: false,
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "TransactionView", // We need to choose the model name
  }
);
TransactionView.sync = () => Promise.resolve();
module.exports = TransactionView;
