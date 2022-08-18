const { DataTypes, Model } = require("sequelize");
sequelize = require("../../config/dbcon");

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
      type: DataTypes.ENUM("f", "c", "s"), //failed, cancelled, success
    },
    entry: {
      type: DataTypes.DOUBLE,
    },
    comment: {
      type: DataTypes.STRING(150),
    },
  },
  {
    // don't forget to enable timestamps!
    timestamps: true,

    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Signal", // We need to choose the model name
  }
);

module.exports = Signal;
