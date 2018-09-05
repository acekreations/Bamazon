var mysql = require("mysql");
var inq  = require("inquirer");
var connection = require("./custom_modules/connection.js");
var displayProducts = require("./custom_modules/displayProducts.js");

function lowInventory() {
  var query = "SELECT * FROM products WHERE stock_quantity < 5";
  displayProducts(query, userOptions);
}

function addInventory() {
  inq.prompt([
    {
      type: "input",
      message: "What is the item_id of the product you would like to add inventory to?",
      name: "id"
    },
    {
      type: "input",
      message: "What quantity would you like to add?",
      name: "quantity"
    }
  ]).then(function(res){
    var updateQuery = "UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?";
    connection.query(updateQuery, [res.quantity, res.id], function(err, res){
      if (err) throw err;
      var query = "SELECT * FROM products";
      displayProducts(query, userOptions);
    });
  });
}

function addProduct() {
  inq.prompt([
    {
      type: "input",
      message: "What is the name of the product?",
      name: "name"
    },
    {
      type: "list",
      choices: ["Electronics", "Grocery", "Home Improvement", "Kitchen", "Fashion", "Raw Materials"],
      message: "What department is the product in?",
      name: "department"
    },
    {
      type: "input",
      message: "What is the price?",
      name: "price"
    },
    {
      type: "input",
      message: "How many do we have?",
      name: "quantity"
    },
  ]).then(function(res){
    var query = "INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES(?, ?, ?, ?)";
    connection.query(query, [res.name, res.department, res.price, res.quantity], function(err, res){
      if (err) throw err;

      console.log("\n--------------------------------\n");
      console.log("Product added.");
      console.log("\n--------------------------------\n");

      var query = "SELECT * FROM products";
      displayProducts(query, userOptions);
    });
  });
}


function exit() {
  connection.end();
  console.log("\n--------------------------------\n");
  console.log("Goodbye!");
  console.log("\n--------------------------------\n");
}

function userOptions() {
  inq.prompt([
    {
      type: "list",
      choices: ["View Products For Sale", "View Low Inventory", "Add To Inventory", "Add New Product", "Exit"],
      message: "What would you like to do?",
      name: "userChoice"
    }
  ]).then(function(res){
      switch (res.userChoice) {
        case "View Products For Sale":
            var query = "SELECT * FROM products";
            displayProducts(query, userOptions);
          break;
        case "View Low Inventory":
            lowInventory();
          break;
        case "Add To Inventory":
            addInventory();
          break;
        case "Add New Product":
            addProduct();
          break;
        case "Exit":
            exit();
          break;
        default:
            console.log("\n--------------------------------\n");
            console.log("Something went wrong.");
            console.log("\n--------------------------------\n");
      }
  });
}

function initialize() {
  userOptions();
}



initialize();
