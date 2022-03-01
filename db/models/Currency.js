const { DataTypes, Model } = require("sequelize");
sequelize = require("../../config/dbcon");

class Currency extends Model {}

Currency.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    firstcurrency: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    secondcurrency: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    currencypair: {
      type: DataTypes.JSON(),
      allowNull: false,
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
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
    modelName: "Currency", // We need to choose the model name
  }
);

module.exports = Currency;
