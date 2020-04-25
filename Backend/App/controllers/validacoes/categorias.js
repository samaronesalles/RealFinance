const sequelize = require('sequelize');
const Lancamento = require('../../models/LctosModel');

function CamposObrigatorios(id) {

    if (!req.body.nome) {
        throw new Error("campo 'nome' é obrigatório.");
    }

    if (!req.body.descricao) {
        throw new Error("campo 'descricao' é obrigatório.");
    }

    if (!req.body.cor) {
        throw new Error("campo 'cor' é obrigatório.");
    }

    if (typeof req.body.tipo === "undefined") {
        throw new Error("campo 'tipo' é obrigatório.");
    }

    if ((req.body.tipo != 0) && (req.body.tipo != 1)) {
        if ((req.body.tipo.toUpperCase() != 'DESPESA') && (req.body.tipo.toUpperCase() != 'RECEITA')) {
            throw new Error("campo 'tipo' deve ser apenas 'despesa' ou 'receita'.");
        }
    }

}

async function totalEmLancamentos(id) {

    try {

        const soma = await Lancamento.findAll({
            attributes: [
                [sequelize.fn('sum', sequelize.col('valor')), 'valorTotal'],
            ],
            where: { categoria_id: id },
        });

        if (soma[0].dataValues.valorTotal === null)
            return 0.0;
        else
            return soma[0].dataValues.valorTotal;

    } catch {
        return 0.0;
    };

}

module.exports = { CamposObrigatorios, totalEmLancamentos };