'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * 🚀 EJEMPLOS DE MÉTODOS COMUNES DE MIGRACIÓN 🚀
     */

    // // 1️⃣ Agregar una columna nueva a una tabla existente
    // await queryInterface.addColumn('users', 'rh', {
    //   type: Sequelize.DATE,
    //   allowNull: true,
    // });

    // // 2️⃣ Cambiar el tipo de una columna existente
    // await queryInterface.changeColumn('users', 'phone_number', {
    //   type: Sequelize.BIGINT,
    //   allowNull: false,
    // });

    // // 3️⃣ Eliminar una columna
    // await queryInterface.removeColumn('users', 'address');

    // // 4️⃣ Renombrar una columna
    // await queryInterface.renameColumn('users', 'old_name', 'new_name');

    // // 5️⃣ Crear una nueva tabla ---- OMPOR
    // await queryInterface.createTable('products', {
    //   id: {
    //     type: Sequelize.INTEGER,
    //     primaryKey: true,
    //     autoIncrement: true,
    //     allowNull: false
    //   },
    //   name: {
    //     type: Sequelize.STRING,
    //     allowNull: false
    //   },
    //   price: {
    //     type: Sequelize.FLOAT,
    //     allowNull: false
    //   },
    //   createdAt: {
    //     type: Sequelize.DATE,
    //     allowNull: false
    //   },
    //   updatedAt: {
    //     type: Sequelize.DATE,
    //     allowNull: false
    //   }
    // });

    // 6️⃣ Eliminar una tabla
    // await queryInterface.dropTable('products');

    // // 7️⃣ Agregar una clave foránea
    // await queryInterface.addColumn('orders', 'user_id', {
    //   type: Sequelize.INTEGER,
    //   references: {
    //     model: 'users',
    //     key: 'id'
    //   },
    //   onUpdate: 'CASCADE',
    //   onDelete: 'SET NULL'
    // });

    // 8️⃣ Eliminar una clave foránea
    // await queryInterface.removeColumn('orders', 'user_id');

    // 9️⃣ Agregar un índice
    // await queryInterface.addIndex('users', ['email'], {
    //   unique: true,
    //   name: 'users_email_unique'
    // });

    // 🔟 Eliminar un índice
    // await queryInterface.removeIndex('users', 'users_email_unique');
  },

  async down(queryInterface, Sequelize) {
    /**
     * 🚀 REVERSIÓN DE LOS CAMBIOS 🚀
     */

  //   await queryInterface.removeColumn('users', 'birthdate');
  //   await queryInterface.changeColumn('users', 'phone_number', {
  //     type: Sequelize.STRING,
  //     allowNull: false,
  //   });
  //   await queryInterface.addColumn('users', 'address', {
  //     type: Sequelize.STRING,
  //     allowNull: true,
  //   });
  //   await queryInterface.renameColumn('users', 'new_name', 'old_name');
  //   await queryInterface.dropTable('products');
  //   await queryInterface.removeColumn('orders', 'user_id');
  //   await queryInterface.removeIndex('users', 'users_email_unique');
  // }
};