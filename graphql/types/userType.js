const { 
    GraphQLObjectType, 
    GraphQLString,
    GraphQLID,
  } = require('graphql');
const teamType = require('./teamType');
  
  const userType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
      id: {
        type: GraphQLID,
      },
      email: { 
        type: GraphQLString,
      },
      firstName: { 
        type: GraphQLString 
      },
      lastName: { 
        type: GraphQLString 
      },
      team: {
        type: teamType,
        resolve: async (source) => {
          return await source.getTeam();
        } 
      },
    })
  });
  
  module.exports = userType;