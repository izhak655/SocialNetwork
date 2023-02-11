const { sequelize, DataTypes } = require('sequelize')
const db = require('./sql')

let Forums = db.define('Forums', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    parent: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    replayiDForum: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    domain: {
        type: DataTypes.STRING,
        allowNull: false
        // allowNull defaults to true
    },
    title: {
        type: DataTypes.STRING,
       
    },
    message: {
        type: DataTypes.STRING,
       
    },

    ofensive: {
        type: DataTypes.INTEGER,
        defaultValue: false 
    },

    rating: {
        type: DataTypes.INTEGER,
        defaultValue: false 
    },

})
module.exports = Forums