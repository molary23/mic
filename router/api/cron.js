const cron = require("node-cron"),
  Bonus = require("../../db/models/Bonus"),
  Premium = require("../../db/models/Premium"),
  dateformat = require("../../util/dateformat");

/*
Cron for Daily Premium Check
*/

cron.schedule(
  "0 0 * * *",
  () => {
    Premium.update(
      { status: "i" },
      {
        where: {
          enddate: new Date().toISOString(),
          status: "a",
        },
      }
    );
  },
  {
    scheduled: true,
    timezone: "Africa/Lagos",
  }
);

/*
CRON for Auto Bonus Approval
*/

cron.schedule(
  "0 0 * * *",
  () => {
    let removeday = new Date(new Date().setDate(new Date().getDate() - 7));

    let formattedDate = dateformat(removeday);

    Bonus.update(
      { status: "a" },
      {
        where: sequelize.where(
          sequelize.fn("date", sequelize.col("createdAt")),
          "=",
          formattedDate
        ),
        status: "p",
      }
    );
  },
  {
    scheduled: true,
    timezone: "Africa/Lagos",
  }
);
