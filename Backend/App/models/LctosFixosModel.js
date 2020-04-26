const { Model, DataTypes } = require('sequelize');

class LancamentoFixo extends Model {

    static init(sequelize) {
        super.init({
            lancamento_id: DataTypes.INTEGER
        }, {
            tableName: 'lancamentos_fixos',
            sequelize
        })
    }

    static associate(models) {
        this.belongsTo(models.Lancamento, { foreignKey: 'lancamento_id' });
    };

}

module.exports = LancamentoFixo;