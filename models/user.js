'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
   
    static associate(models) {
      models.User.hasMany(models.Todo);
      models.User.hasMany(models.Comment);
      models.User.belongsTo(models.Team, {
        foreignKey: 'teamId',
      });
      models.User.belongsTo(models.Role, {
        foreignKey: 'roleId',
      });
    }

    async can(permissionName) {
      const role = await this.getRole();
      const permissions = role.permissions;
      return permissions.indexOf(permissionName) !== -1;
    }
  };
  User.init({
    email: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    password: DataTypes.STRING,
    teamId: DataTypes.INTEGER,
    roleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};