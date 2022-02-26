const { DataTypes, Model } = require("sequelize");
sequelize = require("../../config/dbcon");

class ReferralView extends Model {}

ReferralView.init(
  {
    // Model attributes are defined here
    referralid: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    referral: {
      type: DataTypes.STRING(50),
    },
    referralId: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
    referredId: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
    referred: {
      type: DataTypes.STRING(50),
    },
  },
  {
    // don't forget to enable timestamps!
    timestamps: false,
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "ReferralView", // We need to choose the model name
  }
);
ReferralView.sync = () => Promise.resolve();
module.exports = ReferralView;
