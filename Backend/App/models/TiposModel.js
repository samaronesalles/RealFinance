const { Model, DataTypes } = require('sequelize');

class Tipo extends Model {

    static init(sequelize) {
        super.init({
            descricao: DataTypes.STRING,
            receita_ou_despesa: DataTypes.INTEGER,

        }, {
            //freezeTableName: false,
            tableName: 'tipos',
            sequelize
        })
    }

    static associate(models) {
        this.belongsTo(models.Categoria, { foreignKey: 'categoria_id' });
    };

}

module.exports = Tipo;