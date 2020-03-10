const { Model, DataTypes } = require('sequelize');

class Categoria extends Model {

    static init(sequelize) {
        super.init({
            descricao: DataTypes.STRING,
            receita_ou_despesa: DataTypes.INTEGER,
        }, {
            //freezeTableName: false,
            tableName: 'categorias',
            sequelize
        })
    }

}

module.exports = Categoria;