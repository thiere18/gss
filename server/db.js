const dotenv =require('dotenv')
dotenv.config({ path: './.env' })
const Sequelize = require('sequelize');

const db = new Sequelize('gss', 'root', 'root', {
    host: 'mysqldb',
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
      logging:false
    },
  });
  
module.exports = db