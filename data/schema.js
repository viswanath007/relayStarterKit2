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

 const mongoose = require('mongoose');

 const PersonSchema = new mongoose.Schema({
   id: String,
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

 let Person = mongoose.model('Person', PersonSchema, 'persons');

var userType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    users: {
      type: new GraphQLList(new GraphQLObjectType({
        name: 'user',
        fields: () => {
          return {
            id: {
              name: 'id',
              type: GraphQLString
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
      args:  {
        user: {
          name: 'user',
          type: GraphQLString
        },
        password: {
          name: 'password',
          type: GraphQLString
        }
      },
      resolve: function (a,params,c,d) {
        return new Promise((resolve, reject) => {
          Person.find({"first_name": params.user, "password": params.password}).exec((err, res) => {
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

/**
 * Finally, we construct our schema (whose starting query type is the query
 * type we defined above) and export it.
 */
export const Schema = new GraphQLSchema({
  query: queryType,
  // Uncomment the following after adding some mutation fields:
  // mutation: mutationType
});
