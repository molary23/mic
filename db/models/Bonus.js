const { DataTypes, Model } = require("sequelize");
sequelize = require("../../config/dbcon");

class Bonus extends Model {}

Bonus.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    UserId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("a", "p", "r"), // approved, pending, rejected
      defaultValue: "p",
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
    modelName: "Bonus", // We need to choose the model name
  }
);

module.exports = Bonus;
