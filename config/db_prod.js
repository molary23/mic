const db_prod = {
  dbname: process.env.DBNAME,
  dbhost: process.env.DBHOST,
  dbuser: process.env.DBUSER,
  dbpass: process.env.DBPASS,
};

module.exports = db_prod;
