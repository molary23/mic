"use strict";
const { DataTypes, Model } = require("sequelize");
sequelize = require("../../config/dbcon");

class UserView extends Model {}
UserView.init(
  {
    userid: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(30),
    },
    email: {
      type: DataTypes.STRING(30),
    },
    fullname: {
      type: DataTypes.STRING(50),
    },
    userstatus: {
      type: DataTypes.TINYINT,
    },
    premiumstatus: {
      type: DataTypes.TINYINT,
    },
  },
  {
    sequelize,
    modelName: "UserView",
    timestamps: false,
  }
);
UserView.sync = () => Promise.resolve();
module.exports = UserView;
