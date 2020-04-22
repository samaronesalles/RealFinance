const Lancamento = require('../models/LctosModel');

module.exports = {

    async novoLancamento(req, res) {                                           // Testado: 
        console.log('chegou em "Controllers>LctosController.novoLancamento"');

        try {
            auth.isLogged(req, res);


            const Lcto = { resultado: 'Olá mundo!!!' };


            return res.json(Lcto);

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }

    },
};