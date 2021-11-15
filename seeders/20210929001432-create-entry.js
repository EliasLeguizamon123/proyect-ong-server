'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('Entries', [{
        name: 'Demo entries',
        content: 'Phasellus scelerisque sed augue non hendrerit.',
        image: 'https://i.blogs.es/594843/chrome/450_1000.jpg',
        categoryId: 1,
        type: 'news',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('Entries', null, {});    
  }
};
