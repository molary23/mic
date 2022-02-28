const { DataTypes, Model } = require("sequelize");
sequelize = require("../../config/dbcon");

class AccountView extends Model {}

AccountView.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM("b", "c"),
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
    updatedAt: {
      type: DataTypes.DATE,
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

module.exports = AccountView;
