'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Organizations', [{
      name: 'Somos Más',
      image: 'https://images.freeimages.com/images/premium/previews/1703/17036319-large-group-of-people-embracing-and-smiling-together.jpg',
      phone: 1160112988,
      address: 'calle falsa 123, La Cava',
      welcomeText:'¡Bienvenida/o! Gracias por el interés en formar parte de nuestra comunidad'
    }], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Organizations', null, {});

  }
};
