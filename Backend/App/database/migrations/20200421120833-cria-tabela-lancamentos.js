'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('lancamentos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      categoria_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'categorias', key: 'id' },
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT',
      },
      usuarios_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'usuarios', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      descricao: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      valor: {
        allowNull: false,
        type: Sequelize.FLOAT(9, 2),
      },
      data_vencimento: {       // para lançamentos de "Receita" este campo será o "data_recebimento"
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      data_pagamento: {
        allowNull: true,
        type: Sequelize.DATEONLY,
      },
      ja_pago: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
      },
      lancamento_fixo: {
        allowNull: true,
        type: Sequelize.BOOLEAN,
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
    return queryInterface.dropTable('lancamentos');
  }
};
