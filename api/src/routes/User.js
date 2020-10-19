const server = require('express').Router(); //Import router from express module.
const { User, Order } = require('../db.js'); // Import Categories model.
const { OK, CREATED, UPDATED, ERROR, NOT_FOUND, ERROR_SERVER } = require('../constants'); // Import Status constants.

// Start Routes

//// 'Create User' route in '/'

server.post('/', function (req, res) {
	const { personId, email, password, role } = req.body;

	return User.create({ personId, email, password, role })
		.then((user) => {
			return res.status(CREATED).json({
				message: 'Usuario creado exitosamente!',
				data: user,
			});
		})
		.catch((err) => {
			return res.status(ERROR).json({
				message: 'Error al crear usuario',
				data: err,
			});
		});
});

server.get('/', (req, res) => {
	//Product.findAll().then(products => res.status(STATUS.OK).json({message: 'Success',data: products})
	// res.send('andó');
	User.findAll()
		.then((users) => {
			return res.status(OK).json({
				message: 'Success',
				data: users,
			});
		})
		.catch((err) => {
			return res.status(ERROR_SERVER).json({
				message: 'Hubo un error en el servidor',
				data: err,
			});
		});
});

server.put('/:id', (req, res) => {
    const { id } = req.params;
    const { email, password } = req.body;
    return User.findOne({ where:{ id } })
         .then(user => {             
            let oldUser = user;
            user.email = email;
			user.password = password;
            user.save()
            return res.send({
                message:`Se ha actualizado el usuario correctamente!`,
                data: user
                })
         })
         .catch(err => {
            return res.status(ERROR).json({
                message: 'Hubo un error al modificar el usuario',
                data: err
            })
        })
 });

 server.get('/:id/order', (req, res) => {
	const { id } = req.params;
	return Order.findAll()
 })


// End Routes

module.exports = server;
