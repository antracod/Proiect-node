const { GraphQLUnionType } = require("graphql");
const userType = require('./userType');
const todoType = require('./todoType');
const db = require('../../models');
const commentType = require("./commentType");
const teamType = require("./teamType");

const searchResultType = new GraphQLUnionType({
  name: 'SearchResult',
  types: [userType, todoType, commentType, teamType],
  resolveType: (value) => {
    if(value instanceof db.User) {
      return userType.name;
    }

    if(value instanceof db.Todo) {
      return todoType.title;
    }

    if(value instanceof db.Comment) {
        return commentType.body;
    }

    if(value instanceof db.Team) {
        return teamType.name;
    }
  }
});

module.exports = searchResultType;