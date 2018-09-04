var mysql = require("mysql");
var inq  = require("inquirer");
const {table} = require("table");

//set empty array for use displaying products with "table"
var displayData = [];

//connect to database
var connection = mysql.createConnection({
  port: 3306,
  database: "bamazon",
  user: "root",
  password: "password"
});

//update item quantity in the database
function placeOrder(item, userQuantity, stockQuantity) {
  var newQuantity = stockQuantity - userQuantity;
  var query = "UPDATE products SET ? WHERE ?";
  connection.query(query, [{stock_quantity: newQuantity}, {item_id: item}], function(err, res){
    if (err) throw err;

    console.log("\n--------------------------------\n");
    console.log("Thank you for your order!");
    console.log("\n--------------------------------\n");

    displayAllProducts(userSelectProduct);
  });
}

//show user the total and ask them to confirm the order
function confirmOrder(item, userQuantity, stockQuantity, price) {

  console.log("\n--------------------------------\n");
  console.log("Your total is: $" + userQuantity * price);
  console.log("\n--------------------------------\n");

  inq.prompt([
    {
      type: "confirm",
      message: "Confirm order?",
      name: "confirm",
      default: false
    }
  ]).then(function(res){
    if (res.confirm) {
      placeOrder(item, userQuantity, stockQuantity);
    }
    else {
      console.log("\n--------------------------------\n");
      console.log("Your order has been canceled.");
      console.log("\n--------------------------------\n");

      userSelectProduct();
    }
  });
}

//check the database to make sure there is enough quantity for the customers order
function checkStock(item, userQuantity) {
  var query = "SELECT stock_quantity, price FROM products WHERE ?";
  connection.query(query, {item_id: item}, function(err, res){
    if (res[0].stock_quantity >= userQuantity) {
      confirmOrder(item, userQuantity, res[0].stock_quantity, res[0].price);
    }
    else {
      console.log("\n--------------------------------\n");
      console.log("Sorry we only have " + res[0].stock_quantity + " of that item.");
      console.log("\n--------------------------------\n");

      userSelectProduct();
    }
  });
}

//ask user what they would like to buy and how many
function userSelectProduct() {
  inq.prompt([
    {
      type: "input",
      message: "Enter the item_id of the product you would like to purchase.",
      name: "item_id"
    },
    {
      type: "input",
      message: "How many would you like?",
      name: "quantity"
    }
  ]).then(function(res){
    checkStock(res.item_id, res.quantity);
  });
}

//select everything from product table and display using "table"
function displayAllProducts(cb) {
  //empty displayData array
  displayData = [];

  var query = "SELECT * FROM products";
  connection.query(query, function(err, res){
    if (err) throw err;

    //add title row to display table
    displayData.push(["item_id", "product_name", "department_name", "price ($)", "stock_quantity"]);

    //add each item to the display table
    for (var i = 0; i < res.length; i++) {
      var tempArr = [];
      tempArr.push(res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity);
      displayData.push(tempArr);
    }
    var output = table(displayData);
    console.log(output);

    //run option callback, primarily to display next user prompt
    if (cb) {
      cb();
    }
  });
}

function initialize() {
  displayAllProducts(userSelectProduct);
}



initialize();
