'use strict';
const faker = require('faker');
const db = require('../models');


module.exports = {
  up: async (queryInterface, Sequelize) => {
   
    const allUsers = await db.User.findAll();

    const todos = [];
    for(let i = 0; i < 200; i++) {
      const userId = Math.floor(Math.random() * (allUsers.length - 1));
      todos.push({
        userId,
        title: faker.lorem.sentence(),
        body: faker.lorem.paragraphs(),
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }
    await queryInterface.bulkInsert('Todos', todos , {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Todos', null, {});
  }
};