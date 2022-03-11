const { DataTypes, Model } = require("sequelize");
sequelize = require("../../config/dbcon");

class Profile extends Model {}

Profile.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    firstname: {
      type: DataTypes.STRING(25),
    },
    lastname: {
      type: DataTypes.STRING(25),
    },
    avatar: {
      type: DataTypes.STRING,
    },
  },
  {
    // don't forget to enable timestamps!
    timestamps: true,

    // I want createdAt
    createdAt: "timeCreated",

    // I dont want updatedAt
    updatedAt: "timeUpdated",
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Profile", // We need to choose the model name
  }
);

module.exports = Profile;
