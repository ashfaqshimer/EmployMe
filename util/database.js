const Sequelize = require('sequelize');

const sequelize = new Sequelize('employme_db', 'root', 'admin123', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;
