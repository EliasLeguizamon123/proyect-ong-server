'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Slides', [{
      imageUrl: 'https://blog.oxfamintermon.org/wp-content/uploads/2014/11/ONG-copia-e1415635063990.jpg',
      order: 1,
      organizationId: '1',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Slides', null, {});
  }
};
