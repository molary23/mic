const { DataTypes, Model } = require("sequelize");
sequelize = require("../config/dbcon");

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
    active: {
      type: DataTypes.TINYINT, // Duration in days
      defaultValue: 0,
    },
    startdate: {
      type: DataTypes.DATEONLY, // Bonus or Payment
      allowNull: false,
    },
    enddate: {
      type: DataTypes.DATEONLY, // Duration in days
      allowNull: false,
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
