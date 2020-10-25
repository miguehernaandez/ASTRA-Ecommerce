const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
	const User = sequelize.define('user', {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		role: {
			type: DataTypes.ENUM('client', 'admin', 'Guest'),
			defaultValue: 'Guest',
			allowNull: false,
		},
		salt: {
			type: DataTypes.STRING,
		},
	});

	User.encryptPassword = function (password) {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
	};
	User.comparePassword = function (password, userPassword) {
		console.log(userPassword);
		console.log(password);
		return bcrypt.compareSync(password, userPassword);
	};
};
