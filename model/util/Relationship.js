// Bring in Models
const User = require("../User"),
  Profile = require("../Profile"),
  Subscription = require("../Subscription"),
  Pass = require("../Pass"),
  Referral = require("../Referral"),
  Bonus = require("../Bonus"),
  Signal = require("../Signal"),
  Currency = require("../Currency"),
  Settings = require("../Settings");

User.hasOne(Profile, {
  onDelete: "RESTRICT",
  hooks: true,
  foreignKey: {
    allowNull: false,
  },
});
Profile.belongsTo(User);

User.hasOne(Pass, {
  onDelete: "RESTRICT",
  hooks: true,
  foreignKey: {
    allowNull: false,
  },
});
Pass.belongsTo(User);

User.hasMany(Subscription, {
  onDelete: "RESTRICT",
  hooks: true,
  foreignKey: {
    allowNull: false,
  },
});
Subscription.belongsTo(User);

User.hasOne(Referral, {
  onDelete: "RESTRICT",
  hooks: true,
  foreignKey: {
    allowNull: false,
  },
});
Referral.belongsTo(User);

User.hasMany(Bonus, {
  onDelete: "RESTRICT",
  hooks: true,
  foreignKey: {
    allowNull: false,
  },
});
Bonus.belongsTo(User);

User.hasMany(Settings, {
  onDelete: "RESTRICT",
  hooks: true,
  foreignKey: {
    allowNull: false,
  },
});
Settings.belongsTo(User);

Currency.hasMany(Signal, {
  onDelete: "RESTRICT",
  hooks: true,
  foreignKey: {
    allowNull: false,
  },
});
Signal.belongsTo(Currency);

User.hasMany(Signal, {
  onDelete: "RESTRICT",
  hooks: true,
  foreignKey: {
    allowNull: false,
  },
});
Signal.belongsTo(User);

User.hasMany(Currency, {
  onDelete: "RESTRICT",
  hooks: true,
  foreignKey: {
    allowNull: false,
  },
});
Currency.belongsTo(User);
/*
sequelize
  .sync({ force: false })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
*/
