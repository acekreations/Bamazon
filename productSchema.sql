DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(150),
  department_name VARCHAR(150),
  price DECIMAL(11, 2),
  stock_quantity INTEGER(11),
  PRIMARY KEY(item_id)
);


INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("60in. Plasma TV", "Electronics", 1795.99, 109);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Stainless Steel Door Knobs", "Home Impovement", 39.99, 21);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Bagels", "Grocery", 1.99, 307);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Kryptonite", "Raw Materials", 9964.98, 14);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Suitecase - Medium - Grey", "Travel", 130.00, 2);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("12in. Cast Iron Skillet", "Kitchen", 19.99, 7);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Unobtainium", "Raw Materials", 987810.15, 62);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Chuck Taylors", "Fashion", 29.99, 530);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("8x10 Shag Rug", "Home Improvement", 205.50, 2);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Bluetooth Speaker", "Electronics", 498.15, 1005);
