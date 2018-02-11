
//npm packages required
var mysql = require("mysql");
var inquirer = require("inquirer");

//creating connection to mysql database
var connection = mysql.createConnection({
	host: "localhost",
	port: 8889,
	user: "root",
	password: "root",
	database: "bamazon_db"
});

connection.connect(function(err) {
	if (err) throw err;
	//console.log("connected as id " + connection.threadId);
})

//displaying initial set of options
function options() {
	inquirer.prompt([
		{
			type: "list",
			message: "What would you like to do?",
			choices: ["View products for sale", "View low inventory", 
			"Add to inventory", "Add new product"],
			name: "action"
		}
		])
	.then(function(input) {

		//switch case to determine what function to run based on user input
		switch (input.action) {
			case "View products for sale":
			forSale();
			break;

			case "View low inventory":
			lowInventory();
			break;

			case "Add to inventory":
			addInventory();
			break;

			case "Add new product":
			addProduct();
			break;
		}
	});
	
}
options();

//function to see products for sale
function forSale() {
	connection.query("SELECT item_id, product_name, price, stock_quantity FROM products",
		function(err, res) {
			if (err) throw err;
			for (var i = 0; i < res.length; i++) {
				console.log("ID: " + res[i].item_id + " | Product: " + 
					res[i].product_name + " | Price: " + 
					res[i].price + " | Quantity: " + res[i].stock_quantity);
			}
		});
}

//function to find and display low inventory items
function lowInventory() {
	connection.query("SELECT * FROM products WHERE stock_quantity < 5",
		function(err, res) {
			for (var j = 0; j < res.length; j++) {
				console.log("ID: " + res[j].item_id + " | Product: " + 
					res[j].product_name + " | Price: " + res[j].price + 
					" | Quantity: " + res[j].stock_quantity + 
					" | Department: " + res[j].department_name);
			}
		})
	options();
}


//function to add inventory to selected items
function addInventory() {

	//prompt for item to update and new stock levels
	inquirer.prompt([
		{
			type: "input",
			message: "Enter the ID of the item.",
			name: "update"
		},
		{
			type: "input",
			message: "Enter the new stock level.",
			name: "number"
		}
		])
	.then(function(input) {
		var item = input.update;
		var number = input.number;

		//updating the item to the new stock levels in the database
		var query = connection.query(
				"UPDATE products SET ? WHERE ?",
				[
				{
					stock_quantity: number
				},
				{
					item_id: item
				}
				],
				function(err, res){
					console.log("Inventory updated");
				}
			)
	})
	
}

//function to add a new product to the database
function addProduct() {

	inquirer.prompt([
		{
			type: "input",
			message: "What is the item you wish to add?",
			name: "item"
		},
		{
			type: "input",
			message: "What department is the item in?",
			name: "department"
		},
		{
			type: "input",
			message: "What is the price of the item?",
			name: "price"
		},
		{
			type: "input",
			message: "What is the stock quantity of the new item?",
			name: "quantity"
		}
		])
		.then(function(input) {
		//console.log(input);
		var item = input.item;
		var department = input.department;
		var price = input.price;
		var quantity = input.quantity;

	
	var query = connection.query(
		
		"INSERT INTO products SET ?",
		{
			product_name: item,
			department_name: department,
			price: price,
			stock_quantity: quantity
		},
		function(err, res){
			console.log("product added");
		})
		
	})	
}