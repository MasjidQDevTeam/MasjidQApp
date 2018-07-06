'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserPrayer = sequelize.define('UserPrayer', {
    UserId: DataTypes.INTEGER,
    PrayerId: DataTypes.INTEGER,
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {});
  UserPrayer.associate = function(models) {
    UserPrayer.belongsTo(models.user, {foreignKey: "UserId"});
    UserPrayer.belongsTo(models.prayer, {foreignKey: "PrayerId"});
  };

  return UserPrayer;
};
