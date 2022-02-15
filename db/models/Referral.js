const { DataTypes, Model } = require("sequelize");
sequelize = require("../../config/dbcon");

class Referral extends Model {}

Referral.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    referral: {
      type: DataTypes.INTEGER,
    },
  },
  {
    // don't forget to enable timestamps!
    timestamps: true,

    // I want createdAt
    createdAt: "timeCreated",

    // I dont want updatedAt
    updatedAt: false,
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Referral", // We need to choose the model name
  }
);

module.exports = Referral;
