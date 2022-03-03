const { DataTypes, Model } = require("sequelize");
sequelize = require("../../config/dbcon");

class WithdrawalView extends Model {}

WithdrawalView.init(
  {
    // Model attributes are defined here
    withdrawalid: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    account: {
      type: DataTypes.JSON(),
      allowNull: false,
    },
    userid: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
    fullname: {
      type: DataTypes.STRING(50),
    },
    username: {
      type: DataTypes.STRING(30),
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.STRING(1),
    },
  },
  {
    // don't forget to enable timestamps!
    timestamps: false,

    // I want createdAt
    createdAt: true,

    // I dont want updatedAt
    updatedAt: false,
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "WithdrawalView", // We need to choose the model name
  }
);

module.exports = WithdrawalView;
