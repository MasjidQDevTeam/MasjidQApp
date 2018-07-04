'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addColumn('e_sedekahs', "userId", {
      type: Sequelize.INTEGER
    });

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.removeColumn('e_sedekahs', "userId");

  }
};
