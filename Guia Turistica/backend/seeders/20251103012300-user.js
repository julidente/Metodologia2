'use strict';

//const bcrypt = require('bcryptjs');
//const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Hash la contraseña del admin
    //const passwordHash = await bcrypt.hash('admin123', 10);
    // mejor contraseña fija

    await queryInterface.bulkInsert('Users', [
      {
        name: 'Administrador',
        email: 'admin@example.com',
        password_hash: '$2b$10$iVCvu9o7qTrQzd8g5/NR3e/YhTxiTNygOT.yFDcph6Bch4wVd4hrO', // hash fijo
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', { email: 'admin@example.com' });
  },
};
