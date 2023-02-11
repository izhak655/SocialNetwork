const mysql = require('mysql');
const { Sequelize, Model, DataTypes,} = require('sequelize')

const sequelize = new Sequelize('socialnetwork', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
  })
  module.exports = sequelize

  


