import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay';

import {
  // Import methods that your schema can use to interact with your database
  User,
  Widget,
  getUser,
  getViewer,
  getWidget,
  getWidgets,
} from './database';

/**
 * We get the node interface and field from the Relay library.
 *
 * The first method defines the way we resolve an ID to its object.
 * The second defines the way we resolve an object to its GraphQL type.
 */
 const mongoose = require('mongoose');

 const PersonSchema = new mongoose.Schema({
   id: {
     type: String
   },
   first_name: {
     type: String,
   },
   last_name: {
     type: String,
   },
   email: {
     type: String,
   },
   gender: {
     type: String,
   },
   ip_address: {
     type: String,
   }
 });

 // PersonSchema.set('toJSON', {getters: true});

 let Person = mongoose.model('Person', PersonSchema, 'persons');



var {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    var {type, id} = fromGlobalId(globalId);
    if (type === 'User') {
      return getUser(id);
    } else if (type === 'Widget') {
      return getWidget(id);
    } else {
      return null;
    }
  },
  (obj) => {
    if (obj instanceof User) {
      return userType;
    } else if (obj instanceof Widget)  {
      return widgetType;
    } else {
      return null;
    }
  }
);

/**
 * Define your own types here
 */

var userType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: globalIdField('User'),
    users: {
      type: new GraphQLList(new GraphQLObjectType({
        name: 'user',
        fields: () => {
          return {
            id: {
              name: 'id',
              type: new GraphQLNonNull(GraphQLID),
              resolve: (obj) => obj._id
            },
            first_name: {
              name: 'first_name',
              type: GraphQLString
            },
            last_name: {
              name: 'last_name',
              type: GraphQLString
            },
            email: {
              name: 'email',
              type: GraphQLString
            },
            gender: {
              name: 'gender',
              type: GraphQLString
            },
            ip_address: {
              name: 'ip_address',
              type: GraphQLString
            },
          }
        }
      })),
      resolve: function () {
        return new Promise((resolve, reject) => {
          Person.find({}).exec((err, res) => {
            err ? reject(err) : resolve(res);
          });
        });
      }
    }
  }),
});

/**
 * Define your own connection types here
 */

/**
 * This is the type that will be the root of our query,
 * and the entry point into our schema.
 */
var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    node: nodeField,
    viewer: {
      name: 'viewer',
      type: userType,
      resolve: function(){
        return {users: {}};
      }
    },
  }),
});

/**
 * This is the type that will be the root of our mutations,
 * and the entry point into performing writes in our schema.
 */
 let addUserMutation = mutationWithClientMutationId({
   name: 'AddUser',
   inputFields: {
     id: { type: new GraphQLNonNull(GraphQLString)},
     first_name: { type: new GraphQLNonNull(GraphQLString)},
     last_name: { type: new GraphQLNonNull(GraphQLString)},
     email: { type: new GraphQLNonNull(GraphQLString)},
     gender: { type: new GraphQLNonNull(GraphQLString)},
     ip_address: { type: new GraphQLNonNull(GraphQLString)},
   },
   outputFields: {
     user: {
       type: userType,
       resolve: (obj) => obj.ops[0]
     }
   },
   mutateAndGetPayload: ({id, first_name, last_name, email, gender, ip_address}) => {
     return db.collection('persons').insertOne({id, first_name, last_name, email, gender, ip_address});
   }
 });

var mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    // Add your own mutations here
    addUser: addUserMutation
  })
});

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
export const Schema = new GraphQLSchema({
  query: queryType,
  // Uncomment the following after adding some mutation fields:
  // mutation: mutationType
});
