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
    signaloption: {
      type: DataTypes.ENUM("b", "s"),
      allowNull: false,
    },
    takeprofit: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    stoploss: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    startrange: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    endrange: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    pip: {
      type: DataTypes.DOUBLE,
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
    createdAt: "timeCreated",

    // I dont want updatedAt
    updatedAt: "timeUpdated",
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Signal", // We need to choose the model name
  }
);

module.exports = Signal;
