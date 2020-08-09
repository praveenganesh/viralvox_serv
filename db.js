const mysql = require("mysql");
const connection = mysql.createConnection({
  host: process.env.MYSQL_IP,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.DATABSE,
});

connection.connect(function (err) {
  if (err) throw err;
});

module.exports = connection;
