const db_prod = require("./db_prod");
const db_dev = require("./db_dev");
const Sequelize = require("sequelize");

let db;
if (process.env.NODE_ENV === "production") {
  db = db_prod;
} else {
  db = db_dev;
}

const sequelize = new Sequelize(db.dbname, db.dbhost, db.dbpass, {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
