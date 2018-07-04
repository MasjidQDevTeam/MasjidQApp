'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    var mandatoryPrayers = ["Subuh", "Dzuhur", "Ashar", "Maghrib", "Isya"];
    var prayersDataContainer = []

    mandatoryPrayers.forEach(function(prayer) {
      prayersDataContainer.push({
        prayer_name: prayer,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    })

    return queryInterface.bulkInsert('prayers', prayersDataContainer, {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('prayers', null, {});

  }
};
