const { Op } = require("sequelize");
const moment = require('moment');

const Lancamento = require('../models/LctosModel');
const LancamentoFixo = require('../models/LctosFixosModel');
const Categoria = require('../models/CategoriasModel');
const Utils = require('../Utils/functions');
const auth = require('../routes/middleware/auth');
const CheckLancamento = require('../controllers/validacoes/lancamentos');

module.exports = {

    async novoLancamento(req, res) {                                           // Testado: OK
        console.log('chegou em "Controllers>LctosController.novoLancamento"');

        try {
            const { lancamento_fixo, data_vencimento, data_pagamento } = req.body;

            CheckLancamento.CamposObrigatorios(req, res);

            req.body['usuarios_id'] = req.session.user.id;
            req.body['data_vencimento'] = Utils.ddmmaaa_aaaammdd(req.body['data_vencimento']);

            if ((data_pagamento) && (data_pagamento.length == 10)) {
                req.body['ja_pago'] = true;
                req.body['data_pagamento'] = Utils.ddmmaaa_aaaammdd(req.body['data_pagamento']);
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
        console.log('chegou em "Controllers>LctosController.novoLancamento"');

        try {
            const { categoria_id, vencimento_de, vencimento_ate } = req.body;

            // Montando filtro...
            let condicaoWhere = {
                usuarios_id: req.session.user.id,
            }

            if (categoria_id > 0)
                condicaoWhere["categoria_id"] = categoria_id;

            let primeiroDia = moment().startOf('month').format("YYYY-MM-DD");
            let ultimoDia = moment().endOf('month').format("YYYY-MM-DD");

            if (((vencimento_de) && (vencimento_ate)) && ((vencimento_de.length == 10) && (vencimento_ate.length == 10))) {
                primeiroDia = Utils.ddmmaaa_aaaammdd(vencimento_de);
                ultimoDia = Utils.ddmmaaa_aaaammdd(vencimento_ate);
            };

            const data_vencimento = { [Op.between]: [primeiroDia, ultimoDia] };
            condicaoWhere["data_vencimento"] = data_vencimento;

            // Pesquisando...
            const lancamentos = await Lancamento.findAll({
                where: condicaoWhere,
                attributes: ['id', ['data_vencimento', 'vencimento'], 'descricao', 'ja_pago'],
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
                });
            }



            return res.status(200).json(lancamentos);

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

};