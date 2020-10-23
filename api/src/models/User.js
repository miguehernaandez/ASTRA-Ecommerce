const Sequelize = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('user', {
		email: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false,
			// Poner esta funcion aca hace que estos datos no aparezcan en queries como user.findAll()
			get() {
				return () => this.getDataValue('password');
			},
		},
		role: {
			type: Sequelize.ENUM('client', 'admin', 'Guest'),
			defaultValue: 'Guest',
			allowNull: false,
		},
		// Esto se utiliza para la encriptacion de la contrasena
		salt: {
			type: Sequelize.STRING,
			get() {
				return () => this.getDataValue('salt');
			},
		},
	});
};
