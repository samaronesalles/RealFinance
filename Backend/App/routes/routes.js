const express = require("express");
const routes = express.Router();

// Controllers
const userController = require('../controllers/UsuariosController');
const CatController = require('../controllers/CategoriasController');

// Usuários
routes.post('/users', userController.novoUsuario);                                             // Testado: OK
routes.get('/users', userController.listaUsuarios);                                            // Testado: OK
routes.post('/userLogin', userController.AutenticaLogin);                                      // Testado: OK
routes.post('/user', userController.dadosUsuario);                                             // Testado: OK
routes.put('/user', userController.atualizarUsuario);                                          // Testado: OK
routes.delete('/user', userController.deleteUsuario);                                          // Testado: OK

// Categorias
routes.post('/cat', CatController.novaCategoria);                                              // Testado: OK

module.exports = routes;