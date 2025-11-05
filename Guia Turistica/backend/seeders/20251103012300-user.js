'use strict';

//const bcrypt = require('bcryptjs');
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Hash la contraseña del admin
    //const passwordHash = await bcrypt.hash('admin123', 10);
    // mejor contraseña fija

    await queryInterface.bulkInsert('Users', [
      {
        name: 'Administrador',
        email: 'admin@example.com',
        password_hash: '$2a$10$IXOCTjN19Cmw1fPBwytvl.xWxFukyFrFDSoI.lUjVAdkwIyqp9DpW', // hash fijo
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', { email: 'admin@example.com' });
  }
};

