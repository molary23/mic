const db_prod = {
  dbname: process.env.DBNAME,
  dbhost: process.env.DBHOST,
  dbpass: process.env.DBPASS,
};

module.exports = db_prod;
