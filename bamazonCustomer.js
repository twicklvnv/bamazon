
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

//displaying all items for sale with info on ids, names and prices
function queryProducts() {
	connection.query("SELECT item_id, product_name, price FROM products",
		function(err, res) {
			if (err) throw err;
			for (var i = 0; i < res.length; i++) {
				console.log("ID: " + res[i].item_id + " | Product: " + 
					res[i].product_name + " | Price: " + 
					res[i].price);
			}
		})
	};
queryProducts();


//function asking user for the id and quantity of what they want to buy
function buyProducts() {
	inquirer.prompt([
		{
		type: "input",
		message: "Enter the ID of the product you wish to purchase.",
		name: "purchase"
		},
		{
			type: "input",
			message: "Enter the quantity you wish to purchase.",
			name: "quantity"
		}
		])
		.then(function(input) {
			//console.log(input)
			var item = input.purchase;
			var quantity = input.quantity;
			
			//getting info from database and returning info to user
			var query = connection.query(
				"SELECT * FROM products WHERE ?",
			{
				item_id: item
			},
			function(err, res) {

				if (err) throw err;
				//console.log(res[0].stock_quantity);
				//var productData = data[0];
				if (res[0].stock_quantity >= quantity) {
					console.log("We have that item in stock.");
					console.log("Your total price is $" + 
						res[0].price * quantity + ".");
					
				//update stock quantity or inform user if not enough stock
				connection.query(
					"UPDATE products SET ? WHERE ?",
						
						[{
							stock_quantity: res[0].stock_quantity - quantity
						},
						{
							item_id: item
						}],
						function(err, res) {
							console.log("product updated");
							queryProducts();
						}
					)
				}
				else {
					console.log("Sorry we do not have that quantity in stock.");
					console.log("Please choose a different quantity or item.");
				}
			})
			
		})

}

buyProducts();

