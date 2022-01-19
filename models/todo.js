'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
   
    static associate(models) {
    
      models.Todo.belongsTo(models.User, {
        foreignKey: 'userId',
      });
      models.Todo.hasMany(models.Comment);
    }
  };
  Todo.init({
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    completed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};