function CamposObrigatorios(req, res) {

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

function totalEmLancamentos(req, res) {

    // Quando tiver tabela de lançamentos financeiros... Implementar esta função.
    const { id } = req.params;

    const valorTotal = 0.0; // retornar total(em R$) de lançamentos feitos para esta categaria ( id )

    return valorTotal;
}

module.exports = { CamposObrigatorios, totalEmLancamentos };