# bamazon

Create a MySQL Database called bamazon.
Then create a Table inside of that database called products.
The products table should have each of the following columns:

item_id (unique id for each product)
product_name (Name of product)
department_name
price (cost to customer)
stock_quantity (how much of the product is available in stores)

Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).
Then create a Node application called bamazonCustomer.js. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.
The app should then prompt users with two messages.

![screenshot 5](https://user-images.githubusercontent.com/30394249/36076693-f7befd18-0f1c-11e8-9afc-3e53d890d25d.png)

The first should ask them the ID of the product they would like to buy.
The second message should ask how many units of the product they would like to buy

![screenshot 6](https://user-images.githubusercontent.com/30394249/36076698-07f995b2-0f1d-11e8-8585-45378741c8a8.png)

Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.

![screenshot 7](https://user-images.githubusercontent.com/30394249/36076705-1a967d8e-0f1d-11e8-8eb9-85df0e72ed09.png)

However, if your store does have enough of the product, you should fulfill the customer's order.

This means updating the SQL database to reflect the remaining quantity.
Once the update goes through, show the customer the total cost of their purchase.

![screenshot 6](https://user-images.githubusercontent.com/30394249/36076698-07f995b2-0f1d-11e8-8585-45378741c8a8.png)


Create a new Node application called bamazonManager.js. Running this application will:

List a set of menu options:
View Products for Sale
View Low Inventory
Add to Inventory
Add New Product

If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.

![screenshot 8](https://user-images.githubusercontent.com/30394249/36076706-1aa8e884-0f1d-11e8-892a-1a3f39e14f36.png)

If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.

![screenshot 9](https://user-images.githubusercontent.com/30394249/36076707-1abcdb96-0f1d-11e8-8a37-44b30f9197d1.png)

If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.

![screenshot 10](https://user-images.githubusercontent.com/30394249/36076703-1a6dddf2-0f1d-11e8-9ac8-ef1d73e4b4ef.png)

If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.

![screenshot 11](https://user-images.githubusercontent.com/30394249/36076704-1a832450-0f1d-11e8-8035-3660d3bd6bd5.png)



