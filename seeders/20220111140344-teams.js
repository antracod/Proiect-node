'use strict';
const { fake } = require('faker');
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [];
    for(let i = 0; i < 100; i++) {
      data.push({
        id: i,
        name: faker.lorem.sentence(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('Teams', data, {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Users', null, {});
  }
};