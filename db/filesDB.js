const { sequelize, DataTypes } = require('sequelize')
const db = require('./sql')

let Files = db.define('Files', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    domain: {
        type: DataTypes.STRING,
        allowNull: false
        // allowNull defaults to true
    },
    fileName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fileTitle: {
        type: DataTypes.STRING,
        allowNull: false
    },

    ofensive: {
        type: DataTypes.INTEGER,
        defaultValue: false 
    },
    rating: {
        type: DataTypes.INTEGER,
    },

})
module.exports = Files

