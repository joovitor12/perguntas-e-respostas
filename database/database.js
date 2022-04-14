const Sequelize = require('sequelize')
const conn = new Sequelize('perguntas-e-respostas', 'root', '17060220a', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = conn;