const { Model, DataTypes } = require('sequelize');

class Categoria extends Model {

    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            descricao: DataTypes.STRING,
            cor: DataTypes.STRING,
            receita_ou_despesa: DataTypes.INTEGER,
        }, {
            //freezeTableName: false,
            tableName: 'categorias',
            sequelize
        })
    }

}

module.exports = Categoria;