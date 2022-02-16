"use strict";
const { DataTypes, Model } = require("sequelize");
sequelize = require("../../config/dbcon");

class SuperView extends Model {}
SuperView.init(
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
  },
  {
    sequelize,
    modelName: "SuperView",
    timestamps: false,
  }
);
SuperView.sync = () => Promise.resolve();
module.exports = SuperView;
