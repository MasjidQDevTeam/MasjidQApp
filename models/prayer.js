'use strict';
module.exports = (sequelize, DataTypes) => {
  const Op = sequelize.Op;
  var prayer = sequelize.define('prayer', {
    prayer_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        isUnique: function(value, callback) {
          prayer.findOne({
            where: {
              prayer_name: value,
              id: {
                [Op.ne]: this.id
              },
            },
          })
          .then((result) => {
            if (result !== null) {
              callback("A prayer with the entered name has already been registered");
            } else {
              callback();
            }
          })
          .catch((err) => {
            callback(err);
          })
        }
      },
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {});
  prayer.associate = function(models) {
    prayer.belongsToMany(models.user, {through: "UserPrayer", foreignKey: "PrayerId"});
  };
  return prayer;
};
