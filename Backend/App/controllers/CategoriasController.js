const sequelize = require('sequelize');
const CheckCat = require('./validacoes/categorias');
const Categoria = require('../models/CategoriasModel');
const Usuario = require('../models/UsuariosModel');
const Lancamento = require('../models/LctosModel');
const Utils = require('../Utils/functions');
const auth = require('../routes/middleware/auth');
const atributos_Contegorias = ['id', 'nome', 'descricao', 'cor', 'receita_ou_despesa'];
const atributos_lctos = ['id', 'descricao', 'valor', 'data_vencimento', 'data_pagamento', 'ja_pago'];

module.exports = {

    // Métodos CRUD
    async novaCategoria(req, res) {                                           // Testado: OK
        console.log('chegou em "Controllers>CategoriasController.novaCategoria"');

        try {
            auth.isLogged(req, res);

            let { nome, tipo } = req.body;

            CheckCat.CamposObrigatorios(req, res);

            if ((tipo != 0) && (tipo != 1)) {
                tipo = Utils.RecDespToInt(tipo);
            }

            const cat_temp = await Categoria.findOne({ where: { nome: nome, receita_ou_despesa: tipo } });

            if (cat_temp) {
                throw new Error(`Categoria '${nome}' já cadastrada para o tipo '${tipo}'.`);
            }

            // Criando categoria no banco de dados
            const tipoConvertido = tipo;//Utils.RecDespToInt(req.body['tipo']);
            delete tipoConvertido['tipo'];

            req.body['receita_ou_despesa'] = tipoConvertido;
            req.body['usuario_id'] = req.session.user.id;

            let novaCategoria = await Categoria.create(req.body);

            // sempre que criar uma nova categoria, em caso de sucesso, o retornaremos com todos os dados.
            novaCategoria = await Categoria.findByPk(novaCategoria.id, {
                atributes: atributos_Contegorias,
                include: [
                    {
                        model: Usuario,
                        attributes: ['id', 'nome']
                    },
                ]
            });

            novaCategoria.dataValues['receita_ou_despesa_desc'] = Utils.IntToRecDesp(novaCategoria.dataValues['receita_ou_despesa']);

            //delete novaCategoria.dataValues.receita_ou_despesa;
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
            auth.isLogged(req, res);

            let categorias = await Categoria.findAll({
                where: {
                    usuario_id: req.session.user.id
                },
                atributes: atributos_Contegorias,
                include: [
                    {
                        model: Usuario,
                        attributes: ['id', 'nome']
                    },
                    {
                        model: Lancamento,
                        attributes: [[sequelize.fn('sum', sequelize.col('valor')), 'Total_Lctos']]
                    }
                ],
                group: [atributos_Contegorias],
            });

            if (categorias) {
                categorias.map((item) => {
                    const i = item.dataValues["receita_ou_despesa"];

                    //delete item.dataValues.receita_ou_despesa;
                    delete item.dataValues.createdAt;
                    delete item.dataValues.updatedAt;

                    item.dataValues["receita_ou_despesa_desc"] = Utils.IntToRecDesp(i);

                    let t_lcto = 0;
                    if (item.Lancamentos.length > 0)
                        t_lcto = item.Lancamentos[0].dataValues.Total_Lctos;

                    delete item.dataValues.Lancamentos;
                    item.dataValues["total_lancamentos"] = t_lcto;
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
            auth.isLogged(req, res);

            const { id } = req.params;

            if (!id) {
                throw new Error('É obrigatório informar o id da categoria');
            }

            let categoria = await Categoria.findByPk(id, {
                atributes: atributos_Contegorias,
                include: [
                    {
                        model: Usuario,
                        attributes: ['id', 'nome']
                    },
                ]
            });

            if (!categoria) {
                throw new Error(`Categoria id '${id}' não encontrada no cadastro.`);
            }

            if (categoria) {
                const i = categoria.dataValues["receita_ou_despesa"];

                //delete categoria.dataValues.receita_ou_despesa;
                delete categoria.dataValues.createdAt;
                delete categoria.dataValues.updatedAt;

                categoria.dataValues["receita_ou_despesa_desc"] = Utils.IntToRecDesp(i);
                categoria.dataValues["total_lancamentos"] = await CheckCat.totalEmLancamentos(id);
            }

            return res.json(categoria);

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    async dadosCategoriaComLctos(req, res) {                                  // Testado: OK
        console.log('chegou em "Controllers>CategoriasController.dadosCategoria"');

        try {
            auth.isLogged(req, res);

            const { id } = req.params;

            if (!id) {
                throw new Error('É obrigatório informar o id da categoria');
            }

            let categoria = await Categoria.findByPk(id, {
                atributes: atributos_Contegorias,
                include: [
                    {
                        model: Usuario,
                        attributes: ['id', 'nome']
                    },
                    {
                        model: Lancamento,
                        attributes: atributos_lctos,
                    },
                ],
                order: [
                    [Lancamento, 'data_vencimento', 'desc']
                ],
                group: [atributos_Contegorias],
            });

            if (!categoria) {
                throw new Error(`Categoria id '${id}' não encontrada no cadastro.`);
            }

            if (categoria) {
                const i = categoria.dataValues["receita_ou_despesa"];

                //delete categoria.dataValues.receita_ou_despesa;
                delete categoria.dataValues.createdAt;
                delete categoria.dataValues.updatedAt;

                categoria.dataValues["receita_ou_despesa_desc"] = Utils.IntToRecDesp(i);
            }

            return res.json(categoria);

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    async deleteCategoria(req, res) {                                         // Testado: OK
        console.log('chegou em "Controllers>CategoriasController.deleteCategoria"');

        try {
            auth.isLogged(req, res);

            const { id } = req.params;

            if (!id) {
                throw new Error('É obrigatório informar o id da categoria');
            }

            const categoria = await Categoria.findByPk(id);

            if (!categoria) {
                throw new Error(`Categoria id '${id}' não encontrada no cadastro.`);
            }

            if (await CheckCat.totalEmLancamentos(id) > 0.0) {
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

    async atualizarCategoria(req, res) {                                      // Testado: OK
        console.log('chegou em "Controllers>CategoriasController.atualizarCategoria"');

        try {
            auth.isLogged(req, res);
            const { id } = req.params;

            if (!id) {
                throw new Error('É obrigatório informar o id da categoria');
            }

            CheckCat.CamposObrigatorios(req, res);

            let categoria = await Categoria.findByPk(id);

            if (!categoria) {
                throw new Error(`Categoria id '${id}' não encontrada no cadastro.`);
            }

            let tipo = req.body.tipo;
            if ((req.body.tipo != 0) && (req.body.tipo != 1)) {
                tipo = Utils.RecDespToInt(tipo);
            }

            const tipoConvertido = tipo; //Utils.RecDespToInt(req.body['tipo']);
            delete tipoConvertido['tipo'];

            req.body['receita_ou_despesa'] = tipoConvertido;

            await categoria.update(req.body, {
                where: {
                    id: id
                },
                returning: true,
                plain: true
            });

            categoria.dataValues['receita_ou_despesa_desc'] = Utils.IntToRecDesp(categoria.dataValues['receita_ou_despesa']);

            //delete categoria.dataValues.receita_ou_despesa;
            delete categoria.dataValues.createdAt;
            delete categoria.dataValues.updatedAt;

            return res.json(categoria);

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    async TotalLancadoCategoria(req, res) {                                   // Testado: OK
        console.log('chegou em "Controllers>CategoriasController.TotalLancadoCategoria"');

        try {
            auth.isLogged(req, res);

            const { id } = req.params;

            if (!id) {
                throw new Error('É obrigatório informar o id da categoria');
            }

            const valor = await CheckCat.totalEmLancamentos(id);

            return res.json(valor);

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

};