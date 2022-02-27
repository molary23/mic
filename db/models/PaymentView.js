const { DataTypes, Model } = require("sequelize");
sequelize = require("../../config/dbcon");

class PaymentView extends Model {}

PaymentView.init(
  {
    // Model attributes are defined here
    payid: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.DOUBLE,
    },
    reference: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
    },
    gateway: {
      type: DataTypes.STRING(1),
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED, // Duration in days
    },
    username: {
      type: DataTypes.STRING(30), // username of user
    },
  },
  {
    // don't forget to enable timestamps!
    timestamps: false,

    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "PaymentView", // We need to choose the model name
  }
);

PaymentView.sync = () => Promise.resolve();
module.exports = PaymentView;
