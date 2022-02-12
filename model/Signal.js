const { DataTypes, Model } = require("sequelize");
sequelize = require("../config/dbcon");

class Signal extends Model {}

Signal.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    signalfrom: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    signaltime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    boughtat: {
      type: DataTypes.FLOAT,
    },
    soldat: {
      type: DataTypes.FLOAT,
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
    createdAt: "timeCreated",

    // I dont want updatedAt
    updatedAt: "timeUpdated",
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Signal", // We need to choose the model name
  }
);

module.exports = Signal;
