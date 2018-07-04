'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    full_name: DataTypes.STRING,
    user_type: DataTypes.STRING,
    password: DataTypes.INTEGER,
    salt: DataTypes.STRING,
    createdAt: new Date(),
    updatedAt: new Date(),
    email: {type: DataTypes.STRING},
  }, {});
  user.associate = function(models) {
    // associations can be defined here
  };
  return user;
};
