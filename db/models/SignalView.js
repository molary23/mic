"use strict";
const { DataTypes, Model } = require("sequelize"),
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
      type: DataTypes.ENUM("b", "c", "d", "s", "t", "u"), // sell stop = t, buy stop = c, sell limit = u, buy limit = d, sell instant = s, buy instant = b
      allowNull: false,
    },
    takeprofit: {
      type: DataTypes.TEXT,
    },
    stoploss: {
      type: DataTypes.TEXT,
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
      type: DataTypes.STRING(50),
    },
    secondcurrency: {
      type: DataTypes.STRING(50),
    },
    currencyid: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
    provider: {
      type: DataTypes.STRING(30),
    },
    providerid: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    entry: {
      type: DataTypes.DOUBLE,
    },
    comment: {
      type: DataTypes.STRING,
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
