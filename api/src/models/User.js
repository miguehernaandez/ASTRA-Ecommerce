const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt')



module.exports = (sequelize) => {
	const User = sequelize.define('user', {
		name: {
			type: DataTypes.STRING,
			allowNull:false
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		role: {
			type: Sequelize.ENUM('client', 'admin', 'Guest'),
			defaultValue: 'Guest',
			allowNull: false,
		},
	});

	User.encryptPassword = function(password) {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(10)) 
	}	
	User.comparePassword = function(password, userPassword){
		console.log(userPassword)
		console.log(password)
		return bcrypt.compareSync(password, userPassword);
	}
};


