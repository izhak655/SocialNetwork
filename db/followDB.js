const { sequelize, DataTypes } = require('sequelize')
const db = require('./sql')


let follow =  db.define('follow', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // foreignKey: friendOne
      },
      followers: {
        type: DataTypes.INTEGER,
        allowNull:false
        // allowNull defaults to true
      },

})
module.exports = follow
