const { Model, DataTypes } = require('sequelize');

class Lancamento extends Model {

    static init(sequelize) {
        super.init({
            descricao: DataTypes.STRING,
            valor: DataTypes.FLOAT(9, 2),
            dataVencimento: DataTypes.DATEONLY,
            dataPagamento: DataTypes.DATEONLY,
            jaPago: DataTypes.BOOLEAN,
            lctoFixo: DataTypes.BOOLEAN,
        }, {
            tableName: 'lancamentos',
            sequelize
        })
    }

    static associate(models) {
        this.belongsTo(models.Usuario, { foreignKey: 'usuarios_id' });
        this.belongsTo(models.Categoria, { foreignKey: 'categoria_id' });
    };

}

module.exports = Lancamento;