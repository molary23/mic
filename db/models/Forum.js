const { DataTypes, Model } = require("sequelize");
sequelize = require("../../config/dbcon");

class Forum extends Model {}

Forum.init(
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
    ticket: {
      type: DataTypes.STRING(20),
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("o", "r"), // Original or Reply
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("o", "c"), // Open or Close
    },
    response: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
  },
  {
    // don't forget to enable timestamps!
    timestamps: true,

    // I want createdAt
    createdAt: true,

    // I dont want updatedAt
    updatedAt: true,
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Forum", // We need to choose the model name
  }
);

module.exports = Forum;
