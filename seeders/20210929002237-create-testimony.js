'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('Testimonials', [{
        name: 'Demo testimonials',
        image: 'https://i.blogs.es/594843/chrome/450_1000.jpg',
        content: 'Phasellus scelerisque sed augue non hendrerit.'
      }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('Testimonials', null, {});
     
  }
};
