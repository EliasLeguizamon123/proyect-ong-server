'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('Testimonies', [{
        name: 'Demo Testimonies',
        image: 'https://i.blogs.es/594843/chrome/450_1000.jpg',
        content: 'Phasellus scelerisque sed augue non hendrerit.',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('Testimonies', null, {});
     
  }
};
