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
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/customers/${args.id}`)
          .then((res) => res.data);
      },
    },
  },
});

// Mutations

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addCustomer: {
      type: CustomerType,
      args: {
        // NonNull(datatype) == required and check for datattype
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parentValue, args) {
        return axios
          .post('http://localhost:3000/customers', {
            name: args.name,
            email: args.email,
            age: args.age,
          })
          .then((res) => res.data);
      },
    },
    deleteCustomer: {
      type: CustomerType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, args) {
        return axios
          .delete(`http://localhost:3000/customers/${args.id}`)
          .then((res) => res.data);
      },
    },
    updateCustomer: {
      type: CustomerType,
      args: {
        // NonNull(datatype) == required and check for datattype
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parentValue, args) {
        return axios
          .patch(
            `http://localhost:3000/customers/${args.id}`,
            args // args just updates the fields provided
          )
          .then((res) => res.data);
      },
    },
  },
});

/*
  By just providing plain args, no brackets!
  just the provided fields gets patched.

 mutation{
    updateCustomer(id: "1", email: "alice2.example.com")

    name = null
    email = alice2
    age = null
  }
*/

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
