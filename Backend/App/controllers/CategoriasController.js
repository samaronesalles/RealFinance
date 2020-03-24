const ChecCat = require('./validacoes/categorias');
const Categoria = require('../models/CategoriasModel');
const Utils = require('../Utils/functions');
const atributos_Contegorias = ['id', 'nome', 'descricao', 'cor'];

module.exports = {

    // Métodos CRUD
    async novaCategoria(req, res) {                                           // Testado: OK
        console.log('chegou em "Controllers>CategoriasController.novaCategoria"');

        try {
            const { nome, tipo } = req.body;

            ChecCat(req, res);

            const cat_temp = await Categoria.findOne({ where: { nome: nome, receita_ou_despesa: Utils.RecDespToInt(tipo) } });

            if (cat_temp) {
                throw new Error(`Categoria '${nome}' já cadastrada para o tipo '${tipo}'.`);
            }

            // Criando categoria no banco de dados
            const tipoConvertido = Utils.RecDespToInt(req.body['tipo']);
            delete tipoConvertido['tipo'];

            req.body['receita_ou_despesa'] = tipoConvertido;

            let novaCategoria = await Categoria.create(req.body);

            // sempre que criar uma nova categoria, em caso de sucesso, o retornaremos com todos os dados.
            novaCategoria = await Categoria.findByPk(novaCategoria.id, { atributes: atributos_Contegorias });

            novaCategoria.dataValues['tipo'] = Utils.IntToRecDesp(novaCategoria.dataValues['receita_ou_despesa']);

            delete novaCategoria.dataValues.receita_ou_despesa;
            delete novaCategoria.dataValues.createdAt;
            delete novaCategoria.dataValues.updatedAt;

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