const { DataTypes, Model } = require("sequelize");
sequelize = require("../../config/dbcon");

class Account extends Model {}

Account.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    accountnumber: {
      type: DataTypes.STRING(50),
      allowNull: false,
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
    modelName: "Account", // We need to choose the model name
  }
);

module.exports = Account;
