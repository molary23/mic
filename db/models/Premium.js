const { DataTypes, Model } = require("sequelize");
sequelize = require("../../config/dbcon");

class Premium extends Model {}

Premium.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    status: {
      type: DataTypes.ENUM("a", "i", "n"), // New, Active or Not
      defaultValue: "n",
    },
    startdate: {
      type: DataTypes.DATEONLY, // Start date of recent sub
      allowNull: false,
    },
    enddate: {
      type: DataTypes.DATEONLY, // Duration in days
      allowNull: false,
    },
    subId: {
      type: DataTypes.INTEGER.UNSIGNED, // Subscription ID
    },
  },
  {
    // don't forget to enable timestamps!
    timestamps: true,

    // I want createdAt
    createdAt: false,
    // I want updatedAt
    updatedAt: true,
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Premium", // We need to choose the model name
  }
);
module.exports = Premium;
