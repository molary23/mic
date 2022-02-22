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
    currency: {
      type: DataTypes.STRING(3),
      allowNull: false,
    },
    currencycode: {
      type: DataTypes.STRING(6),
      allowNull: false,
    },
    active: {
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
