const { Op, Sequelize } = require("sequelize");
const moment = require('moment');

const Lancamento = require('../models/LctosModel');
const LancamentoFixo = require('../models/LctosFixosModel');
const Categoria = require('../models/CategoriasModel');
const Utils = require('../Utils/functions');
const auth = require('../routes/middleware/auth');
const UtilsLancamento = require('../controllers/validacoes/lancamentos');

module.exports = {

    async novoLancamento(req, res) {                                           // Testado: OK
        console.log('chegou em "Controllers>LctosController.novoLancamento"');

        try {
            const { lancamento_fixo, data_pagamento, ja_pago } = req.body;

            UtilsLancamento.CamposObrigatorios(req, res);

            req.body['usuarios_id'] = req.session.user.id;
            req.body['data_vencimento'] = moment(req.body['data_vencimento'], 'DD/MM/YYYY').format("YYYY-MM-DD");

            if (ja_pago) {
                req.body['data_pagamento'] = moment().format("YYYY-MM-DD");
            } else {
                req.body['ja_pago'] = false;
                delete req.body['data_pagamento'];
            }

            const Lcto = await Lancamento.create(req.body);

            if ((lancamento_fixo) && (Lcto.id > 0)) {
                LctoFixo = await LancamentoFixo.create({ lancamento_id: Lcto.id })
            }

            return res.status(200).json(Lcto);

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }

    },

    async lancamentosFinanceiros(req, res) {                                   // Testado: OK
        console.log('chegou em "Controllers>LctosController.lancamentosFinanceiros"');

        try {
            const { categoria_id, vencimento_de, vencimento_ate } = req.body;

            let resultado = [];

            // Montando filtro...
            let condicaoWhere = {
                usuarios_id: req.session.user.id,
            }

            if (categoria_id > 0)
                condicaoWhere["categoria_id"] = categoria_id;

            let primeiroDia = moment().startOf('month').format("YYYY-MM-DD");
            let ultimoDia = moment().endOf('month').format("YYYY-MM-DD");

            if (((vencimento_de) && (vencimento_ate)) && ((vencimento_de.length == 10) && (vencimento_ate.length == 10))) {

                if (!moment(vencimento_de, 'DD/MM/YYYY').isValid()) {
                    throw new Error('A data inicial do filtro é inválida');
                }

                if (!moment(vencimento_ate, 'DD/MM/YYYY').isValid()) {
                    throw new Error('A data final do filtro é inválida');
                }

                if (moment(vencimento_de, 'DD/MM/YYYY').isAfter(moment(vencimento_ate, 'DD/MM/YYYY'))) {
                    throw new Error('A data final do período do filtro é superior à data inicial.');
                }

                primeiroDia = moment(vencimento_de, 'DD/MM/YYYY').format("YYYY-MM-DD");
                ultimoDia = moment(vencimento_ate, 'DD/MM/YYYY').format("YYYY-MM-DD");
            };

            const data_vencimento = { [Op.between]: [primeiroDia, ultimoDia] };
            condicaoWhere["data_vencimento"] = data_vencimento;

            // Pesquisando lançamentos...
            const lancamentos = await Lancamento.findAll({
                where: condicaoWhere,
                attributes: ['id', ['data_vencimento', 'vencimento'], 'descricao', 'valor', 'ja_pago'],
                include: [
                    {
                        model: Categoria, as: 'categoria',
                        attributes: [['id', 'categoria_id'], ['nome', 'categoria_desc'], 'cor', 'receita_ou_despesa'],
                    },
                ],
                order: [
                    ['data_vencimento', 'desc']
                ],
            });

            if (lancamentos) {
                lancamentos.map((item) => {
                    const i = item.categoria.dataValues["receita_ou_despesa"];
                    item.categoria.dataValues["receita_ou_despesa_desc"] = Utils.IntToRecDesp(i);
                    item.dataValues["lancamento_origem"] = -1;

                    let itemTemp = Object.assign({}, item.dataValues);
                    resultado.push(itemTemp);
                });
            }


            // Exibindo fixos
            const lancamentosFixos = await LancamentoFixo.findAll({
                attributes: ['id'],
                include: [
                    {
                        model: Lancamento,
                        where: condicaoWhere,
                        attributes: ['id', ['data_vencimento', 'vencimento'], 'descricao', 'valor', 'ja_pago'],
                        include: [
                            {
                                model: Categoria, as: 'categoria',
                                attributes: [['id', 'categoria_id'], ['nome', 'categoria_desc'], 'cor', 'receita_ou_despesa'],
                            },
                        ],
                    }
                ],
            });

            // const lactosGambiarra = await Lancamento.findAll({
            //     attributes: ['id', ['data_vencimento', 'vencimento'], 'descricao', 'valor', 'ja_pago'],
            //     include: [
            //         {
            //             model: Categoria, as: 'categoria',
            //             attributes: [['id', 'categoria_id'], ['nome', 'categoria_desc'], 'cor', 'receita_ou_despesa'],
            //         },
            //         {
            //             model: LancamentoFixo, as: 'LancamentoFixo',
            //             attributes: [],
            //             lancamento_id: null,
            //             required: false,
            //         }
            //     ],
            //     where: {
            //         lancamento_fixo: 1,
            //         '$LancamentoFixo.lancamento_id$': null,
            //     },
            // });

            if (lancamentosFixos) {
                lancamentosFixos.map((item) => {
                    const i = item.Lancamento.categoria.dataValues["receita_ou_despesa"];
                    item.Lancamento.categoria.dataValues["receita_ou_despesa_desc"] = Utils.IntToRecDesp(i);
                    item.Lancamento.dataValues["lancamento_origem"] = item.Lancamento.id;

                    let dataDoItem = moment(item.Lancamento.dataValues["vencimento"]).format("YYYY-MM-DD");
                    let inicio = moment(dataDoItem);
                    let fim = moment(ultimoDia);

                    while (inicio <= fim) {
                        dataDoItem = moment(moment(dataDoItem).set('month', moment(inicio).month())).format("YYYY-MM-DD");

                        //const pos = resultado.findIndex((atual) => ((atual.id === item.Lancamento.dataValues.id) && (atual.vencimento === dataDoItem)));
                        const pos = resultado.findIndex(
                            (atual) => (
                                ((atual.id === item.Lancamento.dataValues.id) && (atual.vencimento === dataDoItem))
                                ||
                                (
                                    (atual.vencimento === dataDoItem) &&
                                    (atual.descricao === item.Lancamento.descricao) &&
                                    (atual.valor === item.Lancamento.valor) &&
                                    (atual.categoria.categoria_id === item.Lancamento.categoria.categoria_id)
                                )
                            )
                        );

                        if (pos < 0) {
                            let itemTemp = Object.assign({}, item.Lancamento.dataValues);

                            itemTemp.id = -1;
                            itemTemp.vencimento = dataDoItem;
                            itemTemp.ja_pago = false;

                            const novaPosicao = UtilsLancamento.novaPosicao_OrderVencimento_Desc(resultado, moment(dataDoItem));

                            if (novaPosicao >= 0) {
                                resultado.splice(novaPosicao, 0, itemTemp);
                            }

                        }

                        inicio = moment(inicio).add(1, 'months').calendar();
                        inicio = moment(moment(inicio).format('YYYY-MM-DD'));
                    }

                });
            }


            return res.status(200).json(resultado);

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    async atualizarLancamento(req, res) {
        console.log('chegou em "Controllers>LctosController.atualizarLancamento"');

        try {
            const { id } = req.params;
            const { lancamento_fixo, ja_pago, lancamento_origem } = req.body;
            let lctoJaEraFixo = false;
            let Lcto = undefined;

            if (!id) {
                throw new Error('É obrigatório informar o id do lancamento');
            }

            if (ja_pago === undefined) {
                throw new Error('É obrigatório informar "ja_pago" do lancamento');
            }

            UtilsLancamento.CamposObrigatorios(req, res);

            const novoLancto = id < 0;

            if (!novoLancto) {
                Lcto = await Lancamento.findByPk(id);

                if (!Lcto) {
                    throw new Error(`Lancamento id '${id}' não encontrada no cadastro.`);
                }

                lctoJaEraFixo = Lcto.lancamento_fixo
            } else {
                if (lancamento_origem <= 0) {
                    throw new Error(`O id do lancamento de origem é obrigatório.`);
                } else {
                    Lcto = await Lancamento.findByPk(lancamento_origem);

                    if (!Lcto) {
                        throw new Error(`Lancamento id '${id}' não encontrada no cadastro.`);
                    }

                    lctoJaEraFixo = Lcto.lancamento_fixo
                }
            }

            req.body['usuarios_id'] = req.session.user.id;
            req.body['data_vencimento'] = moment(req.body['data_vencimento'], 'DD/MM/YYYY').format("YYYY-MM-DD");

            if (!ja_pago) {
                delete req.body['data_pagamento'];
            } else {
                if (novoLancto) {
                    req.body['data_pagamento'] = moment().format("YYYY-MM-DD");
                }
            }

            if (novoLancto) {
                Lcto = await Lancamento.create(req.body);
            } else {

                await Lcto.update(req.body, {
                    where: {
                        id: id
                    },
                    returning: true,
                    plain: true
                });


                if ((lctoJaEraFixo) && (!lancamento_fixo)) {
                    await LancamentoFixo.destroy({
                        where: {
                            lancamento_id: Lcto.id
                        }
                    });
                }


                if ((!lctoJaEraFixo) && (lancamento_fixo)) {
                    LctoFixo = await LancamentoFixo.create({ lancamento_id: Lcto.id })
                }

            }


            return res.status(200).json(Lcto);

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    async totaisNoPeriodo(req, res) {
        console.log('chegou em "Controllers>LctosController.totaisNoPeriodo"');

        try {
            const { mes } = req.body;

            if ((mes < 1) && (mes > 12)) {
                throw new Error('O mês selecionado é inválido.');
            }

            const ano = moment().format("YYYY");

            let data_de = moment(ano + '-' + mes + '-' + '01').startOf('month').format("YYYY-MM-DD");
            let data_ate = moment(data_de).endOf('month').format("YYYY-MM-DD");

            // Montando filtro...
            let condicaoWhere = {
                usuarios_id: req.session.user.id,
            }

            const data_pagamento = { [Op.between]: [data_de, data_ate] };
            condicaoWhere["data_pagamento"] = data_pagamento;

            const totalReceitas = await Lancamento.findAll({
                attributes: [[Sequelize.fn('sum', Sequelize.col('valor')), 'totalReceita']],
                include: [
                    {
                        attributes: [],
                        model: Categoria, as: 'categoria',
                        where: { receita_ou_despesa: Utils.RecDespToInt('R') }
                    },
                ],
                where: condicaoWhere,
            });

            const totalDespesas = await Lancamento.findAll({
                attributes: [[Sequelize.fn('sum', Sequelize.col('valor')), 'totalDespesa']],
                include: [
                    {
                        attributes: [],
                        model: Categoria, as: 'categoria',
                        where: { receita_ou_despesa: Utils.RecDespToInt('D') }
                    },
                ],
                where: condicaoWhere,
            });

            let receitas = 0.0;
            try {
                if (totalReceitas[0].dataValues.totalReceita > 0.0)
                    receitas = totalReceitas[0].dataValues.totalReceita;
            } catch ({ }) {
                receitas = 0.0;
            }


            let despesas = 0.0;
            try {
                if (totalDespesas[0].dataValues.totalDespesa > 0.0)
                    despesas = totalDespesas[0].dataValues.totalDespesa;
            } catch ({ }) {
                despesas = 0.0;
            }


            return res.status(200).json({
                total_Receitas: receitas,
                total_Despesa: despesas,
                saldo_Geral: receitas - despesas,
            });

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

};