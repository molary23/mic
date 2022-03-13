const { DataTypes, Model } = require("sequelize");
sequelize = require("../../config/dbcon");

class AccountView extends Model {}

AccountView.init(
  {
    // Model attributes are defined here
    accountid: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    accountnumber: {
      type: DataTypes.STRING(50),
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
    updatedAt: {
      type: DataTypes.DATE,
    },
    walletid: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    wallet: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  },
  {
    // don't forget to enable timestamps!
    timestamps: false,

    // I want createdAt
    createdAt: true,

    // I dont want updatedAt
    updatedAt: true,
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "AccountView", // We need to choose the model name
  }
);
AccountView.sync = () => Promise.resolve();
module.exports = AccountView;
