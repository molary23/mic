// Bring in Models
const User = require("../User"),
  Profile = require("../Profile"),
  Subscription = require("../Subscription"),
  Pass = require("../Pass"),
  Referral = require("../Referral"),
  Bonus = require("../Bonus"),
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
/*
sequelize
  .sync()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });*/
