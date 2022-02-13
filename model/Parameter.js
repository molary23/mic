const { DataTypes, Model } = require("sequelize");
sequelize = require("../config/dbcon");

class Parameter extends Model {}

Parameter.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    parameter: {
      type: DataTypes.ENUM("l", "p"), // Stop Loss or Take Profit
      allowNull: false,
    },
    figure: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  {
    // don't forget to enable timestamps!
    timestamps: true,

    // I want createdAt
    createdAt: false,

    // I dont want updatedAt
    updatedAt: true,
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Parameter", // We need to choose the model name
  }
);

module.exports = Parameter;
