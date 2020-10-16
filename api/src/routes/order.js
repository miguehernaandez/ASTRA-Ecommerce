const server = require('express').Router(); //Import router from express module.
const { OK, CREATED, UPDATED, ERROR, NOT_FOUND, ERROR_SERVER } = require('../constants'); // Import Status constants.
const { Order } = require('../db.js'); // Import Products model.
// const {status} = require('sequelize'); // Import operator from sequelize module.



// Start routes
//// 'Get order' route in '/?query={value}'

server.post ('/',( req, res ) => {
	const { key, price, quantity, total, date, status } = req.body;

	return Order.create({ key, price, quantity, total, date, status })
		.then((order) => {
			return res.status(OK).json({
				message: 'Orden creada exitosamente!',
				data: order,
			});
		})
		.catch((err) => {
			return res.status(ERROR).json({
				message: 'Error al crear la orden',
				data: err,
			});
		});
});

server.get ('/',( req, res ) => {
	Order.findAll({
		where: {
			status: req.query.status
		}
	}) 
		.then(orders => {
			return res.status(OK).json({
				message: 'Success',
				data: orders
			})
		})
		.catch(err => {
            return res.status(ERROR_SERVER).json({
                message: 'Hubo un error en el servidor',
                data: err
            })
        })
});

//End routes
module.exports = server;