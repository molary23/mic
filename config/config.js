require("dotenv").config(); // this is important!
module.exports = {
  development: {
    username: "molary",
    password: "7UCVG5Sr*fj483gH%",
    database: "mic",
    host: "127.0.01",
    dialect: "mysql",
  },
  test: {
    username: "molary",
    password: "7UCVG5Sr*fj483gH%",
    database: "mic",
    host: "127.0.01",
    dialect: "mysql",
  },
  production: {
    username: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DBNAME,
    host: process.env.DBHOST,
    dialect: "mysql",
  },
};
