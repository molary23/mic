const { DataTypes, Model } = require("sequelize");
sequelize = require("../../config/dbcon");

class BonusView extends Model {}

BonusView.init(
  {
    // Model attributes are defined here
    bonusid: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.DOUBLE,
    },
    status: {
      type: DataTypes.TINYINT,
    },
    username: {
      type: DataTypes.STRING(50),
    },
    payer: {
      type: DataTypes.STRING(50),
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
    SubscriptionId: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
  },
  {
    // don't forget to enable timestamps!
    timestamps: false,

    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "BonusView", // We need to choose the model name
  }
);

BonusView.sync = () => Promise.resolve();
module.exports = BonusView;
