'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    bio: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {});
  user.associate = function(models) {
    // associations can be defined here
    models.user.hasMany(models.portfolio, { foreignKey: 'userId', foreignKeyConstraint:true })
  };
  // sequelize.sync({ force: true })
  // .then(() => {
  //   console.log(`Database & tables created!`)
  // })
  return user;
};