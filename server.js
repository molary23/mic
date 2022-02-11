const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  passport = require("passport"),
  // Bring in APIs
  users = require("./router/api/users");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
// Passport Config
require("./config/passport")(passport);

// Bring in Models
const User = require("./model/User"),
  Profile = require("./model/Profile"),
  Subscription = require("./model/Subscription");

User.hasOne(Profile, {
  onDelete: "RESTRICT",
  hooks: true,
  foreignKey: {
    allowNull: false,
  },
});
Profile.belongsTo(User);

User.hasMany(Subscription, {
  onDelete: "RESTRICT",
  hooks: true,
  foreignKey: {
    allowNull: false,
  },
});
Subscription.belongsTo(User);
/*
sequelize
  .sync()
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });*/

app.use("/api/users", users);

const port = process.env.PORT || 10000;

app.listen(port, () => console.log(`Server running on port ${port}`));
