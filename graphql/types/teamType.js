const { 
    GraphQLObjectType, 
    GraphQLString,
    GraphQLID,
    GraphQLList
  } = require('graphql');
const userType = require('./userType');
  
  const teamType = new GraphQLObjectType({
    name: 'Team',
    fields: () => ({
      id: {
        type: GraphQLID,
      },
      name: { 
        type: GraphQLString,
      },
    //   users: {
    //     type: new GraphQLList(userType),
    //     resolve: async (source) => {
    //       return await source.getUsers();
    //     }
    //   },
    })
  });
  
  module.exports = teamType;