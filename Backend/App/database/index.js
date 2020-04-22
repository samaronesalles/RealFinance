const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

// Importando models criados...
const Usuario = require('../models/UsuariosModel');
const Categoria = require('../models/CategoriasModel');
const Lancamento = require('../models/LctosModel');

// criando conexão com o banco de dados...
const connection = new Sequelize(dbConfig);

// para cada model, "instanciar" chamando seu método init, passando a nossa conexão por parâmetro...
Usuario.init(connection);
Categoria.init(connection);
Lancamento.init(connection);

Categoria.associate(connection.models);
Lancamento.associate(connection.models);

module.exports = connection;