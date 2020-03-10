const Categoria = require('../models/CategoriasModel');
const Utils = require('../Utils/functions');

module.exports = {

    // Métodos CRUD
    async novaCategoria(req, res) {                                           // Testado: 
        console.log('chegou em "Controllers>CategoriasController.novaCategoria"');

        try {
            const { descricao, tipo } = req.body;

            if (!descricao) {
                throw new Error("campo 'descricao' é obrigatório.");
            }

            if (!tipo) {
                throw new Error("campo 'tipo' é obrigatório.");
            }

            const cat_temp = await Categoria.findOne({ where: { descricao: descricao } });

            if (cat_temp) {
                throw new Error("Categoria já registrada.");
            }

            // Criando categoria no banco de dados
            const tipoConvertido = Utils.RecDespToInt(req.body['tipo']);
            delete tipoConvertido['tipo'];

            req.body['receita_ou_despesa'] = tipoConvertido;

            let novaCategoria = await Categoria.create(req.body);

            // sempre que criar um novo usuário, em caso de sucesso, o retornaremos com todos os dados.
            novaCategoria = await Categoria.findByPk(novaCategoria.id);

            novaCategoria['tipo'] = Utils.IntToRecDesp(novaCategoria['receita_ou_despesa']);
            delete novaCategoria['receita_ou_despesa'];

            return res.json(novaCategoria);

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }

    },

};