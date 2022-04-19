const Sequelize = require('sequelize')
const conn = new Sequelize('perguntas-e-respostas', 'root', '1234567', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = conn;