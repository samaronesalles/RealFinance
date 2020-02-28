const express = require("express");
const routes = express.Router();

// Controllers
const userController = require('../controllers/UsuariosController');

// Usuários
routes.get('/users', userController.getUsuarios);                                              // Testado: OK

module.exports = routes;