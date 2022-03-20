const { DataTypes, Model } = require("sequelize");
sequelize = require("../../config/dbcon");

class Settings extends Model {}

Settings.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    mode: {
      type: DataTypes.ENUM("d", "n", "a", "i"), // D for day, N for night, A for auto, I for inherit from system
      defaultValue: "d",
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
    modelName: "Settings", // We need to choose the model name
  }
);

module.exports = Settings;
