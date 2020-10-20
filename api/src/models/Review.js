const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define( 'review' , {

    rate: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isNumeric: true,
        isDecimal: true
      }
    },
    date_created: {
      type: DataTypes.DATE,
    },
    content: {
      type: DataTypes.TEXT,
      alloNull: false,
    }


  });
}
