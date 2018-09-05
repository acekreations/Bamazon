var connection = require("./connection.js");
const {table} = require("table");

//select everything from product table and display using "table"
function displayProducts(query, cb) {
  //empty displayData array
  var displayData = [];

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

module.exports = displayProducts;
