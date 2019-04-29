'use strict';
module.exports = (sequelize, DataTypes) => {
  const Civilite = sequelize.define('Civilite', {
    type: DataTypes.STRING
  });

  Civilite.associate = function(models) {
    // associations can be defined here
    models.Civilite.hasMany(models.Client, { foreignKey: 'civiliteId', foreignKeyConstraint:true });
  };
  return Civilite;
};