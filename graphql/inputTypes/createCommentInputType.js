const { GraphQLInputObjectType, GraphQLNonNull, GraphQLString, GraphQLInt } = require("graphql");

const createCommentInputType = new GraphQLInputObjectType({
  name: 'CreateCommentInput',
  fields: {
    todoId: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    body: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }
});

module.exports = createCommentInputType;