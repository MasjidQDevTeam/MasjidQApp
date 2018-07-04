'use strict';
module.exports = (sequelize, DataTypes) => {
  var e_sedekah = sequelize.define('e_sedekah', {
    nominal: DataTypes.INTEGER
  }, {});
  e_sedekah.associate = function(models) {
    // associations can be defined here
  };
  return e_sedekah;
};