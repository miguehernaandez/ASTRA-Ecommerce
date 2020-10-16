const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('users', {
        // personId:{
        //     type:DataTypes.INTEGER,
        //     allowNull:false,
        // },
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
        },
        role:{
            type:DataTypes.ENUM(['admin', 'user']),
            allowNull:false,
        }
	});
};
