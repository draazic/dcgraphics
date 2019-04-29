'use strict';
module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {
    forname: DataTypes.STRING,
    mail: DataTypes.STRING,
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    text: DataTypes.STRING,
    enterprise: DataTypes.STRING
    
  });
  Client.associate = function(models) {
    // associations can be defined here
  models.Client.belongsTo(models.Civilite)
  models.Client.belongsTo(models.Objet)
  };
  return Client;
};