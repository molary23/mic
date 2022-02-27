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
    type: {
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
    updatedAt: true,
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Account", // We need to choose the model name
  }
);

module.exports = Account;
