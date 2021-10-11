'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert('OrganizationLinks', [{
        socialNetwork: 'Instagram',
        link: 'https://www.instagram.com',
        organizationId: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    
     await queryInterface.bulkDelete('OrganizationLinks', null, {});
     
  }
};
