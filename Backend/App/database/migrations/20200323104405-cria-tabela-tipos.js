'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('tipos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      descricao: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      receita_ou_despesa: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      categoria_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'categorias', key: 'id' },
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT',
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tipos');
  }
};
