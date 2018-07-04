'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addColumn('users', "pahala_credit", {
      type: Sequelize.INTEGER
    });

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.removeColumn('users', "pahala_credit");

  }
};
