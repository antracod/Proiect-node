const { 
    GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID
  } = require('graphql');
  
  const loginHandler = require('../repository/login');
  
  const createUserInputType = require('./inputTypes/createUserInputType');
  const loginInputType = require('./inputTypes/loginInputType');
  const updateUserInputType = require('./inputTypes/updateUserInputType');
  const createCommentInputType = require('./inputTypes/createCommentInputType');
  
  const loginResultType = require('./types/loginResultType');
  const userType = require('./types/userType');
  const commentType = require('./types/commentType');
  
  const { createUser, updateUser, deleteUser } = require('../repository/users');
  const { createComment } = require('../repository/todos');
  const pubsub = require('../pubsub');
const todoType = require('./types/todoType');
const teamType = require('./types/teamType');
const createTeamInputType = require('./inputTypes/createTeamInputType');
const { createTeam } = require('../repository/team');
const id = require('faker/lib/locales/id_ID');
const { internet } = require('faker');
const { INTEGER } = require('sequelize');
const deleteUserInputType = require('./inputTypes/deleteUserInputType');
  
  const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      login: {
        type: loginResultType,
        args: {
          loginInput: {
            type: loginInputType,
          }
        },
        resolve: (source, args) => {
          const { email, password } = args.loginInput;
          
          const token = loginHandler(email, password);
  
          return {
            token,
          }
        }
      },
      createUser: {
        type: userType,
        args: {
          createUserInput: {
            type: createUserInputType,
          }
        },
        resolve: async (source, args) => {
          return createUser(args.createUserInput)
        }
      },
      deleteUser: {
        type: userType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLID),
          }
        },
        resolve: async (source, {id},args) => {
          return deleteUser(id);
        }
      },
      updateUser: {
        type: userType,
        args: {
          updateUserInput: {
            type: updateUserInputType,
          },
        },
        resolve: async (source, args, context) => {
          return updateUser(args.updateUserInput, context);
        }
      },
    //   createTeam: {
    //       type: teamType,
    //       args: {
    //           createTeamInput: {
    //               type: createTeamInputType
    //           }
    //       },
    //       resolve: async (source, args) => {
    //           return createTeam(args.createTeamInput, context)
    //       }
    //   },
      createComment: {
        type: commentType,
        args: {
          createCommentInput: {
            type: createCommentInputType,
          }
        },
        resolve: async (source, args, context) => {
          const userId = context.user.id;
  
          const comment = await createComment(
            args.createCommentInput.todoId, 
            userId,
            args.createCommentInput.body,
          );
  
          pubsub.publish('comments', {
            todoComments: {
              comment: comment.toJSON(),
            }
          });
          return comment;
        }
      }
    },
  })
  
  module.exports = mutationType;