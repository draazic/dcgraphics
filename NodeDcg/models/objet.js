'use strict';
module.exports = (sequelize, DataTypes) => {
  const Objet = sequelize.define('Objet', {
    choix: DataTypes.STRING
  }
  );
  Objet.associate = function(models) {
    // associations can be defined here
    models.Objet.hasMany(models.Client, { foreignKey: 'objetId', foreignKeyConstraint:true });
  };
  return Objet;
};