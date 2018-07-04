'use strict';
module.exports = (sequelize, DataTypes) => {
  var prayer = sequelize.define('prayer', {
    prayer_name: DataTypes.STRING
  }, {});
  prayer.associate = function(models) {
    // associations can be defined here
  };
  return prayer;
};