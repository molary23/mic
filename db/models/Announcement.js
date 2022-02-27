const { DataTypes, Model } = require("sequelize");
sequelize = require("../../config/dbcon");

class Announcement extends Model {}

Announcement.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.ENUM("b", "c"),
      allowNull: false,
    },
    summary: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    link: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  },
  {
    // don't forget to enable timestamps!
    timestamps: true,

    // I want createdAt
    createdAt: true,

    // I dont want updatedAt
    updatedAt: false,
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Announcement", // We need to choose the model name
  }
);

module.exports = Announcement;
