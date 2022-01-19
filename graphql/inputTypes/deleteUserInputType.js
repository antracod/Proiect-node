const { GraphQLInputObjectType, GraphQLNonNull, GraphQLString, GraphQLInt } = require("graphql");

const deleteUserInputType = new GraphQLInputObjectType({
  name: 'DeleteUserType',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
    }
  }
});

module.exports = deleteUserInputType;