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
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("o", "c"), // Open or Close
      defaultValue: "o",
    },
    right: {
      type: DataTypes.ENUM("u", "p"), // User-Only or Public
      defaultValue: "u",
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
