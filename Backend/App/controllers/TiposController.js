const Tipo = require('../models/TiposModel');
const Categoria = require('../models/CategoriasModel');
const Utils = require('../Utils/functions');
const atributos_Tipos = ['id', 'descricao'];

module.exports = {

    // Métodos CRUD
    async novoTipo(req, res) {                                           // Testado: OK
        console.log('chegou em "Controllers>TiposController.novoTipo"');

        try {
            const { descricao, tipo, categoria } = req.body;

            // Validando campos obrigatórios...
            if (!descricao) {
                throw new Error("campo 'descricao' é obrigatório.");
            }

            if (!tipo) {
                throw new Error("campo 'tipo' é obrigatório.");
            }

            if ((tipo != 'despesa') && (tipo != 'receita')) {
                throw new Error("campo 'tipo' deve ser apenas 'despesa' ou 'receita'.");
            }

            if (!categoria) {
                throw new Error("campo 'categoria' é obrigatório. Informe o código da categoria ou sua descrição.");
            }


            // validando existência da categoria selecionada...
            let categoriaVinculada = await Categoria.findOne({ where: { descricao: categoria, receita_ou_despesa: Utils.RecDespToInt(tipo) } });
            if (!categoriaVinculada) {
                categoriaVinculada = await Categoria.findOne({ where: { id: categoria, receita_ou_despesa: Utils.RecDespToInt(tipo) } });
            }

            if (!categoriaVinculada) {
                throw new Error(`Categoria '${categoria}' do tipo '${tipo}' não encontrada para ser vinculada ao novo tipo.`);
            }


            // Verificando se o tipo já não existe cadastrado...
            const tipo_temp = await Tipo.findOne({ where: { descricao: descricao, receita_ou_despesa: Utils.RecDespToInt(tipo) } });
            if (tipo_temp) {
                throw new Error(`Tipo '${descricao}' já cadastrado para o tipo '${tipo}'.`);
            }


            // Criando tipo no banco de dados
            const tipoConvertido = Utils.RecDespToInt(req.body['tipo']);
            delete tipoConvertido['tipo'];

            req.body['receita_ou_despesa'] = tipoConvertido;
            req.body['categoria_id'] = categoriaVinculada.id;

            let novoTipo = await Tipo.create(req.body);

            // sempre que criar um novo tipo, em caso de sucesso, o retornaremos com todos os dados.
            novoTipo = await Tipo.findByPk(novoTipo.id, {
                attributes: atributos_Tipos,
                include: [
                    {
                        model: Categoria,
                        attributes: ['id', 'descricao']
                    },
                ]
            });

            novoTipo.dataValues['tipo'] = Utils.IntToRecDesp(novoTipo.dataValues['receita_ou_despesa']);
            delete novoTipo.dataValues['receita_ou_despesa'];

            return res.json(novoTipo);

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }

    },

    async listaTipos(req, res) {                                           // Testado: 
        console.log('chegou em "Controllers>TiposController.listaTipos"');

        try {

            let tipos = await Tipo.findAll({
                attributes: atributos_Tipos,
                include: [
                    {
                        model: Categoria,
                        attributes: ['id', 'descricao']
                    },
                ]
            });

            if (tipos) {
                tipos.map((item) => {
                    const i = item.dataValues["receita_ou_despesa"];

                    delete item.dataValues.receita_ou_despesa;
                    delete item.dataValues.createdAt;
                    delete item.dataValues.updatedAt;

                    item.dataValues["tipo"] = Utils.IntToRecDesp(i);
                });
            }

            return res.json(tipos);

        } catch (error) {
            return res.status(400).json({ error: error.message });
        }

    },

};