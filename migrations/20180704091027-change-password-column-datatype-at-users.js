'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.changeColumn('users', "password", {
      type: Sequelize.STRING,
    });

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.changeColumn('users', "password", {
      type: Sequelize.INTEGER,
    });

  }
};
