# Bamazon

Imagine for a moment that Jeff Bezos was so forward thinking that he conceptualized and created Amazon in 1977 (when he was 13), what would it look like? Enter Bamazon, the 1977 equivalent of Amazon. Bamazon runs on the command line and allows you to shop through an inventory of products as a customer and as a manager allows you to update inventory as needed.

![](images/customer.gif)

## How to Use
### 1. Download/Clone
Bamazon can be used by first downloading or cloning this repo to your machine.

### 2. Packages
Next within your `/bamazon` directory run `npm install` in your terminal. This will install all dependencies.

### 3. Database
Bamazon does require a MySQL database to work, more info about MySQL can be found [here](https://www.tutorialspoint.com/mysql/).

#### 3.1
Once you have MySQL running on you machine you can create your database by running the SQL included in `productScheme.sql` in MySQLWorkbench or a similar tool.

#### 3.2
You should now have a database called `bamazon` with five columns in it, and ten products if you chose to add the products. Now you will need to connect your database by enter the proper info into `custom_modules/connection.js`. Enter the proper port, user and password for your setup.

### 4. Running Bamazon
If you've properly completed the above steps you can now navigate to your `/bamazon` directory within your command line and run `node bamazonCustomer.js`. You will now see a list of the products listed in your database. If you want to change your products or updated your products you can run `node bamazonManager.js` and follow the on screen instructions.

![](images/manager.gif)

## Tech
On the surface Bamazon looks old-school but under the hood it's all modern. Bamazon runs on Node.js and uses MySQL to store data.

- Node.js
- MySQL
- Packages
  - [mysql](https://www.npmjs.com/package/mysql) for DB interaction
  - [inquirer](https://www.npmjs.com/package/inquirer) for CLI maneuverability
  - [table](https://www.npmjs.com/package/table) for displaying data

## Challenges
This project's focus was on meshing Node and MySQL so at the beginning I assumed that's where I would face challenges, but my biggest challenge actually came when I decided to modularize the function that displays data on the screen as a table. I was originally running the `displayProducts()` function separately in both the customer and manger file but I really felt the need to make it its own module and import it into both files. I thought this would be easy, but of course when I made the change everything broke. The `displayProducts()` function is doing a number of things, it first queries the DB for products, then the return data has to be formatted in an array for `table` to render it properly, and then it runs an optional callback that is primarily used to display the next prompt for the user. The challenge arouse when I needed a query that gave me specific data rather than all the products in the table. My query was hard coded which obviously doesn't work if I need to change it, so after some contemplation I decided to pass in the query string as a parameter of `displayProducts()`. This works but I think in the future I would like to implement a solution that optionally takes in a query string and defaults to displaying all the products, as displaying all products is used most of the time.


## Author
Craig Melville
