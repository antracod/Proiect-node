const db = require('../models');
const { Op } = require('sequelize');

/// Query-uri pentru db luate din lab

module.exports.search = async (query) => {
  try {
    // Users
    const users = db.User.findAll({ where: { firstName: { [Op.like]: `%${query}%`} }});
    // Todos
    const todos = db.Todo.findAll({ where: { title: { [Op.like]: `%${query}%`} }});
    // Comments
    const comments = db.Comment.findAll({ where: { body: { [Op.like]: `%${query}%`} }});
    // Teams
    const teams = db.Team.findAll({ where: { name: { [Op.like]: `%${query}%`} }});

    const results = await Promise.all([users, todos, comments, teams]);
    
    return [
      ...results[0],
      ...results[1],
      ...results[2]
    ];

  } catch (error) {
    console.error('Something went wrong');
    return [];
  }
}