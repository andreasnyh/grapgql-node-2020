const express = require('express');
const graphql = require('graphql');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');
const app = express();

// Start GraphQl on http://localhost:4000/graphql

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log('Server is listening on port 4000');
});
