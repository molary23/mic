const { DataTypes, Model } = require("sequelize");
sequelize = require("../../config/dbcon");

class Wallet extends Model {}

Wallet.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    wallet: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("a", "i"),
      defaultValue: "a",
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
    modelName: "Wallet", // We need to choose the model name
  }
);

module.exports = Wallet;
