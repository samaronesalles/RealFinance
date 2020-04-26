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

module.exports = { CamposObrigatorios };