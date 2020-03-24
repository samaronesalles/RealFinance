const CheckCat = require('./validacoes/categorias');
const Categoria = require('../models/CategoriasModel');
const Utils = require('../Utils/functions');
const atributos_Contegorias = ['id', 'nome', 'descricao', 'cor'];

module.exports = {

    // Métodos CRUD
    async novaCategoria(req, res) {                                           // Testado: OK
        console.log('chegou em "Controllers>CategoriasController.novaCategoria"');

        try {
            const { nome, tipo } = req.body;

            CheckCat.CamposObrigatorios(req, res);

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
    },

    async dadosCategoria(req, res) {                                          // Testado: OK
        console.log('chegou em "Controllers>CategoriasController.dadosCategoria"');

        try {

            const { id } = req.params;

            if (!id) {
                throw new Error('É obrigatório informar o id da categoria');
            }

            let categoria = await Categoria.findByPk(id, { atributes: atributos_Contegorias });

            if (!categoria) {
                throw new Error(`Categoria id '${id}' não encontrada no cadastro.`);
            }

            if (categoria) {
                const i = categoria.dataValues["receita_ou_despesa"];

                delete categoria.dataValues.receita_ou_despesa;
                delete categoria.dataValues.createdAt;
                delete categoria.dataValues.updatedAt;

                categoria.dataValues["tipo"] = Utils.IntToRecDesp(i);
            }

            return res.json(categoria);

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    async deleteCategoria(req, res) {                                         // Testado: OK
        console.log('chegou em "Controllers>CategoriasController.deleteCategoria"');

        try {

            const { id } = req.params;

            if (!id) {
                throw new Error('É obrigatório informar o id da categoria');
            }

            const categoria = await Categoria.findByPk(id);

            if (!categoria) {
                throw new Error(`Categoria id '${id}' não encontrada no cadastro.`);
            }

            if (CheckCat.totalEmLancamentos(req, res) > 0.0) {
                throw new Error(`Categoria id '${id}' não pode ser excluída, por possuir lançamentos financeiros vinculados a ela.`);
            }

            await categoria.destroy({
                where: {
                    id: id
                }
            });

            return res.json();

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    async atualizarCategoria(req, res) {                                      // Testado: 
        console.log('chegou em "Controllers>CategoriasController.atualizarCategoria"');

        try {

            const { id } = req.params;

            if (!id) {
                throw new Error('É obrigatório informar o id da categoria');
            }

            CheckCat.CamposObrigatorios(req, res);

            let categoria = await Categoria.findByPk(id);

            if (!categoria) {
                throw new Error(`Categoria id '${id}' não encontrada no cadastro.`);
            }

            const tipoConvertido = Utils.RecDespToInt(req.body['tipo']);
            delete tipoConvertido['tipo'];

            req.body['receita_ou_despesa'] = tipoConvertido;

            await categoria.update(req.body, {
                where: {
                    id: id
                },
                returning: true,
                plain: true
            });

            categoria.dataValues['tipo'] = Utils.IntToRecDesp(categoria.dataValues['receita_ou_despesa']);

            delete categoria.dataValues.receita_ou_despesa;
            delete categoria.dataValues.createdAt;
            delete categoria.dataValues.updatedAt;

            return res.json(categoria);

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

};