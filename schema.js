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
        return axios
          .get('http://localhost:3000/customers')
          .then((res) => res.data);
      },
    },
    customer: {
      type: CustomerType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/customers/${args.id}`)
          .then((res) => res.data);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
