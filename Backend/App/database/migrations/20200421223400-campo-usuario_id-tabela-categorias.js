'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {

      await queryInterface.addColumn(
        'categorias',
        'usuario_id',
        {
          type: Sequelize.INTEGER,
          allowNull: true,
          after: 'id',
        },
        { transaction }
      );

      const [results] = await queryInterface.sequelize.query("UPDATE categorias SET usuario_id = (SELECT id FROM usuarios ORDER BY id LIMIT 1) WHERE usuario_id IS NULL");

      queryInterface.changeColumn('categorias', 'usuario_id', {
        type: Sequelize.INTEGER,
        allowNull: false
      });

      queryInterface.addConstraint('categorias', ['usuario_id'], {
        type: 'foreign key',
        references: {
          table: 'usuarios',
          field: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });



      await transaction.commit();

    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.removeColumn('categorias', 'usuario_id', { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
