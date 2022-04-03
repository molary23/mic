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
      type: DataTypes.ENUM("b", "s"),
      allowNull: false,
    },
    takeprofit: {
      type: DataTypes.STRING(50),
    },
    stoploss: {
      type: DataTypes.STRING(50),
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
      type: DataTypes.ENUM("f", "c", "s"), //failed, cancelled, success
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
