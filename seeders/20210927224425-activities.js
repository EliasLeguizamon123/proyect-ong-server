'use strict';

module.exports = {

  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Activities', [{
      name:'Un día más feliz para los niños',
      image:'https://images.unsplash.com/photo-1537655780520-1e392ead81f2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80',
      content:'Juntamos juguetes para acercarlo a los niños más necesitados. Podés acercarte el día del niño para ver el destino de tu donación!',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name:'Natural y necesario',
      image:'https://vilee.fi/eng/wp-content/uploads/2021/04/children-gardening-1530272381.jpg',
      content:'Creemos que la soberanía alimentaria es un pilar fundamental para forjar una tendencia a la autosuficiencia. Por eso en este taller vamos a tener encuentros semanales para enseñarles a los vecinos los métodos básicos para cultivar los propios alimentos. Además se  contará con un espacio de huerta compartida para trabajar y se irá repartiendo lo que se coseche!',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ] ,{});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Activities', null, {});
  }
};
