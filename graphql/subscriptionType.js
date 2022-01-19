const { GraphQLObjectType } = require("graphql");
const commentType = require("./types/commentType");

const pubsub = require('../pubsub');

const db = require('../models');

const subscriptionType = new GraphQLObjectType({
  name: 'Subscription',
  fields: {
    postComments: {
      type: commentType,
      subscribe: () => {
        return pubsub.asyncIterator('comments');
      },
      resolve: async (source) => {
        console.log('source.todoComments', source.todoComments.comment)
        const comment = await db.Comment.findByPk(source.todoComments.comment.id);

        return comment;
      },
    }
  }
});

module.exports = subscriptionType;