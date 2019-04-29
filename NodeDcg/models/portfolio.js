'use strict';
module.exports = (sequelize, DataTypes) => {
  const Portfolio = sequelize.define('Portfolio', {
    titre: DataTypes.STRING,
    content: DataTypes.STRING,
    url: DataTypes.STRING,
    likes: DataTypes.INTEGER
  }, {});
  Portfolio.associate = function(models) {
    // associations can be defined here
  };
  return Portfolio;
};