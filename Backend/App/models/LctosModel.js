const { Model, DataTypes } = require('sequelize');

class Lancamento extends Model {

    static init(sequelize) {
        super.init({
            descricao: DataTypes.STRING,
            valor: DataTypes.FLOAT(9, 2),
            data_vencimento: DataTypes.DATEONLY,
            data_pagamento: DataTypes.DATEONLY,
            ja_pago: DataTypes.BOOLEAN,
            lancamento_fixo: DataTypes.BOOLEAN,
        }, {
            tableName: 'lancamentos',
            sequelize
        })
    }

    static associate(models) {
        this.hasOne(models.LancamentoFixo);
        this.belongsTo(models.Usuario, { foreignKey: 'usuarios_id' });
        this.belongsTo(models.Categoria, { foreignKey: 'categoria_id', as: 'categoria' });
    };

}

module.exports = Lancamento;