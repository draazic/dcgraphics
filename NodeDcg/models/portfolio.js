'use strict';
module.exports = (sequelize, DataTypes) => {
  const portfolio = sequelize.define('portfolio', {
    //idUser: DataTypes.INTEGER,
    titre: DataTypes.STRING,
    content: DataTypes.STRING,
    url: DataTypes.STRING,
    likes: DataTypes.INTEGER
  }, {});
  portfolio.associate = function(models) {
    // associations can be defined here
    models.portfolio.belongsTo(models.user)
  };

  // sequelize.sync({ force: true })
  // .then(() => {
  //   console.log(`Database & tables created!`)
  // })

  return portfolio;
};
