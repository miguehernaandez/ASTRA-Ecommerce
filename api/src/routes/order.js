const server = require('express').Router(); //Import router from express module.
const { Order, Order_line, Product, User } = require('../db.js'); // Import Categories model.
const { OK, CREATED, ERROR, ERROR_SERVER } = require('../constants/index'); // Import Status constants.

// Start Routes

//// 'Get Orders' route in '/'
server.get('/', function (req, res) {

	Order.findAll({ include: [ { model: User } ] })	
	.then(orders => {
		return res.json({
			message: 'Sucess',
			data: orders
		})
	})
	.catch((err) => {
		console.log(err)
	});
});

//End routes
module.exports = server;