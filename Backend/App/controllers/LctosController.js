const Lancamento = require('../models/LctosModel');
const LancamentoFixo = require('../models/LctosFixosModel');
const auth = require('../routes/middleware/auth');
const CheckLancamento = require('../controllers/validacoes/lancamentos');

module.exports = {

    async novoLancamento(req, res) {                                           // Testado: OK
        console.log('chegou em "Controllers>LctosController.novoLancamento"');

        try {
            auth.isLogged(req, res);

            const { lancamento_fixo } = req.body;

            CheckLancamento.CamposObrigatorios(req, res);

            req.body['usuarios_id'] = req.session.user.id;

            const Lcto = await Lancamento.create(req.body);

            if ((lancamento_fixo) && (Lcto.id > 0)) {
                LctoFixo = await LancamentoFixo.create({ lancamento_id: Lcto.id })
            }

            return res.json(Lcto);

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }

    },



};