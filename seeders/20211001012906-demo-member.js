'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

     await queryInterface.bulkInsert('Members', [{
       name: 'Pedro',
       image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
       deletedAt: null,
       createdAt: new Date(),
       updatedAt: new Date()
     }], {});
    
  },

  down: async (queryInterface, Sequelize) => {

     await queryInterface.bulkDelete('Members', null, {});
     
  }
};
