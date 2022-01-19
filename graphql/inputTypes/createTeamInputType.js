const { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } = require("graphql");

const createTeamInputType = new GraphQLInputObjectType({
  name: 'CreateTeamInput',
  fields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    }
  }
});

module.exports = createTeamInputType;