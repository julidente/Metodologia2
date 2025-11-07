// 'use strict';

// /** @type {import('sequelize-cli').Seeder} */
// module.exports = {
//   async up(queryInterface) {
//     await queryInterface.bulkInsert('Activities', [
//       // faltan imagenes, subscripciones
//       {
//         name: 'Escalada en roca',
//         description: 'Escalada para principiantes y expertos',
//         price: 50,
//         discount: 5,
//         //rating: 4.5,
//         location: 'Montaña ABC',
//         category_id: 1, // Aventura
//         city_id: 1,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         name: 'Visita al museo',
//         description: 'Recorrido por el museo local',
//         price: 20,
//         discount: 0,
//         //rating: 4.0,
//         location: 'Museo XYZ',
//         category_id: 2, // Cultura
//         city_id: 1,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         name: 'Tour gastronómico',
//         description: 'Degustación de platos típicos',
//         price: 35,
//         discount: 0,
//         //rating: 4.7,
//         location: 'Ciudad ABC',
//         category_id: 3, // Gastronomía
//         city_id: 1,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         name: 'Paseo en kayak',
//         description: 'Kayak en río o lago',
//         price: 45,
//         discount: 10,
//         //rating: 4.3,
//         location: 'Río XYZ',
//         category_id: 1, // Aventura
//         city_id: 2,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         name: 'Clase de pintura',
//         description: 'Aprende técnicas artísticas',
//         price: 25,
//         discount: 0,
//         //rating: 4.6,
//         location: 'Estudio de arte',
//         category_id: 2, // Cultura
//         city_id: 2,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         name: 'Ruta de senderismo',
//         description: 'Caminata guiada por la montaña',
//         price: 30,
//         discount: 0,
//         //rating: 4.8,
//         location: 'Parque Natural',
//         category_id: 1, // Aventura
//         city_id: 3,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         name: 'Clases de surf',
//         description: 'Aprende a surfear con instructor',
//         price: 55,
//         discount: 5,
//         //rating: 4.4,
//         location: 'Playa XYZ',
//         category_id: 1, // Aventura
//         city_id: 3,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         name: 'Tour histórico',
//         description: 'Visita los principales monumentos',
//         price: 40,
//         discount: 0,
//         //rating: 4.2,
//         location: 'Centro histórico',
//         category_id: 2, // Cultura
//         city_id: 1,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         name: 'Cena romántica',
//         description: 'Experiencia gastronómica especial',
//         price: 60,
//         discount: 10,
//         //rating: 4.9,
//         location: 'Restaurante ABC',
//         category_id: 3, // Gastronomía
//         city_id: 2,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       {
//         name: 'Paseo en bicicleta',
//         description: 'Recorrido guiado por la ciudad',
//         price: 25,
//         discount: 0,
//         //rating: 4.5,
//         location: 'Parque central',
//         category_id: 4, // Recreación
//         city_id: 3,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       }
//     ], {});
//   },

//   async down(queryInterface) {
//     await queryInterface.bulkDelete('Activities', {}, {});
//   }
// };

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Obtener categorías existentes
    const categories = await queryInterface.sequelize.query(
      `SELECT category_id, name FROM "Categories";`,
    );
    const categoryRows = categories[0];
    const categoryMap = {};
    categoryRows.forEach((c) => {
      categoryMap[c.name] = c.category_id;
    });

    // Obtener ciudades existentes
    const cities = await queryInterface.sequelize.query(`SELECT city_id, name FROM "Cities";`);
    const cityRows = cities[0];
    const cityMap = {};
    cityRows.forEach((c) => {
      cityMap[c.name] = c.city_id;
    });

    const activities = [
      {
        name: 'Escalada en roca',
        description: 'Escalada para principiantes y expertos',
        price: 50,
        discount: 5,
        location: 'Montaña ABC',
        category: 'Aventura',
        city: 'Buenos Aires',
      },
      {
        name: 'Visita al museo',
        description: 'Recorrido por el museo local',
        price: 20,
        discount: 0,
        location: 'Museo XYZ',
        category: 'Cultura',
        city: 'Buenos Aires',
      },
      {
        name: 'Tour gastronómico',
        description: 'Degustación de platos típicos',
        price: 35,
        discount: 0,
        location: 'Ciudad ABC',
        category: 'Gastronomía',
        city: 'Buenos Aires',
      },
      {
        name: 'Paseo en kayak',
        description: 'Kayak en río o lago',
        price: 45,
        discount: 10,
        location: 'Río XYZ',
        category: 'Aventura',
        city: 'La Plata',
      },
      {
        name: 'Clase de pintura',
        description: 'Aprende técnicas artísticas',
        price: 25,
        discount: 0,
        location: 'Estudio de arte',
        category: 'Cultura',
        city: 'La Plata',
      },
      {
        name: 'Ruta de senderismo',
        description: 'Caminata guiada por la montaña',
        price: 30,
        discount: 0,
        location: 'Parque Natural',
        category: 'Aventura',
        city: 'Mar del Plata',
      },
      {
        name: 'Clases de surf',
        description: 'Aprende a surfear con instructor',
        price: 55,
        discount: 5,
        location: 'Playa XYZ',
        category: 'Aventura',
        city: 'Mar del Plata',
      },
      {
        name: 'Tour histórico',
        description: 'Visita los principales monumentos',
        price: 40,
        discount: 0,
        location: 'Centro histórico',
        category: 'Cultura',
        city: 'Buenos Aires',
      },
      {
        name: 'Cena romántica',
        description: 'Experiencia gastronómica especial',
        price: 60,
        discount: 10,
        location: 'Restaurante ABC',
        category: 'Gastronomía',
        city: 'La Plata',
      },
      {
        name: 'Paseo en bicicleta',
        description: 'Recorrido guiado por la ciudad',
        price: 25,
        discount: 0,
        location: 'Parque central',
        category: 'Deportes',
        city: 'Mar del Plata',
      },
    ];

    const activityObjects = activities.map((a) => ({
      name: a.name,
      description: a.description,
      price: a.price,
      discount: a.discount,
      location: a.location,
      category_id: categoryMap[a.category],
      city_id: cityMap[a.city],
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    return queryInterface.bulkInsert('Activities', activityObjects, {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Activities', null, {});
  },
};
