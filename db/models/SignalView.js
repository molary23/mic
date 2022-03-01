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
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
    firstcurrency: {
      type: DataTypes.STRING(20),
    },
    secondcurrency: {
      type: DataTypes.STRING(20),
    },
    currencyid: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
    currencypair: {
      type: DataTypes.JSON(),
    },
    provider: {
      type: DataTypes.STRING(30),
    },
    userid: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "SignalView",
    timestamps: false,
  }
);
SignalView.sync = () => Promise.resolve();
module.exports = SignalView;
