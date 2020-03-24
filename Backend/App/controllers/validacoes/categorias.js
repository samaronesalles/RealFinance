module.exports = function (req, res) {

    if (!req.body.nome) {
        throw new Error("campo 'nome' é obrigatório.");
    }

    if (!req.body.descricao) {
        throw new Error("campo 'descricao' é obrigatório.");
    }

    if (!req.body.cor) {
        throw new Error("campo 'cor' é obrigatório.");
    }

    if (!req.body.tipo) {
        throw new Error("campo 'tipo' é obrigatório.");
    }

    if ((req.body.tipo != 'despesa') && (req.body.tipo != 'receita')) {
        throw new Error("campo 'tipo' deve ser apenas 'despesa' ou 'receita'.");
    }

}