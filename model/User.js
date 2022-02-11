const { DataTypes, Model } = require("sequelize");
sequelize = require("../config/dbcon");

class User extends Model {}

User.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    level: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
    },
    active: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
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
    modelName: "User", // We need to choose the model name
  }
);
module.exports = User;
