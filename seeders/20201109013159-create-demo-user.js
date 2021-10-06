'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      firstName: 'Usuario',
      lastName: 'Demo',
      email: 'test@test.com',
      // Important: Password not encrypted yet! 
      password: '1234',
      roleId: 1,
      image: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: 'Juan',
      lastName: 'Perez',
      email: 'test2@test.com', 
      password: '1111',
      roleId: 2,
      image: 'https://sacd.org.ar/wp-content/uploads/2020/05/user-account-management-logo-user-icon-11562867145a56rus2zwu.png',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: 'Brian',
      lastName: 'Jhon',
      email: 'test3@test.com', 
      password: '2222',
      roleId: 1,
      image: 'https://sacd.org.ar/wp-content/uploads/2020/05/user-account-management-logo-user-icon-11562867145a56rus2zwu.png',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: 'usuario4',
      lastName: 'test4',
      email: 'test4@test.com', 
      password: '4444',
      roleId: 2,
      image: 'https://sacd.org.ar/wp-content/uploads/2020/05/user-account-management-logo-user-icon-11562867145a56rus2zwu.png',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: 'Pedro',
      lastName: 'Baldez',
      email: 'test5@test.com', 
      password: '5555',
      roleId: 1,
      image: 'https://sacd.org.ar/wp-content/uploads/2020/05/user-account-management-logo-user-icon-11562867145a56rus2zwu.png',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: 'Juan',
      lastName: 'Romero',
      email: 'test6@test.com', 
      password: '6666',
      roleId: 2,
      image: 'https://sacd.org.ar/wp-content/uploads/2020/05/user-account-management-logo-user-icon-11562867145a56rus2zwu.png',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: 'Daniel',
      lastName: 'Perez',
      email: 'test7@test.com', 
      password: '7777',
      roleId: 1,
      image: 'https://sacd.org.ar/wp-content/uploads/2020/05/user-account-management-logo-user-icon-11562867145a56rus2zwu.png',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: 'Alberto',
      lastName: 'Guzman',
      email: 'test8@test.com', 
      password: '8888',
      roleId: 2,
      image: 'https://sacd.org.ar/wp-content/uploads/2020/05/user-account-management-logo-user-icon-11562867145a56rus2zwu.png',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: 'Luciana',
      lastName: 'Sanchez',
      email: 'test9@test.com', 
      password: '9999',
      roleId: 1,
      image: 'https://sacd.org.ar/wp-content/uploads/2020/05/user-account-management-logo-user-icon-11562867145a56rus2zwu.png',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      firstName: 'Valeria',
      lastName: 'Baldez',
      email: 'test@test1.com', 
      password: '1010',
      roleId: 2,
      image: 'https://sacd.org.ar/wp-content/uploads/2020/05/user-account-management-logo-user-icon-11562867145a56rus2zwu.png',
      createdAt: new Date,
      updatedAt: new Date
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
