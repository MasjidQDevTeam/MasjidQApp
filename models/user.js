'use strict';
module.exports = (sequelize, DataTypes) => {
  const Op = sequelize.Op;
  const bcrypt = require('bcrypt');
  const saltRounds = 8;
  var user = sequelize.define('user', {
    full_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        is: /^[a-zA-Z\s]*$/,
        isUnique: function(value, callback) {
          user.findOne({
            where: {
              full_name: value,
              id: {
                [Op.ne]: this.id
              },
            },
          })
          .then((result) => {
            if (result !== null) {
              callback("A user has already registered with the entered full name")
            } else {
              callback()
            }
          })
          .catch((err) => {
            callback(err)
          })
        }
      },
    },
    user_type: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        len: [8, 30],
      },
    },
    salt: DataTypes.STRING,
    createdAt: new Date(),
    updatedAt: new Date(),
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        isEmail: true,
        is: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        isUnique: function(value, callback) {
          user.findOne({
              where: {
                email: value,
                id: {
                  [Op.ne]: this.id
                },
              },
            }).then((result) => {
              if (result !== null) {
                callback("A user has already registered with the entered email address");
              } else {
                callback();
              }
            })
            .catch((err) => {
              callback(err);
            })
        },
      },
    },
  }, {});

  user.beforeCreate((user, options) => {
    return bcrypt.hash(user.password, saltRounds)
    .then((encryptedPsw) => {
      user.password = encryptedPsw;
    })
  })

  user.associate = function(models) {
    user.hasMany(models.e_sedekah);
    user.belongsToMany(models.prayer, {through: "UserPrayer", foreignKey: "UserId"})
  };
  return user;
};
