const Categoria = require('../models/CategoriasModel');
const Utils = require('../Utils/functions');
const atributos_Contegorias = ['id', 'descricao', 'tipo'];

module.exports = {

    // Métodos CRUD
    async novaCategoria(req, res) {                                           // Testado: OK
        console.log('chegou em "Controllers>CategoriasController.novaCategoria"');

        try {
            const { descricao, tipo } = req.body;

            if (!descricao) {
                throw new Error("campo 'descricao' é obrigatório.");
            }

            if (!tipo) {
                throw new Error("campo 'tipo' é obrigatório.");
            }

            if ((tipo != 'despesa') && (tipo != 'receita')) {
                throw new Error("campo 'tipo' deve ser apenas 'despesa' ou 'receita'.");
            }

            const cat_temp = await Categoria.findOne({ where: { descricao: descricao, receita_ou_despesa: Utils.RecDespToInt(tipo) } });

            if (cat_temp) {
                throw new Error(`Categoria '${descricao}' já cadastrada para o tipo '${tipo}'.`);
            }

            // Criando categoria no banco de dados
            const tipoConvertido = Utils.RecDespToInt(req.body['tipo']);
            delete tipoConvertido['tipo'];

            req.body['receita_ou_despesa'] = tipoConvertido;

            let novaCategoria = await Categoria.create(req.body);

            // sempre que criar uma nova categoria, em caso de sucesso, o retornaremos com todos os dados.
            novaCategoria = await Categoria.findByPk(novaCategoria.id);

            novaCategoria['tipo'] = Utils.IntToRecDesp(novaCategoria['receita_ou_despesa']);
            delete novaCategoria['receita_ou_despesa'];

            return res.json(novaCategoria);

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }

    },

    async listaCategorias(req, res) {                                         // Testado: OK
        console.log('chegou em "Controllers>CategoriasController.listaCategorias"');

        try {

            let categorias = await Categoria.findAll({ atributes: atributos_Contegorias });

            if (categorias) {
                categorias.map((item) => {
                    const i = item.dataValues["receita_ou_despesa"];

                    delete item.dataValues.receita_ou_despesa;
                    delete item.dataValues.createdAt;
                    delete item.dataValues.updatedAt;

                    item.dataValues["tipo"] = Utils.IntToRecDesp(i);
                });
            }

            return res.json(categorias);

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

};