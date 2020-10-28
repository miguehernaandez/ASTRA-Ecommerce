const server = require('express').Router(); //Import router from express module.
const { Order, Order_line, Product, User } = require('../db.js'); // Import Categories model.
const { OK, CREATED, ERROR, ERROR_SERVER } = require('../constants/index'); // Import Status constants.

// Start Routes

//// 'Get Orders' route in '/'
server.get('/', function (req, res) {

	Order.findAll({ include: [ { model: User}, {model: Product}  ] })	
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

server.post('/shopping/:userId', function (req, res) {
	console.log(req.body)
    // return res.send(req.body)
	 const { userId } = req.params;
	 console.log(userId)
	 const { id } = req.body
	 const  qty  = req.body.order_line.quantity
	 console.log(req.body)
	const newOrder = Order.findOrCreate({ where: { userId }, defaults: {status:'created'} });
	const newProduct = Product.findOne({ where: {id: id} });
	Promise.all([ newOrder,  newProduct])
	.then((data) => {
		data[0][0].addProducts(data[1], { through: { price: data[1].price, quantity: qty } })
		.then(()=>{ Order.findOne({ where: { userId }, 	include: [{ model: Product }, { model: User } ] }).then(order => { 			return res.status(OK).json({ 				message: "ítem añadido al carrito", 				data: order 			})
			})
 	   })
	})
	.catch((err) => {
		res.send({errro: 'Error POST'})
	});
});


//End routes
module.exports = server;