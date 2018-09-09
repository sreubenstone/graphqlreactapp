'use strict';
module.exports = (sequelize, DataTypes) => {
  const message = sequelize.define('message', {
    body: DataTypes.STRING
  }, {});
  message.associate = function(models) {
    // associations can be defined here
  };
  return message;
};