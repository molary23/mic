"use strict";
const { DataTypes, Model } = require("sequelize");
sequelize = require("../../config/dbcon");

class SignalView extends Model {}
SignalView.init(
  {
    signalid: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    signaloption: {
      type: DataTypes.ENUM("b", "s"),
    },
    takeprofit: {
      type: DataTypes.JSON,
    },
    stoploss: {
      type: DataTypes.JSON,
    },
    startrange: {
      type: DataTypes.DOUBLE,
    },
    endrange: {
      type: DataTypes.DOUBLE,
    },
    pip: {
      type: DataTypes.DOUBLE,
    },
    status: {
      type: DataTypes.ENUM("f", "c"),
    },
    timecreated: {
      type: DataTypes.DATE,
    },
    timeupdated: {
      type: DataTypes.DATE,
    },
    currency: {
      type: DataTypes.STRING(7),
    },
    providername: {
      type: DataTypes.STRING(30),
    },
    provideremail: {
      type: DataTypes.STRING(30),
    },
  },
  {
    sequelize,
    modelName: "SignalView",
    timestamps: false,
  }
);

module.exports = SignalView;
