const { Model, DataTypes } = require('sequelize');

class Categoria extends Model {

    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            descricao: DataTypes.STRING,
            cor: DataTypes.STRING,
            receita_ou_despesa: DataTypes.INTEGER,
        }, {
            tableName: 'categorias',
            sequelize
        })
    }

    static associate(models) {
        this.belongsTo(models.Usuario, { foreignKey: 'usuario_id' });
        this.hasMany(models.Lancamento, { foreignKey: 'categoria_id' });
    }

}

module.exports = Categoria;