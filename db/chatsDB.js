const { sequelize, DataTypes } = require('sequelize')
const db = require('./sql')

let Chats = db.define('Chats', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    domain: {
        type: DataTypes.STRING,
        allowNull: false
        // allowNull defaults to true
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    },

    ofensive: {
        type: DataTypes.INTEGER,
        defaultValue: false 
    },

})
module.exports = Chats

