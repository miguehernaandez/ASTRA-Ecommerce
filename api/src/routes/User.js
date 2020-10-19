const server = require('express').Router(); //Import router from express module.
const { User, Order, Product } = require('../db.js'); // Import Categories model.
const { OK, CREATED, UPDATED, ERROR, NOT_FOUND, ERROR_SERVER } = require('../constants'); // Import Status constants.

// Start Routes

//// 'Create User' route in '/'
server.post('/',   function (req, res) {
	const { email, password, role } = req.body;
	console.log(req.body);
	User.create({ email, password, role })
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

// GET USERS
server.get('/', (req, res) => {
	User.findAll()
		.then((users) => {
			users.sort(function (a, b) {
				return a.id - b.id;
			});
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

// MODIFICAR DATOS DEL USER
server.put('/', (req, res) => {
	console.log(req.body);
	console.log('*************');
	const { email, id, password, role } = req.body;

	User.findOne({ where: { email } })
		.then((user) => {
			user.password = password;
			user.role = role;
			user.save();
			return res.status(OK).json({
				message: `El usuario se ha actualizado correctamente!`,
				data: user,
			});
		})
		.catch((err) => {
			return res.status(ERROR).json({
				message: 'Error al modificar en la ruta del usuario',
				data: err,
			});
		});
});


server.get('/:id', (req, res, next) => {
	const { id } = req.params
	User.findAll({ where: { id }, include: {model: Order, include: Product }})
	.then(user => {
		console.log(user)
		res.json({
			user:user
		})
	.catch((err) => {
		return res.status(ERROR).json({
			message: 'Error al buscar User',
			data: err,
		});
	});
})
})


// End Routes

module.exports = server;
