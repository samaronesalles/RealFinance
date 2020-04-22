const express = require("express");
const routes = express.Router();

// Controllers
const userController = require('../controllers/UsuariosController');
const CatController = require('../controllers/CategoriasController');
const lctoController = require('../controllers/LctosController');
const auth = require('./middleware/auth');

// Usuários
routes.post('/users', userController.novoUsuario);                                             // Testado: OK
routes.get('/users', userController.listaUsuarios);                                            // Testado: OK
routes.post('/userLogin', userController.AutenticaLogin);                                      // Testado: OK
routes.post('/user', userController.dadosUsuario);                                             // Testado: OK
routes.put('/user', userController.atualizarUsuario);                                          // Testado: OK
routes.delete('/user', userController.deleteUsuario);                                          // Testado: OK
routes.get('/auth', auth.isLogged, userController.auth);

// Categorias
routes.post('/cats', CatController.novaCategoria);                                             // Testado: OK
routes.get('/cats', CatController.listaCategorias);                                            // Testado: OK
routes.get('/cats/:id', CatController.dadosCategoria);                                         // Testado: OK
routes.delete('/cats/:id', CatController.deleteCategoria);                                     // Testado: OK
routes.put('/cats/:id', CatController.atualizarCategoria);                                     // Testado: OK

// Lançamentos
routes.post('/novoLcto', lctoController.novoLancamento);                                       // Testado: OK

module.exports = routes;