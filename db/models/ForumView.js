const { DataTypes, Model } = require("sequelize");
sequelize = require("../../config/dbcon");

class ForumView extends Model {}

ForumView.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
    },
    right: {
      type: DataTypes.STRING,
    },
    replycount: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
    UserId: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
    creator: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
  },
  {
    // don't forget to enable timestamps!
    timestamps: false,

    // I want createdAt
    createdAt: true,

    // I dont want updatedAt
    updatedAt: true,
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "ForumView", // We need to choose the model name
  }
);
ForumView.sync = () => Promise.resolve();
module.exports = ForumView;
