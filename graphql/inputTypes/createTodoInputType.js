const { GraphQLInputObjectType, GraphQLNonNull, GraphQLString, GraphQLBoolean } = require("graphql");

const CreateTodoInputType = new GraphQLInputObjectType({
  name: 'CreateTodoInput',
  fields: {
    name: {
      title: new GraphQLNonNull(GraphQLString),
    },
    name: {
        body: new GraphQLNonNull(GraphQLString),
      },
    name: {
        completed: new GraphQLNonNull(GraphQLBoolean),
      }
  }
});

module.exports = CreateTodoInputType;