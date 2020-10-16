const server = require('express').Router(); //Import router from express module.
const { OK, CREATED, UPDATED, ERROR, NOT_FOUND, ERROR_SERVER } = require('../constants'); // Import Status constants.
const { User, Order } = require('../db.js'); // Import Products model.
const {status} = require('sequelize'); // Import operator from sequelize module.



// Start routes
//console.log("this " + Product.findAll().then(dta => console.log("Into the THEN")))
//// 'Get products' route in '/'
server.get('/', ( req, res ) => {
	//Product.findAll().then(products => res.status(STATUS.OK).json({message: 'Success',data: products})
	Product.findAll({
		include:Categories
	}) 
		.then(products => {
			return res.status(OK).json({
				message: 'Success',
				data: products
			})
		})
		.catch(err => {
            return res.status(ERROR_SERVER).json({
                message: 'Hubo un error en el servidor',
                data: err
            })
        })
})

//End routes
module.exports = server;
