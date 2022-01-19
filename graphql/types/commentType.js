const { 
    GraphQLObjectType, 
    GraphQLString,
    GraphQLID,
    GraphQLList,
  } = require('graphql');
  
  module.exports = new GraphQLObjectType({
    name: 'Comment',
    fields: () => { 
      const todoType = require('./todoType');
      const userType = require('./userType');
  
      return {
        id: {
          type: GraphQLID,
        },
        body: {
          type: GraphQLString,
        },
        todo: {
          type: todoType,
          resolve: async (source) => {
            return await source.getTodo();
          }
        },
        author: {
          type: userType,
          resolve: async (source) => {
            return await source.getUser();
          }
        }
      }
    }
  });