const Sequelize = require('sequelize')
const db = require('../db')
const User = db.define('user', { 
  
    id:{ 
  
        type:Sequelize.INTEGER, 
        autoIncrement:true, 
        allowNull:false, 
        primaryKey:true
    }, 
    username: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    role: {
        type: Sequelize.ENUM('employee', 'super_admin'),
        defaultValue: 'employee'
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
 } ,
 updatedAt: {
     type: Sequelize.DATE,
     allowNull: true
} ,
}) 
// User.sync({force: true })
module.exports = User
