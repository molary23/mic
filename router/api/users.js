const express = require("express"),
  router = express.Router(),
  bcrypt = require("bcryptjs"),
  Sequelize = require("sequelize"),
  gravatar = require("gravatar"),
  passport = require("passport"),
  { Op } = require("sequelize"),
  // Use Json Web Token
  jwt = require("jsonwebtoken"),
  keys = require("../../config/keys"),
  User = require("../../db/models/User"),
  Profile = require("../../db/models/Profile"),
  Premium = require("../../db/models/Premium"),
  Settings = require("../../db/models/Settings"),
  Currency = require("../../db/models/Currency"),
  AccountView = require("../../db/models/AccountView"),
  // Bring in View
  UserView = require("../../db/models/UserView"),
  ProviderView = require("../../db/models/ProviderView"),
  SuperView = require("../../db/models/SuperView"),
  //Bring in the Validation
  validateEmailInput = require("../../validation/email"),
  validatePassInput = require("../../validation/password"),
  //Check level
  checkUser = require("../../validation/checkUser");

/*
@route /api/user/reset/password
@desc User reset Password
@access PRIVATE
*/

router.post("/reset/password", (req, res) => {
  const { errors, isValid } = validatePassInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const userId = req.body.id,
    password = req.body.password;

  User.update({ password }, { where: { id: userId } })
    .then(() => {
      res.json({ message: "Password changed Successfully!" });
    })
    .catch((err) => res.status(404).json(err));
});

/*
@route /api/user/profile/
@desc User update profile
@access PRIVATE
*/

router.post(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const message = {},
      profileFields = {},
      UserId = req.user.id;

    if (req.body.firstname) profileFields.firstname = req.body.firstname;
    if (req.body.lastname) profileFields.lastname = req.body.lastname;

    Profile.update(
      {
        firstname: profileFields.firstname,
        lastname: profileFields.lastname,
      },
      {
        where: { UserId },
      }
    )
      .then(() => {
        message.update = "Profile updated!";
        res.json(message);
      })
      .catch((err) => res.json(err));
  }
);

/*
@route POST api/user/password
@desc User change Password
@access private
*/

router.post(
  "/password",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePassInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const userId = req.user.id,
      password = req.body.password;

    User.update({ password }, { where: { id: userId } })
      .then((user) => {
        res.json({ message: "Password changed Successfully!" });
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route POST api/user/email
@desc User change email
@access private
*/

router.post(
  "/email",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEmailInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const id = req.user.id,
      email = req.body.email;

    User.findOne({ where: { email } })
      .then((user) => {
        if (user) {
          errors.email = "Email addresss has been used!";
          res.json(errors);
        } else {
          User.update({ email }, { where: { id } })
            .then(() => {
              res.json({ message: "Password changed Successfully!" });
            })
            .catch((err) => res.status(404).json(err));
        }
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route GET api/user/details
@desc User view Details
@access private
*/

router.get(
  "/details",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userid = req.user.id;
    const level = req.user.level;
    let view;
    if (level === 1) {
      view = UserView;
    } else if (level === 2) {
      view = ProviderView;
    } else if (level === 3) {
      view = SuperView;
    }

    view
      .findOne({ where: { userid } })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route POST api/user/checkpass
@desc User view Details
@access private
*/

router.post(
  "/checkpass",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePassInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const id = req.user.id,
      password = req.body.password;

    User.findByPk(id, { attributes: ["password"] })
      .then((user) => {
        bcrypt.compare(password, user.password).then((isMatch) => {
          if (isMatch) {
            return res.json({ message: "Password is Correct" });
          } else {
            errors.password = "Incorrect Password";
            return res.status(400).json(errors);
          }
        });
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route GET api/user/settings
@desc User view settings
@access private
*/

router.get(
  "/settings",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const UserId = req.user.id;
    let info = {};
    Settings.findOne({
      where: { UserId },
      attributes: ["mode", "currencies", "providers", "notify"],
    })
      .then((settings) => {
        info.settings = settings;
        AccountView.findAll({
          where: { UserId },
          attributes: ["accountnumber", "wallet"],
        })
          .then((accounts) => {
            info.accounts = accounts;
            Profile.findOne({
              where: { UserId },
              attributes: ["firstname", "lastname"],
            })
              .then((profile) => {
                info.profile = profile;
                return res.json(info);
              })
              .catch((err) => res.status(404).json(err));
          })
          .catch((err) => res.status(404).json(err));
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route POST api/user/settings/providers
@desc User post settings 
@access private
*/

router.post(
  "/settings/provider",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkUser(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    const id = req.user.id;

    if (req.body) {
      providers = req.body;
    }

    Settings.findOne({ where: { UserId: id }, attributes: ["providers"] })
      .then((prList) => {
        providers = [...providers, ...prList.providers];
        providers = [...new Set(providers)];
        Settings.update({ providers }, { where: { UserId: id } })
          .then(() => {
            res.json(true);
          })
          .catch((err) => res.status(404).json(err));
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route POST api/user/settings/currencies
@desc User post settings 
@access private
*/

router.post(
  "/settings/currencies",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkUser(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    const id = req.user.id;

    if (req.body.currencies) {
      currencies = req.body.currencies;
    }
    let firstcurrency = currencies.split("/")[0],
      secondcurrency = currencies.split("/")[1];

    Currency.findAll({
      where: {
        [Op.and]: [
          { firstcurrency: { [Op.substring]: firstcurrency } },
          { secondcurrency: { [Op.substring]: secondcurrency } },
        ],
      },
      attributes: ["id"],
    })
      .then((currencies) => {
        let curList = currencies;
        Settings.update({ currencies: curList }, { where: { UserId: id } })
          .then(() => {
            res.json(true);
          })
          .catch((err) => res.status(404).json(err));
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route POST api/user/settings/mode
@desc User post settings 
@access private
*/

router.post(
  "/settings/mode",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkUser(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    const id = req.user.id;

    if (req.body.mode) {
      mode = req.body.mode;
    }

    Settings.update({ mode }, { where: { UserId: id } })
      .then(() => {
        res.json(true);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route POST api/user/settings/notify
@desc User post settings 
@access private
*/

router.post(
  "/settings/notify",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkUser(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    const id = req.user.id;

    if (req.body.notify) {
      notify = req.body.notify;
    }

    Settings.update({ notify }, { where: { UserId: id } })
      .then(() => {
        res.json(true);
      })
      .catch((err) => res.status(404).json(err));
  }
);
module.exports = router;
