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

    if (typeof req.body.tipo === "undefined") {
        throw new Error("campo 'tipo' é obrigatório.");
    }

    if ((req.body.tipo != 0) && (req.body.tipo != 1)) {
        if ((req.body.tipo.toUpperCase() != 'DESPESA') && (req.body.tipo.toUpperCase() != 'RECEITA')) {
            throw new Error("campo 'tipo' deve ser apenas 'despesa' ou 'receita'.");
        }
    }

}

function totalEmLancamentos(req, res) {

    // Quando tiver tabela de lançamentos financeiros... Implementar esta função.
    const { id } = req.params;

    // dsfdsfsdf

    const valorTotal = 10.4; // retornar total(em R$) de lançamentos feitos para esta categaria ( id )

    return valorTotal;
}

module.exports = { CamposObrigatorios, totalEmLancamentos };