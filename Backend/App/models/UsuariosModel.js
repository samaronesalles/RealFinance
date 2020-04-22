const { Model, DataTypes } = require('sequelize');

class Usuario extends Model {

    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            email: DataTypes.STRING,
            senha: DataTypes.STRING,
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.hasMany(models.Categoria);
        this.hasMany(models.Lancamento);
    }

}

module.exports = Usuario;