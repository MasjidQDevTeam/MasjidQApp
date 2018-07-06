'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('users', [{
      full_name: 'John Doe',
      user_type: 'Super Admin',
      password: "12345678",
      email: "FooBar123@mail.com",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      full_name: 'Fajar TC',
      user_type: 'Ansor',
      password: "12345678",
      email: "andresudiy@gmail.com",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      full_name: 'Yusuf Siregar',
      user_type: 'Jamaah',
      password: "12345678",
      email: "yusufsiregar5@gmail.com",
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('users', null, {});

  }
};
