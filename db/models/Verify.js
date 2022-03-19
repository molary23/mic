const { DataTypes, Model } = require("sequelize");
sequelize = require("../../config/dbcon");

class Verify extends Model {}

Verify.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    verify: {
      type: DataTypes.STRING(8),
    },
    confirm: {
      type: DataTypes.ENUM("n", "y"),
      defaultValue: "n",
    },
  },
  {
    // don't forget to enable timestamps!
    timestamps: true,

    // I want createdAt
    createdAt: false,

    // I dont want updatedAt
    updatedAt: true,
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Verify", // We need to choose the model name
  }
);

module.exports = Verify;
