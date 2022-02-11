const { DataTypes, Model } = require("sequelize");
sequelize = require("../config/dbcon");

class Subscription extends Model {}

Subscription.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    period: {
      type: DataTypes.TINYINT, // Sub for how many months
      allowNull: false,
    },
    active: {
      type: DataTypes.TINYINT, // Sub active or not
      defaultValue: 0,
    },
    end: {
      type: DataTypes.DATE, // Sub will end on
    },
  },
  {
    // don't forget to enable timestamps!
    timestamps: true,

    // I want createdAt
    createdAt: "subDate",
    updatedAt: false,
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: "Subscription", // We need to choose the model name
  }
);
module.exports = Subscription;
