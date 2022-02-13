// Bring in Models
const Payment = require("../Payment"),
  Premium = require("../Premium"),
  User = require("../User"),
  Profile = require("../Profile"),
  Subscription = require("../Subscription"),
  Pass = require("../Pass"),
  Referral = require("../Referral"),
  Bonus = require("../Bonus"),
  Signal = require("../Signal"),
  Currency = require("../Currency"),
  Settings = require("../Settings"),
  Transaction = require("../Transactions");

// Define Relationsship between tables
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

User.hasMany(Subscription, {
  onDelete: "RESTRICT",
  hooks: true,
  foreignKey: {
    allowNull: false,
  },
});
Subscription.belongsTo(User);

User.hasMany(Transaction, {
  onDelete: "RESTRICT",
  hooks: true,
  foreignKey: {
    allowNull: false,
  },
});
Transaction.belongsTo(User);

Subscription.hasOne(Premium, {
  onDelete: "RESTRICT",
  hooks: true,
  foreignKey: {
    allowNull: false,
  },
});
Premium.belongsTo(Subscription);

Subscription.hasOne(Bonus, {
  onDelete: "RESTRICT",
  hooks: true,
  foreignKey: {
    allowNull: false,
  },
});
Bonus.belongsTo(Subscription);

User.hasOne(Premium, {
  onDelete: "RESTRICT",
  hooks: true,
  foreignKey: {
    allowNull: false,
  },
});
Premium.belongsTo(User);
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
