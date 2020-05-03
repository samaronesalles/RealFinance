const moment = require('moment');

function CamposObrigatorios(req, res) {

    if (!req.body.categoria_id) {
        throw new Error("campo 'categoria_id' é obrigatório.");
    }

    if (!req.body.descricao) {
        throw new Error("campo 'descricao' é obrigatório.");
    }

    if (!req.body.valor) {
        throw new Error("campo 'valor' é obrigatório.");
    }

    if (!req.body.data_vencimento) {
        throw new Error("campo 'data_vencimento' é obrigatório.");
    }

}

function novaPosicao_OrderVencimento_Desc(lctos, novaData) {

    for (var i = lctos.length - 1; i >= 0; i--) {

        const dataItem = moment(lctos[i].vencimento);

        if (dataItem >= novaData)
            return i;
    }

    return 0;  // Significa que a "novaData" é maior que todas, então adiciona no topo da lista.
}

module.exports = { CamposObrigatorios, novaPosicao_OrderVencimento_Desc };