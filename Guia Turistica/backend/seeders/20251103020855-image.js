/* 'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Images', [
      {
        // tener los url del servidor dinary
        url: 'https://res.cloudinary.com/demo/image/upload/sample1.jpg',
        activity_id: 1, // Debe existir en Activities
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // tener los url del servidor dinary
        url: 'https://res.cloudinary.com/demo/image/upload/sample2.jpg',
        activity_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // tener los url del servidor dinary
        url: 'https://res.cloudinary.com/demo/image/upload/sample3.jpg',
        activity_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Images', null, {});
  },
}; */

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Obtener las actividades existentes
    const activities = await queryInterface.sequelize.query(
      `SELECT activity_id, name FROM "Activities";`,
    );
    const activityRows = activities[0];
    const activityMap = {};
    activityRows.forEach((a) => {
      activityMap[a.name] = a.activity_id;
    });

    const images = [
      {
        url: 'https://res.cloudinary.com/demo/image/upload/sample1.jpg',
        activity: 'Escalada en roca',
      },
      {
        url: 'https://res.cloudinary.com/demo/image/upload/sample2.jpg',
        activity: 'Visita al museo',
      },
      {
        url: 'https://res.cloudinary.com/demo/image/upload/sample3.jpg',
        activity: 'Tour gastronómico',
      },
    ];

    const imageObjects = images.map((img) => ({
      url: img.url,
      activity_id: activityMap[img.activity],
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    return queryInterface.bulkInsert('Images', imageObjects, {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Images', null, {});
  },
};
