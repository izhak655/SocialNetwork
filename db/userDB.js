const { sequelize, DataTypes } = require('sequelize')
const db = require('./sql')



let Users = db.define('Users', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
        // allowNull defaults to true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    active: {
        type:  DataTypes.BOOLEAN,
        defaultValue: false 
    },
    randoms: {
        type: DataTypes.TEXT ,
    },
    img: {
        type: DataTypes.STRING,
    },
})
module.exports = Users



// const usera = await users.findAll();
// console.log(usera.every(user => user instanceof users)); // true
// console.log("All users:", JSON.stringify(usera, null, 2));