'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   
   return queryInterface.addColumn(
    'users',
    'avatarUrl',
   Sequelize.STRING
  );
  },

  down: (queryInterface, Sequelize) => {
   
   return queryInterface.removeColumn(
    'users',
    'avatarUrl',
   Sequelize.STRING
  );
  }
};
