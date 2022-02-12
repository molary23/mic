const { DataTypes, Model } = require("sequelize");
sequelize = require("../config/dbcon");

class Pass extends Model {}

Pass.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    reset: {
      type: DataTypes.STRING(8),
    },
  },
  {
    // don't forget to enable timestamps!
    timestamps: true,

    // I want createdAt
    createdAt: false,

    // I dont want updatedAt
    updatedAt: "timeUpdated",
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Pass", // We need to choose the model name
  }
);

module.exports = Pass;
