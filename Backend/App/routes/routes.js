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
routes.post('/cats', auth.isLogged, CatController.novaCategoria);                                             // Testado: OK
routes.get('/cats', auth.isLogged, CatController.listaCategorias);                                            // Testado: OK
routes.get('/cats/:id', auth.isLogged, CatController.dadosCategoria);                                         // Testado: OK
routes.get('/catsComLctos/:id', auth.isLogged, CatController.dadosCategoriaComLctos);                         // Testado: OK
routes.delete('/cats/:id', auth.isLogged, CatController.deleteCategoria);                                     // Testado: OK
routes.put('/cats/:id', auth.isLogged, CatController.atualizarCategoria);                                     // Testado: OK
routes.get('/catsTotLcto/:id', auth.isLogged, CatController.TotalLancadoCategoria);                           // Testado: OK

// Lançamentos
routes.post('/novoLcto', auth.isLogged, lctoController.novoLancamento);                                       // Testado: OK
routes.post('/lancamentos', auth.isLogged, lctoController.lancamentosFinanceiros);                             // Testado: OK
routes.put('/lancamento/:id', auth.isLogged, lctoController.atualizarLancamento);                             // Testado: OK

module.exports = routes;