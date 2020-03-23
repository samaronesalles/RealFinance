module.exports = {
    async isLogged(req, res, next) {
        if (req.session.user){
            next();
        }
        else {
            return res.status(400).json({error: "Usuário não logado"});
        }
    }
}