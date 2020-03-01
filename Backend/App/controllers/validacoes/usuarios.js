module.exports = function (req, res) {

    if (!req.body.nome)
        throw new Error("campo 'name' é obrigatório.");

    if (!req.body.email)
        throw new Error("campo 'email' é obrigatório.");

    if (!req.body.senha)
        throw new Error("campo 'senha' é obrigatório.");

}
