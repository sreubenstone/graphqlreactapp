'use strict';
module.exports = (sequelize, DataTypes) => {
  const fbauth = sequelize.define('fbauth', {
    fb_id: DataTypes.STRING,
    displayname: DataTypes.STRING
  }, {});
  fbauth.associate = function(models) {
    // associations can be defined here
  };
  return fbauth;
};