"use strict";
module.exports = (sequelize, DataTypes) => {
  const Fbauth = sequelize.define(
    "fbauths",
    {
      fb_id: DataTypes.STRING,
      displayname: DataTypes.STRING
    },
    {}
  );
  Fbauth.associate = function(models) {
    // associations can be defined here
  };
  return Fbauth;
};
