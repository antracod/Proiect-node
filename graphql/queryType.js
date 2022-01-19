const { 
    GraphQLObjectType, 
    GraphQLList,
    GraphQLID,
    GraphQLNonNull,
    GraphQLString,
  } = require('graphql');
  const db = require('../models');
  
  const userType = require('./types/userType');
  const { getAllUsers, getUserById } = require('../repository/users');
  const searchResultType = require('./types/searchResultType');
  const { search } = require('../repository/search');
const todoType = require('./types/todoType');
const { getTodoById, getAllTodos } = require('../repository/todos');
const teamType = require('./types/teamType');
const { getAllTeams, getTeamById } = require('../repository/team');
  
  const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
      users: {
        type: new GraphQLList(userType),
        resolve: async () => {
          return await getAllUsers();
        }
      },
      user: {
        type: userType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLID),
          }
        },
        resolve: async (source, { id }, context) => {
          return getUserById(id);
        }
      },
      teams: {
        type: new GraphQLList(teamType),
        resolve: async () => {
          return await getAllTeams();
        }
      },
      team: {
        type: teamType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLID),
          }
        },
        resolve: async (source, { id }, context) => {
          return getTeamById(id);
        }
      },
      todos: {
        type: new GraphQLList(todoType),
        resolve: async () => {
          return getAllTodos();
        }
      },
      todo: {
        type: todoType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLID),
          }
        },
        resolve: async (source, { id }) => {
          return getTodoById(id);
        }
      },
      search: {
        type: new GraphQLList(searchResultType),
        args: {
          query: {
            type: GraphQLString,
          }
        },
        resolve: async (source, { query }) => {
          return search(query);
        }
      }
    }
  });
  
  module.exports = queryType;