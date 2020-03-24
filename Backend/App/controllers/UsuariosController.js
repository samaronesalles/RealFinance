const CheckUser = require('./validacoes/usuarios');
const Usuario = require('../models/UsuariosModel');
const Crypt = require('../Utils/encryption');
const atributos_Usuarios = ['id', 'nome', 'email', 'senha'];

module.exports = {

    // Métodos CRUD
    async novoUsuario(req, res) {                                           // Testado: OK
        console.log('chegou em "Controllers>UsuariosController.novoUsuario"');

        try {
            const { nome, email, senha } = req.body;

            CheckUser.CamposObrigatorios(req, res);

            const usario_temp = await Usuario.findOne({ where: { email: email } });

            if (usario_temp) {
                throw new Error("email de usuário já registrado.");
            }

            // codificando a senha informada
            let pass = senha;
            pass = Crypt.encrypt(pass);

            req.body['senha'] = pass;

            // Criando usuário no banco de dados
            let novo_usuario = await Usuario.create(req.body);

            // sempre que criar um novo usuário, em caso de sucesso, o retornaremos com todos os dados.
            novo_usuario = await Usuario.findByPk(novo_usuario.id, {
                attributes: atributos_Usuarios,
            });

            return res.json(novo_usuario);

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }

    },

    async listaUsuarios(req, res) {                                         // Testado: OK
        console.log('chegou em "Controllers>UsuariosController.ListaUsuarios"');

        try {

            const usuarios = await Usuario.findAll({
                attributes: atributos_Usuarios,
            });

            return res.json(usuarios);

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }

    },

    async dadosUsuario(req, res) {                                          // Testado: OK
        console.log('chegou em "controller>UsuariosController.DadosUsuario"');

        const { email } = req.body;

        try {

            if (!email)
                throw new Error("É obrigatório o 'email' no corpo da requisição.");

            const usuarioEncontrado = await Usuario.findOne({
                where: { email: email },
                attributes: atributos_Usuarios,
            });

            if (!usuarioEncontrado)
                throw new Error("Usuário não encontrado.");

            // let pass = usuarioEncontrado.senha;
            // pass = Crypt.decrypt(pass);

            // usuarioEncontrado['senha'] = pass;

            return res.json(usuarioEncontrado);

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }

    },

    async atualizarUsuario(req, res) {                                      // Testado: OK
        console.log('chegou em "controller>UsuariosController.atualizarUsuario"');

        try {

            const { name, email, senha } = req.body;

            if (!email)
                throw new Error("É obrigatório o 'email' no corpo da requisição.");

            let usuarioEncontrado = await Usuario.findOne({
                where: { email: email },
            });

            if (!usuarioEncontrado)
                throw new Error("Usuário não encontrado.");

            CheckUser.CamposObrigatorios(req, res);

            let pass = senha;
            if (pass) {
                pass = Crypt.encrypt(pass);
                req.body['senha'] = pass;
            }

            await usuarioEncontrado.update(req.body, {
                where: {
                    email: email
                },
                returning: true,
                plain: true
            });

            usuarioEncontrado = await Usuario.findByPk(usuarioEncontrado.id, {
                attributes: atributos_Usuarios,
            });

            return res.json(usuarioEncontrado);

        } catch (error) {
            return res.status(400).json({ error: error.message });
        };

    },

    async deleteUsuario(req, res) {                                         // Testado: OK
        console.log('chegou em "controller>UsuariosController.deleteUsuario"');

        try {
            const { email } = req.body;
            let usuarioEncontrado = await Usuario.findOne({
                where: { email: email },
            });

            if (!usuarioEncontrado)
                throw new Error("Usuário não encontrado.");

            await usuarioEncontrado.destroy({
                where: {
                    email: email,
                }
            });

            return res.json({});

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }

    },


    // Métodos úteis
    async AutenticaLogin(req, res) {                                        // Testado: OK
        console.log('chegou em "controller>UsuariosController.AutenticaLogin"');

        let { email, senha } = req.body;

        try {

            if (!email)
                throw new Error("O email do usuário é obrigatório.");

            if (!senha)
                throw new Error("A senha do usuário é obrigatório.");

            const usuarioEncontrado = await Usuario.findOne({
                where: {
                    email: email,
                },
                attributes: atributos_Usuarios,
            });

            if (!usuarioEncontrado)
                throw new Error("email ou senha informados estão incorretos, ou o usuário não existe.");

            let pass = usuarioEncontrado.senha;
            pass = Crypt.decrypt(pass);

            if (pass === senha) {
                req.session.user = usuarioEncontrado;
                return res.json(usuarioEncontrado);
            }
            else
                throw new Error("email ou senha informados estão incorretos, ou o usuário não existe.");


        } catch (error) {
            return res.status(400).json({ error: error.message });
        }

    },

    async auth(req, res) {
        return res.json(req.session.user);
    }

};