'use strict';
module.exports = (sequelize, DataTypes) => {
  const Op = sequelize.Op;
  var prayer = sequelize.define('prayer', {
    prayer_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
        isUnique: function(value, callback) {
          prayer.findOne({
            where: {
              prayer_name: value,
              id: {
                [Op.ne]: this.id
              }
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
    }
  }, {});
  prayer.associate = function(models) {
    // associations can be defined here
  };
  return prayer;
};
