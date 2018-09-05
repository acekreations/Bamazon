var mysql = require("mysql");

//connect to database
var connection = mysql.createConnection({
  port: 3306,
  database: "bamazon",
  user: "root",
  password: "password"
});

module.exports = connection;
