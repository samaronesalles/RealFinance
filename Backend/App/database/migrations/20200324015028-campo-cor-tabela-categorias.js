'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {

      await queryInterface.addColumn(
        'categorias',
        'cor',
        {
          type: Sequelize.STRING,
          allowNull: false,
          after: 'descricao',
        },
        { transaction }
      );

      await transaction.commit();

    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.removeColumn('categorias', 'cor', { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
