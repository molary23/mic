const { DataTypes, Model } = require("sequelize");
sequelize = require("../config/dbcon");

class Payment extends Model {}

Payment.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },

    amount: {
      type: DataTypes.DOUBLE, // Sub active or not
      allowNull: false,
    },
    package: {
      type: DataTypes.TINYINT, // Package Paid for
      allowNull: false,
    },
    period: {
      type: DataTypes.INTEGER.UNSIGNED, // Sub active or not
      allowNull: false,
    },
    referencer: {
      type: DataTypes.STRING,
      allowNull: false,
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
    modelName: "Payment", // We need to choose the model name
  }
);
module.exports = Payment;
