const { DataTypes, Model } = require("sequelize");
sequelize = require("../../config/dbcon");

class Preference extends Model {}

Preference.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    currencies: {
      type: DataTypes.STRING(),
    },
    providers: {
      type: DataTypes.STRING(),
    },
    notify: {
      type: DataTypes.ENUM("y", "n"),
      defaultValue: "y",
    },
    verify: {
      type: DataTypes.ENUM("y", "n"),
      defaultValue: "y",
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
    modelName: "Preference", // We need to choose the model name
  }
);

module.exports = Preference;
