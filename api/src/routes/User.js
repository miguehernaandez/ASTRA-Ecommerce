
const server = require('express').Router(); //Import router from express module.
const { Users } = require('../db.js'); // Import Categories model.
const { OK, CREATED, UPDATED, ERROR, NOT_FOUND, ERROR_SERVER } = require('../constants'); // Import Status constants.
const User = require('../models/User.js');

// Start Routes

//// 'Create User' route in '/'

server.post('/', function (req, res) {
	const { email, password } = req.body;

	return Users.create({ email, password, role })
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
	Users.findAll()
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

server.put('/category/:id', (req, res) => {
    const { id } = req.params;
    const { email, password } = req.body;
    return User.findOne({ where:{ id } })
         .then(user => {             
            let oldUser = user;
            user.email = email;
            user.password = password;
            user.save()
            return res.send({
                message:`Se ha actualizado el usuario ${oldUser.email} a ${user.email} correctamente!`,
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

// End Routes

module.exports = server;