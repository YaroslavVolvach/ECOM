require('dotenv').config();

const Sequelize = require('sequelize');

module.exports =  new Sequelize('ecommerce_db', 'root', 'qwertyqwerty', {host: 'localhost', dialect: 'mysql'});


