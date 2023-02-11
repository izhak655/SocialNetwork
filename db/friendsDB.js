const { sequelize, DataTypes } = require('sequelize')
const db = require('./sql')


let Friends =  db.define('Friends', {
    friendOne: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // foreignKey: friendOne
      },
      friendTwo: {
        type: DataTypes.INTEGER,
        allowNull:false
        // allowNull defaults to true
      },

})
module.exports = Friends
