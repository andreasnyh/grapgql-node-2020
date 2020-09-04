const axios = require('axios');

/*
  Datatypes:
  String
  Int
  Object
  Array
 */

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = require('graphql');

const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: {
      type: GraphQLString,
    },
    name: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },
    age: {
      type: GraphQLInt,
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    customers: {
      type: new GraphQLList(CustomerType),
      resolve(parentValue, args) {
        return customers;
      },
    },
    customer: {
      type: CustomerType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        for (let i = 0; i < customers.length; i++) {
          if (customers[i].id === args.id) {
            return customers[i];
          }
        }
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
