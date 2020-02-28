const express = require("express");
const routes = express.Router();

// Controllers
const userController = require('../controllers/Usuarios');

// Usuários
routes.get('/users', userController.getUsuarios);                                              // Testado: 

module.exports = routes;