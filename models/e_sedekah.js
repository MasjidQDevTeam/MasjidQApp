'use strict';
module.exports = (sequelize, DataTypes) => {
  var e_sedekah = sequelize.define('e_sedekah', {
    nominal: DataTypes.INTEGER,
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: DataTypes.INTEGER,
  }, {});
  e_sedekah.associate = function(models) {
    e_sedekah.belongsTo(models.user)
  };
  return e_sedekah;
};
