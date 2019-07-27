'use strict';
module.exports = (sequelize, DataTypes) => {
  const Civilite = sequelize.define('Civilite', {
    type: DataTypes.STRING
  });

  Civilite.associate = function(models) {
    // associations can be defined here
    models.Civilite.hasMany(models.Client, { foreignKey: 'civiliteId', foreignKeyConstraint:true });
  };
  // sequelize.sync({ force: true })
  // .then(() => {
  //   console.log(`Database & tables created!`)
  // })
  return Civilite;
};