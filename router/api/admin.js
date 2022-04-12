const express = require("express"),
  router = express.Router(),
  bcrypt = require("bcryptjs"),
  passport = require("passport"),
  gravatar = require("gravatar"),
  User = require("../../db/models/User"),
  Payment = require("../../db/models/Payment"),
  Subscription = require("../../db/models/Subscription"),
  Bonus = require("../../db/models/Bonus"),
  Transaction = require("../../db/models/Transaction"),
  Announcement = require("../../db/models/Announcement"),
  Forum = require("../../db/models/Forum"),
  ForumReply = require("../../db/models/ForumReply"),
  Settings = require("../../db/models/Settings"),
  Withdrawal = require("../../db/models/Withdrawal"),
  Verify = require("../../db/models/Verify"),
  Profile = require("../../db/models/Profile"),
  Wallet = require("../../db/models/Wallet"),
  //Bring in the Validation
  validateAddUserInput = require("../../validation/addUser"),
  validateEmailInput = require("../../validation/email"),
  //Bring in Super Admin Checker
  checkSuperAdmin = require("../../validation/superCheck"),
  checkAdmin = require("../../validation/adminCheck");

/*
@route POST api/admin/add
@desc Add new admin
@access private
*/

router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }

    const { errors, isValid } = validateAddUserInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const userField = {};

    if (req.body.email) userField.email = req.body.email;
    if (req.body.username) userField.username = req.body.username;
    if (req.body.phone) userField.phone = req.body.phone;
    if (req.body.password) userField.password = req.body.password;
    if (req.body.level) userField.level = req.body.level;

    User.findOne({ where: { email: userField.email } })
      .then((user) => {
        if (user) {
          errors.email = "Email Address has been taken!";
          res.status(400).json(errors);
        } else {
          User.findOne({ where: { username: userField.username } }).then(
            (username) => {
              if (username) {
                errors.username = "Username has been taken!";
                res.status(400).json(errors);
              } else {
                bcrypt.genSalt(10, (_err, salt) => {
                  bcrypt.hash(userField.password, salt, (err, hash) => {
                    if (err) throw err;
                    userField.password = hash;
                    User.create(userField)
                      .then((user) => {
                        const UserId = user.id,
                          avatar = gravatar.url(userField.email, {
                            s: "200",
                            r: "pg",
                            d: "mm",
                          });
                        Profile.create({
                          UserId,
                          avatar,
                        })
                          .then(() => {
                            Settings.create(UserId)
                              .then(() => {
                                Verify.create(UserId)
                                  .then(() => {
                                    const msg = {
                                      to: userField.email,
                                      from: "info@micearnbusiness.org",
                                      subject: "Verify Your Email Address",
                                      text: "and easy to do anywhere, even with Node.js",
                                      html: "<strong>and easy to do anywhere, even with Node.js</strong>",
                                    };
                                    /*
sgMail
  .send(msg)
  .then(() => {}, error => {
    console.error(error);

    if (error.response) {
      console.error(error.response.body)
    }
  });
                                          
                                          
                                          */
                                    return res.json(true);
                                  })
                                  .catch((err) => res.json(err));
                              })
                              .catch((err) => res.json(err));
                          })
                          .catch((err) => res.json(err));
                      })
                      .catch((err) => res.json(err));
                  });
                });
              }
            }
          );
        }
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route POST api/admin/update/:id
@desc update an Admin
@access private
*/

router.post(
  "/update",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    const [action, userId] = req.body;
    let active;
    if (action === "delete") {
      active = "i";
    } else if (action === "reactivate") {
      active = "a";
    }

    User.findByPk(userId).then((user) => {
      if (!user) {
        error.user = "User doesn't exist!";
        res.status(400).json(error);
      } else if (user.level < 2) {
        error.user = "You can't deactivate a User";
        res.status(400).json(error);
      } else {
        User.update({ status: active }, { where: { id: userId } })
          .then(() => {
            res.json(true);
          })
          .catch((err) => res.status(404).json(err));
      }
    });
  }
);

/*
@route POST api/admin/approve/bonus
@desc Admin approve Bonus
@access private
*/

router.post(
  "/approve/bonus/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }

    const { action, id } = req.body;

    let status;
    if (action === "approve") {
      status = "a";
    } else if (action === "reject") {
      status = "r";
    }

    Promise.all([
      Bonus.update({ status }, { where: { id: id } })
        .then(() => {
          Bonus.findByPk(id, { attributes: ["amount", "UserId"] })
            .then((bonus) => {
              let amount = bonus.amount,
                UserId = bonus.UserId;
              Transaction.create({
                amount,
                UserId,
                type: "c",
                method: "b",
              })
                .then(() => {
                  return res.json({ message: "Bonus updated!" });
                })
                .catch((err) => res.status(404).json(err));
            })
            .catch((err) => res.status(404).json(err));
        })
        .catch((err) => res.status(404).json(err)),
    ]);
  }
);

/*
@route POST api/admin/approve/bonuses
@desc Admin approve Bonus
@access private
*/

router.post(
  "/approve/bonuses",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }

    const ids = JSON.parse(req.body.bonusids),
      userIds = JSON.parse(req.body.ids),
      amounts = JSON.parse(req.body.amounts);

    let bulk = {},
      bulkCreate = [];

    for (let index = 0; index < ids.length; index++) {
      bulk = {
        amount: amounts[index],
        UserId: userIds[index],
        type: "c",
        method: "b",
      };
      bulkCreate.push(bulk);
    }

    Bonus.update({ status: 2 }, { where: { id: ids } })
      .then(() => {
        Transaction.bulkCreate(bulkCreate)
          .then(() => {
            return res.json({ message: "Bonus(es) updated!" });
          })
          .catch((err) => res.status(404).json(err));
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route POST api/admin/approve/payment
@desc Admin approve Payment
@access private
*/

router.post(
  "/approve/payment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }

    const id = req.body.payid;
    Promise.all([
      Payment.update({ status: 2 }, { where: { id } })
        .then(() => {
          Subscription.update({ status: 2 }, { where: { payID: id } })
            .then(() => {
              res.json({ message: "Payment Approved!" });
            })
            .catch((err) => res.status(404).json(err));
        })
        .catch((err) => res.status(404).json(err)),
    ]);
  }
);

/*
@route POST api/admin/approve/payments
@desc Admin approve Bonus
@access private
*/

router.post(
  "/approve/payments",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    const ids = JSON.parse(req.body.payids);
    Payment.update({ status: 2 }, { where: { id: ids } })
      .then(() => {
        Subscription.update({ status: 2 }, { where: { payID: ids } })
          .then(() => {
            return res.json({ message: "Payment(s) updated!" });
          })
          .catch((err) => res.status(404).json(err));
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route DELETE api/admin/delete/announcement/:id
@desc Admin delete announcement
@access private
*/

router.delete(
  "/delete/announcement/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    let id = req.params.id.split(":")[1];
    id = JSON.parse(id);
    Announcement.destroy({ where: { id } })
      .then(() => {
        res.json(true);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route POST api/admin/add/announcement
@desc Admin add announcement
@access private
*/

router.post(
  "/add/announcement",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }

    const annField = {};
    if (req.body.title) annField.title = req.body.title;
    if (req.body.link) annField.link = req.body.link;
    if (req.body.summary) annField.summary = req.body.summary;
    if (req.body.startdate) annField.startdate = req.body.startdate;
    if (req.body.enddate) annField.enddate = req.body.enddate;
    annField.UserId = req.user.id;
    Announcement.create(annField)
      .then(() => {
        res.json(true);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route POST api/admin/edit/announcement/:id
@desc Admin edit announcement
@access private
*/

router.post(
  "/edit/announcement/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    let id = req.params.id.split(":")[1];
    id = parseInt(id);
    const annField = {};
    if (req.body.title) annField.title = req.body.title;
    if (req.body.link) annField.link = req.body.link;
    if (req.body.summary) annField.summary = req.body.summary;
    if (req.body.startdate) annField.startdate = req.body.startdate;
    if (req.body.enddate) annField.enddate = req.body.enddate;

    Announcement.update(annField, {
      where: {
        id,
      },
    })
      .then(() => {
        res.json(true);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route GET api/admin/settings
@desc admin view settings
@access private
*/

router.get(
  "/settings",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const UserId = req.user.id;
    let info = {};
    return Promise.all([
      Settings.findOne({
        where: { UserId },
        attributes: ["mode"],
      })
        .then((settings) => {
          info.settings = settings;
          Profile.findOne({
            where: { UserId },
            attributes: ["firstname", "lastname", "phone"],
          })
            .then((profile) => {
              info.profile = profile;
              return res.json(info);
            })
            .catch((err) => res.status(404).json(err));
        })
        .catch((err) => res.status(404).json(err)),
    ]);
  }
);

/*
@route POST api/admin/settings/mode
@desc User post settings 
@access private
*/

router.post(
  "/settings/mode",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const id = req.user.id;
    let mode;
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
@route POST api/admin/settings/pass
@desc User post passs 
@access private
*/

router.post(
  "/settings/pass",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const id = req.user.id,
      errors = {};
    let pass;
    if (req.body) {
      pass = req.body;
    }

    User.findByPk(id, { attributes: ["password"] })
      .then((user) => {
        bcrypt.compare(pass.old, user.password).then((isMatch) => {
          if (isMatch) {
            bcrypt.genSalt(10, (_err, salt) => {
              bcrypt.hash(pass.new, salt, (err, hash) => {
                let newPassword = hash;
                User.update(
                  { password: newPassword },
                  {
                    where: {
                      id,
                    },
                  }
                )
                  .then(() => {
                    res.json(true);
                  })
                  .catch((err) => res.json(err));
              });
            });
          } else {
            errors.password = "Incorrect Old Password";
            return res.status(400).json(errors);
          }
        });
      })
      .catch((err) => res.json(err));
  }
);

/*
@route /api/admin/profile/
@desc User update profile
@access PRIVATE
*/

router.post(
  "/settings/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profileFields = {},
      UserId = req.user.id;

    if (req.body.firstname) profileFields.firstname = req.body.firstname;
    if (req.body.lastname) profileFields.lastname = req.body.lastname;
    if (req.body.phone) profileFields.phone = req.body.phone;

    Profile.update(
      {
        firstname: profileFields.firstname,
        lastname: profileFields.lastname,
        phone: profileFields.phone,
      },
      {
        where: { UserId },
      }
    )
      .then(() => {
        res.json(true);
      })
      .catch((err) => res.json(err));
  }
);

/*
@route GET api/signals/wallet/delete/:id
@desc Admin Delete wallet
@access private
*/

router.post(
  "/wallet/update/:action/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    let id = req.params.id.split(":")[1];
    let action = req.params.action.split(":")[1];
    id = parseInt(id);

    let status;
    if (action === "delete") {
      status = "i";
    } else if (action === "activate") {
      status = "a";
    }

    Wallet.update(
      { status },
      {
        where: {
          id,
        },
      }
    )
      .then(() => {
        res.json(true);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route GET api/signals/withdrawals/delete/:id
@desc Admin Delete withdrawals
@access private
*/

router.post(
  "/withdrawals/update/:action/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    let id = req.params.id.split(":")[1];
    let action = req.params.action.split(":")[1];
    id = parseInt(id);

    let status;
    if (action === "approve") {
      status = "a";
    } else if (action === "reject") {
      status = "r";
    }

    Withdrawal.update(
      { status },
      {
        where: {
          id,
        },
      }
    )
      .then(() => {
        if (action === "approve") {
          Withdrawal.findByPk(id, { attributes: ["amount", "UserId"] })
            .then((withdrawal) => {
              let transField = {
                amount: withdrawal.amount,
                UserId: withdrawal.UserId,
                method: "w",
                type: "d",
              };
              Transaction.create(transField)
                .then(() => {
                  return res.json(true);
                })
                .catch((err) => res.status(404).json(err));
            })
            .catch((err) => res.status(404).json(err));
        } else {
          return res.json(true);
        }
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route POST api/admin/wallet/add
@desc Super Admin add wallet
@access private
*/
router.post(
  "/wallet/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }

    let UserId = req.user.id,
      wallet = req.body.wallet;

    Wallet.findOne({
      where: {
        wallet,
      },
    })
      .then((wall) => {
        if (wall) {
          error.wallet = "Wallet exist!";
          res.status(400).json(error);
        } else {
          Wallet.create({
            wallet,
            UserId,
          })
            .then(() => {
              res.json(true);
            })
            .catch((err) => res.status(404).json(err));
        }
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route POST api/admin/add/forum
@desc Admin add forum
@access private
*/

router.post(
  "/add/forum",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    const forumFields = {};

    if (req.body.title) forumFields.title = req.body.title;
    if (req.body.text) forumFields.text = req.body.text;
    forumFields.UserId = req.user.id;
    forumFields.right = "p";

    Forum.create(forumFields)
      .then(() => {
        res.json(true);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route POST api/admin/update/forum
@desc Admin update forum
@access private
*/

router.post(
  "/update/forum",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    let action, forumid;
    if (req.body.action) action = req.body.action;
    if (req.body.id) forumid = req.body.id;

    if (action === "close") {
      Forum.update(
        {
          status: "c",
        },
        {
          where: {
            id: forumid,
          },
        }
      )
        .then(() => {
          return res.json(true);
        })
        .catch((err) => res.status(404).json(err));
    } else if (action === "delete") {
      Forum.destroy({
        where: {
          id: forumid,
        },
      })
        .then(() => {
          return res.json(true);
        })
        .catch((err) => res.status(404).json(err));
    }
  }
);

/*
@route POST api/admin/forum/reply
@desc Admin add reply
@access private
*/

router.post(
  "/forum/reply",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }
    const replyFields = {};

    if (req.body.text) replyFields.text = req.body.text;
    if (req.body.ForumId) replyFields.ForumId = req.body.ForumId;
    replyFields.UserId = req.user.id;

    ForumReply.create(replyFields)
      .then(() => {
        res.json(true);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route POST api/admin/delete/reply
@desc Admin delete reply
@access private
*/

router.delete(
  "/reply/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkSuperAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }

    let UserId = req.user.id,
      replyid = req.params.id.split(":")[1];

    ForumReply.destroy({ where: { id: replyid } })
      .then(() => {
        return res.json(true);
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route POST api/aadmin/change-email
@desc Admin change email
@access private
*/

router.post(
  "/change-email",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEmailInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const id = req.body.id,
      email = req.body.email;

    User.findOne({ where: { email } })
      .then((user) => {
        if (user) {
          errors.email = "Email addresss has been used!";
          res.status(400).json(errors);
        } else {
          User.update({ email }, { where: { id } })
            .then(() => {
              res.json(1);
            })
            .catch((err) => res.status(404).json(err));
        }
      })
      .catch((err) => res.status(404).json(err));
  }
);

/*
@route POST api/admin/theme
@desc User get mode
@access private
*/

router.get(
  "/theme",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { error, isLevel } = checkAdmin(req.user.level);
    if (!isLevel) {
      return res.status(400).json(error);
    }

    let UserId = req.user.id;

    Settings.findOne({
      where: {
        UserId,
      },
      attributes: ["mode"],
    })
      .then((setting) => {
        return res.json(setting.mode);
      })
      .catch((err) => res.status(404).json(err));
  }
);

module.exports = router;
