const server = require('express').Router(); //Import router from express module.
const { User } = require('../db.js'); // Import Categories model.
const { OK, CREATED, ERROR, ERROR_SERVER } = require('../constants/index'); // Import Status constants.

// Start Routes

// 'Create User' route in '/'
server.post('/', function (req, res) {
	const { email, password, role } = req.body;
	console.log(req.body);
	User.create({ email, password, role })
		.then((user) => {
			console.log(user.id);
			return res.status(CREATED).json({
				message: 'Usuario creado exitosamente!',
				data: user,
			});
		})
		.catch((err) => {
			console.log('catch');
			return res.status(ERROR).json({
				message: 'Error al crear usuario',
				data: err,
			});
		});
});

// GET USERS
server.get('/', (req, res) => {
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

// DELETE USER
server.delete('/', (req, res) => {
	console.log('**********');
	console.log(req.query);
	const { id } = req.query;
	User.findOne({ where: { id } })
		.then((deletedUser) => {
			console.log('voy a eliminar un usuario');
			deletedUser.destroy();
			return res.status(OK).json({
				message: 'Usuario eliminado',
				data: deletedUser,
			});
		})
		.catch((err) => {
			console.log('Se me complico la eliminada');
			console.log(err);
			return res.status(ERROR_SERVER).json({
				message: 'Error al eliminar usuario',
				data: err,
			});
		});
});

// End Routes

module.exports = server;
